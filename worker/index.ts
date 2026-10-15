/**
 * Cloudflare Worker entry. Static pages are served straight from the assets directory;
 * only /api/* requests reach this script (see run_worker_first in wrangler.jsonc).
 */
import { handleEnquiry, RECIPIENT, SENDER } from './enquiry';

interface WorkerEnv {
  ASSETS: Fetcher;
  /** Resend API key (set with `wrangler secret put RESEND_API_KEY`). */
  RESEND_API_KEY?: string;
  ENQUIRY_LIMITER?: RateLimit;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname !== '/api/enquiry') return env.ASSETS.fetch(request);

    return handleEnquiry(request, {
      // Sends via Resend from UEMS' own domain to UEMS only; the visitor is set as reply-to,
      // never a recipient. Throws on failure so the form falls back to the visitor's mail app.
      async send({ subject, text, replyTo }) {
        if (!env.RESEND_API_KEY) throw new Error('Email delivery is not configured');
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: `${SENDER.name} <${SENDER.email}>`,
            to: [RECIPIENT],
            ...(replyTo ? { reply_to: [replyTo] } : {}),
            subject,
            text,
          }),
        });
        if (!res.ok) {
          throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`);
        }
      },
      allow: env.ENQUIRY_LIMITER
        ? async (key) => (await env.ENQUIRY_LIMITER!.limit({ key })).success
        : undefined,
    });
  },
} satisfies ExportedHandler<WorkerEnv>;
