/**
 * POST /api/enquiry: emails website form submissions to UEMS.
 *
 * Pure request handling with the email transport injected, so it can be unit tested without
 * the Workers runtime. Abuse is bounded by design: the recipient is fixed (this can never be
 * used to send mail to anyone else), requests must come from this site, bodies are size
 * limited, and a rate limiter caps volume per client.
 */

export const RECIPIENT = 'info@uemsventures.com';
export const SENDER = { name: 'UEMS Ventures website', email: 'website@spacesdrive.cc' };

const FORMS = {
  enquiry: 'Contact form',
  'free-counselling-registration': 'Free counselling registration form',
  'appointment-request': 'Book appointment form',
} as const;
type FormKind = keyof typeof FORMS;

const MAX_BODY_BYTES = 16 * 1024;
const MAX_LINES = 40;
const MAX_LINE_LENGTH = 2000;
const MAX_SUBJECT_LENGTH = 150;
const emailPattern = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]+$/;

export interface OutgoingEmail {
  subject: string;
  text: string;
  replyTo?: string;
}

export interface Deps {
  /** Sends the email from SENDER to RECIPIENT. Throws if delivery is refused. */
  send(email: OutgoingEmail): Promise<void>;
  /** Returns false when this client has sent too many requests. */
  allow?(key: string): Promise<boolean>;
}

export interface Submission {
  form: FormKind;
  subject: string;
  lines: string[];
  replyTo?: string;
}

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });

/** Validates the JSON body. Returns the submission, or the reason it was rejected. */
export function parseSubmission(body: unknown): Submission | string {
  if (typeof body !== 'object' || body === null) return 'Body must be a JSON object.';
  const { form, subject, lines, replyTo } = body as Record<string, unknown>;
  if (typeof form !== 'string' || !Object.hasOwn(FORMS, form)) return 'Unknown form.';
  if (typeof subject !== 'string' || !subject.trim() || subject.length > MAX_SUBJECT_LENGTH) return 'Invalid subject.';
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES) return 'Invalid message.';
  if (!lines.every((l) => typeof l === 'string' && l.length <= MAX_LINE_LENGTH)) return 'Invalid message.';
  if (!lines.some((l) => l.trim())) return 'Empty message.';
  if (replyTo !== undefined && (typeof replyTo !== 'string' || replyTo.length > 254 || !emailPattern.test(replyTo))) {
    return 'Invalid reply-to address.';
  }
  return { form: form as FormKind, subject: subject.replace(/\s+/g, ' ').trim(), lines, replyTo };
}

/** The email UEMS receives: the visitor's details, then a short note on where it came from. */
export function composeEmail(submission: Submission): OutgoingEmail {
  const text = [
    ...submission.lines,
    '',
    '--',
    `Sent from the ${FORMS[submission.form]} on the UEMS Ventures website.`,
    submission.replyTo ? 'Reply to this email to answer the visitor directly.' : 'No email address was given, so please reply by phone.',
  ].join('\n');
  return { subject: submission.subject, text, replyTo: submission.replyTo };
}

/**
 * Rate-limit bucket for a client. IPv6 users usually control a whole /64, so limiting by the
 * exact address could be dodged by rotating addresses; IPv4 addresses are limited individually.
 */
export function rateLimitKey(ip: string | null): string {
  if (!ip) return 'unknown';
  if (!ip.includes(':')) return ip;
  const [head = '', tail = ''] = ip.toLowerCase().split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const groups = ip.includes('::') ? [...left, ...Array<string>(8 - left.length - right.length).fill('0'), ...right] : left;
  return `${groups.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, '')).join(':')}::/64`;
}

/** Reads the body as text, stopping as soon as it exceeds `limit` bytes (also covers chunked uploads). */
export async function readCapped(request: Request, limit: number): Promise<string | null> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  // Stream chunks must be read one after another.
  for (;;) {
    // oxlint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      // oxlint-disable-next-line no-await-in-loop
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function handleEnquiry(request: Request, deps: Deps): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' });

  // Only this site's own pages may submit (browsers always send Origin on POST requests).
  if (request.headers.get('Origin') !== new URL(request.url).origin) return json(403, { error: 'Forbidden.' });

  if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) {
    return json(415, { error: 'Send JSON.' });
  }
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return json(413, { error: 'Too large.' });

  // Rate limit before reading the body, so floods cost as little as possible.
  if (deps.allow && !(await deps.allow(rateLimitKey(request.headers.get('CF-Connecting-IP'))))) {
    return json(429, { error: 'Too many requests. Please email us instead.', fallback: 'mailto' });
  }

  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return json(413, { error: 'Too large.' });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid JSON.' });
  }
  const submission = parseSubmission(body);
  if (typeof submission === 'string') return json(400, { error: submission });

  try {
    await deps.send(composeEmail(submission));
  } catch (error) {
    // e.g. email delivery is not set up yet. The site then opens the visitor's mail app instead.
    const code = (error as { code?: string } | null)?.code;
    console.error('Enquiry email failed:', code ?? '', error instanceof Error ? error.message : String(error));
    return json(503, { error: 'Email is unavailable right now.', fallback: 'mailto' });
  }
  return json(200, { ok: true });
}
