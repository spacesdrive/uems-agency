/**
 * Cloudflare Worker entry. Static pages are served straight from the assets directory;
 * only /api/* requests reach this script (see run_worker_first in wrangler.jsonc).
 */
import { handleEnquiry, RECIPIENT, SENDER } from './enquiry';

interface WorkerEnv {
  ASSETS: Fetcher;
  ENQUIRY_EMAIL?: SendEmail;
  ENQUIRY_LIMITER?: RateLimit;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname !== '/api/enquiry') return env.ASSETS.fetch(request);

    return handleEnquiry(request, {
      async send({ subject, text, replyTo }) {
        if (!env.ENQUIRY_EMAIL) throw new Error('Email delivery is not configured');
        await env.ENQUIRY_EMAIL.send({ to: RECIPIENT, from: SENDER, replyTo, subject, text });
      },
      allow: env.ENQUIRY_LIMITER
        ? async (key) => (await env.ENQUIRY_LIMITER!.limit({ key })).success
        : undefined,
    });
  },
} satisfies ExportedHandler<WorkerEnv>;
