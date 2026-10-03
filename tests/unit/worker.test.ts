// @vitest-environment node
import { describe, expect, it, vi, type Mock } from 'vitest';
import { composeEmail, handleEnquiry, parseSubmission, rateLimitKey, type Deps } from '../../worker/enquiry';

const origin = 'https://uems-agency.spacesdrive.cc';
const valid = {
  form: 'appointment-request',
  subject: 'Appointment request: Asha Rao',
  lines: ['Name: Asha Rao', 'Email: asha@example.com', '', 'Hello'],
  replyTo: 'asha@example.com',
  fields: { name: 'Asha Rao' },
};

function post(body: unknown, headers: Record<string, string> = {}) {
  const text = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request(`${origin}/api/enquiry`, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.7', ...headers },
    body: text,
  });
}

type Allow = NonNullable<Deps['allow']>;

function deps(
  send: Mock<Deps['send']> = vi.fn<Deps['send']>().mockResolvedValue(undefined),
  allow?: Mock<Allow>,
): { send: Mock<Deps['send']>; allow?: Mock<Allow> } {
  return { send, allow };
}


describe('handleEnquiry', () => {
  it('emails a valid submission to UEMS with the visitor as reply-to', async () => {
    const d = deps();
    const res = await handleEnquiry(post(valid), d);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(d.send).toHaveBeenCalledOnce();
    const email = d.send.mock.calls[0]?.[0];
    expect(email?.subject).toBe('Appointment request: Asha Rao');
    expect(email?.replyTo).toBe('asha@example.com');
    expect(email?.text).toContain('Name: Asha Rao\nEmail: asha@example.com\n\nHello');
    expect(email?.text).toContain('Sent from the Book appointment form on the UEMS Ventures website.');
  });

  it('rejects other methods, other origins and non-JSON bodies without sending', async () => {
    const d = deps();
    expect((await handleEnquiry(new Request(`${origin}/api/enquiry`), d)).status).toBe(405);
    expect((await handleEnquiry(post(valid, { Origin: 'https://evil.example' }), d)).status).toBe(403);
    const noOrigin = post(valid);
    noOrigin.headers.delete('Origin');
    expect((await handleEnquiry(noOrigin, d)).status).toBe(403);
    expect((await handleEnquiry(post(valid, { 'Content-Type': 'text/plain' }), d)).status).toBe(415);
    expect((await handleEnquiry(post('{not json'), d)).status).toBe(400);
    expect(d.send).not.toHaveBeenCalled();
  });

  it('rejects oversized bodies', async () => {
    const d = deps();
    const huge = { ...valid, lines: ['x'.repeat(17 * 1024)] };
    expect((await handleEnquiry(post(huge), d)).status).toBe(413);
    expect(d.send).not.toHaveBeenCalled();
  });

  it('answers 429 with a mail-app fallback when the client is rate limited', async () => {
    const d = deps(undefined, vi.fn<Allow>().mockResolvedValue(false));
    const res = await handleEnquiry(post(valid), d);
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({ fallback: 'mailto' });
    expect(d.allow).toHaveBeenCalledWith('203.0.113.7');
    expect(d.send).not.toHaveBeenCalled();
  });

  it('answers 503 with a mail-app fallback when email delivery fails', async () => {
    const error = Object.assign(new Error('destination not verified'), { code: 'E_DELIVERY_FAILED' });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await handleEnquiry(post(valid), deps(vi.fn<Deps['send']>().mockRejectedValue(error)));
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ fallback: 'mailto' });
  });

  it('never caches responses and marks them as JSON', async () => {
    const res = await handleEnquiry(post(valid), deps());
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.headers.get('content-type')).toBe('application/json');
  });
});

describe('parseSubmission', () => {
  it.each([
    ['unknown form', { ...valid, form: 'newsletter' }],
    ['prototype key as form', { ...valid, form: 'toString' }],
    ['empty subject', { ...valid, subject: '  ' }],
    ['long subject', { ...valid, subject: 'x'.repeat(151) }],
    ['no lines', { ...valid, lines: [] }],
    ['blank lines only', { ...valid, lines: ['', ' '] }],
    ['non-string line', { ...valid, lines: ['ok', 3] }],
    ['too many lines', { ...valid, lines: Array.from({ length: 41 }, () => 'x') }],
    ['header injection in reply-to', { ...valid, replyTo: 'a@b.co\r\nBcc: victim@example.com' }],
    ['display name in reply-to', { ...valid, replyTo: 'Asha <asha@example.com>' }],
  ])('rejects %s', (_case, body) => {
    expect(typeof parseSubmission(body)).toBe('string');
  });

  it('accepts a registration without a reply-to address', () => {
    const result = parseSubmission({ ...valid, form: 'free-counselling-registration', replyTo: undefined });
    expect(result).toMatchObject({ form: 'free-counselling-registration' });
    expect(composeEmail(result as Exclude<typeof result, string>).text).toContain('please reply by phone');
  });

  it('collapses line breaks in the subject so it stays one header line', () => {
    expect(parseSubmission({ ...valid, subject: 'Hello\r\nBcc: x@y.z' })).toMatchObject({ subject: 'Hello Bcc: x@y.z' });
  });
});

describe('abuse limits', () => {
  it('groups IPv6 clients by /64 so rotating addresses share one limit', () => {
    expect(rateLimitKey('2001:db8:abcd:12:1::7')).toBe('2001:db8:abcd:12::/64');
    expect(rateLimitKey('2001:0db8:abcd:0012:ffff:ffff:ffff:ffff')).toBe('2001:db8:abcd:12::/64');
    expect(rateLimitKey('2001:db8::1')).toBe('2001:db8:0:0::/64');
    expect(rateLimitKey('203.0.113.7')).toBe('203.0.113.7');
    expect(rateLimitKey(null)).toBe('unknown');
  });

  it('stops reading a streamed body without Content-Length once it passes 16 KB', async () => {
    const d = deps();
    const chunk = new TextEncoder().encode('x'.repeat(4096));
    let sent = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        sent++;
        if (sent > 100) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const req = new Request(`${origin}/api/enquiry`, {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body,
      duplex: 'half',
    } as RequestInit);
    expect((await handleEnquiry(req, d)).status).toBe(413);
    expect(sent).toBeLessThan(10);
    expect(d.send).not.toHaveBeenCalled();
  });

  it('checks the rate limit before reading the body', async () => {
    const d = deps(undefined, vi.fn<Allow>().mockResolvedValue(false));
    const req = post('{not even json');
    expect((await handleEnquiry(req, d)).status).toBe(429);
    expect(req.bodyUsed).toBe(false);
  });
});
