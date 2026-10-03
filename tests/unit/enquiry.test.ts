import { afterEach, describe, expect, it, vi } from 'vitest';
import { site } from '../../src/data/site';
import type { Enquiry } from '../../src/lib/enquiry';
import { buildRegistrationMailto } from '../../src/lib/enquiry';

const enquiry: Enquiry = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  heardFrom: 'Google',
  queryAbout: 'Migration',
  question: 'Which visa suits me?\nThanks',
  interest: { label: 'I want to migrate to', value: 'Canada' },
};

/** The endpoint is read at module load, so each test imports a fresh copy. */
async function loadEnquiry() {
  vi.resetModules();
  return import('../../src/lib/enquiry');
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('buildMailto', () => {
  it('addresses UEMS and pre-fills subject and body', async () => {
    const { buildMailto } = await loadEnquiry();
    const url = new URL(buildMailto(enquiry));
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(site.email);
    expect(url.searchParams.get('subject')).toBe('Website enquiry – Migration');
    expect(url.searchParams.get('body')).toBe(
      [
        'Name: Asha Rao',
        'Email: asha@example.com',
        'Contact number: +91 98765 43210',
        'Where did you hear about us: Google',
        'Query about: Migration',
        'I want to migrate to: Canada',
        '',
        'Which visa suits me?\nThanks',
      ].join('\n'),
    );
  });

  it('omits optional lines that were left empty', async () => {
    const { buildMailto } = await loadEnquiry();
    const url = new URL(
      buildMailto({ ...enquiry, heardFrom: '', queryAbout: '', question: '', interest: undefined }),
    );
    expect(url.searchParams.get('subject')).toBe('Website enquiry');
    expect(url.searchParams.get('body')).toBe(
      'Name: Asha Rao\nEmail: asha@example.com\nContact number: +91 98765 43210',
    );
  });

  it('encodes characters that would otherwise break the URL', async () => {
    const { buildMailto } = await loadEnquiry();
    const raw = buildMailto({ ...enquiry, question: 'A & B? #1' });
    expect(raw).toContain('A%20%26%20B%3F%20%231');
    expect(new URL(raw).searchParams.get('body')).toContain('A & B? #1');
  });
});

const ok = () => vi.fn<typeof fetch>().mockResolvedValue(new Response('{"ok":true}', { status: 200 }));

describe('submitEnquiry', () => {
  it('posts the message to the site email endpoint by default', async () => {
    const fetchMock = ok();
    vi.stubGlobal('fetch', fetchMock);
    const { submitEnquiry } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).resolves.toBe('sent');
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init = {}] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('/api/enquiry');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('content-type')).toBe('application/json');
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ form: 'enquiry', subject: 'Website enquiry – Migration', replyTo: 'asha@example.com' });
    expect(body.lines).toContain('Name: Asha Rao');
    expect(body.fields).toEqual(enquiry);
  });

  it('uses VITE_ENQUIRY_ENDPOINT when a build sets one', async () => {
    vi.stubEnv('VITE_ENQUIRY_ENDPOINT', 'https://forms.example.com/uems');
    const fetchMock = ok();
    vi.stubGlobal('fetch', fetchMock);
    const { submitEnquiry } = await loadEnquiry();

    await submitEnquiry(enquiry);
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://forms.example.com/uems');
  });

  it('rejects when the endpoint says the submission itself is invalid', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 400 })));
    const { submitEnquiry, SubmissionRejected } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).rejects.toBeInstanceOf(SubmissionRejected);
  });

  it.each([
    ['email not set up yet', () => Promise.resolve(new Response('{}', { status: 503 }))],
    ['rate limited', () => Promise.resolve(new Response('{}', { status: 429 }))],
    ['no endpoint on this host', () => Promise.resolve(new Response('not found', { status: 404 }))],
    ['network failure', () => Promise.reject(new TypeError('Failed to fetch'))],
  ])('falls back to the visitor mail app when %s', async (_case, respond) => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockImplementation(respond));
    const { submitEnquiry } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).resolves.toBe('mail-client');
  });
});

describe('buildRegistrationMailto', () => {
  it('addresses UEMS with every filled registration field', () => {
    const url = buildRegistrationMailto({
      role: 'Parent',
      location: 'Dubai, UAE',
      applicantName: 'Asha Rao',
      school: 'Greenfield School',
      curriculum: 'IB',
      grade: 'Grade 11',
      completionYear: '2028',
      phone: '+971 50 123 4567',
      interest: 'Global Profile Accelerator',
    });
    expect(url.startsWith('mailto:info@uemsventures.com?')).toBe(true);
    const body = decodeURIComponent(url.split('body=')[1] ?? '');
    expect(body).toContain('I am a: Parent');
    expect(body).toContain('City / Country: Dubai, UAE');
    expect(body).toContain('Year of completion: 2028');
    expect(decodeURIComponent(url)).toContain('Free counselling registration – Asha Rao');
  });
});

describe('appointment requests', () => {
  const appointment = {
    name: 'Asha Rao',
    email: 'asha@example.com',
    phone: '+91 98765 43210',
    date: '2026-10-14',
    time: 'Morning',
    mode: 'Online video call',
    topic: 'Study Abroad',
    message: 'I would like to discuss UK universities.',
  };

  it('formats the preferred date without a time zone shift', async () => {
    const { formatDate } = await loadEnquiry();
    expect(formatDate('2026-10-14')).toBe('Wednesday, 14 October 2026');
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });

  it('emails UEMS the full request', async () => {
    const { buildAppointmentMailto } = await loadEnquiry();
    const url = new URL(buildAppointmentMailto(appointment));
    expect(url.pathname).toBe(site.email);
    expect(url.searchParams.get('subject')).toBe('Appointment request: Asha Rao');
    expect(url.searchParams.get('body')).toBe(
      [
        'Name: Asha Rao',
        'Email: asha@example.com',
        'Contact number: +91 98765 43210',
        'Preferred date: Wednesday, 14 October 2026',
        'Preferred time: Morning',
        'Meeting type: Online video call',
        'Appointment about: Study Abroad',
        '',
        'I would like to discuss UK universities.',
      ].join('\n'),
    );
  });

  it('posts the request with the visitor as reply-to', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const { submitAppointment } = await loadEnquiry();

    await expect(submitAppointment(appointment)).resolves.toBe('sent');
    const [, init = {}] = fetchMock.mock.calls[0] ?? [];
    expect(JSON.parse(String(init.body))).toMatchObject({
      form: 'appointment-request',
      subject: 'Appointment request: Asha Rao',
      replyTo: 'asha@example.com',
      fields: appointment,
    });
  });
});
