import { afterEach, describe, expect, it, vi } from 'vitest';
import { site } from '../../src/data/site';
import type { Enquiry } from '../../src/lib/enquiry';

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

describe('submitEnquiry', () => {
  it('posts JSON to the configured endpoint', async () => {
    vi.stubEnv('VITE_ENQUIRY_ENDPOINT', 'https://forms.example.com/uems');
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const { submitEnquiry } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).resolves.toBe('sent');
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init = {}] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://forms.example.com/uems');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('content-type')).toBe('application/json');
    expect(JSON.parse(String(init.body))).toEqual(enquiry);
  });

  it('rejects when the endpoint responds with an error status', async () => {
    vi.stubEnv('VITE_ENQUIRY_ENDPOINT', 'https://forms.example.com/uems');
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(new Response('nope', { status: 500 })));
    const { submitEnquiry } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).rejects.toThrow('status 500');
  });

  it('rejects when the network request fails', async () => {
    vi.stubEnv('VITE_ENQUIRY_ENDPOINT', 'https://forms.example.com/uems');
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch')));
    const { submitEnquiry } = await loadEnquiry();

    await expect(submitEnquiry(enquiry)).rejects.toThrow('Failed to fetch');
  });
});
