# Deployment

The site is deployed to **https://uems-agency.spacesdrive.cc** as a
[Cloudflare Workers static-assets](https://developers.cloudflare.com/workers/static-assets/) site. Every route is a
pre-rendered HTML file in `dist/`, served directly from Cloudflare's edge. A small Worker script (`worker/`) handles
only `/api/enquiry`, which emails form submissions to UEMS.

## Pipeline

`.github/workflows/ci-cd.yml` runs on pushes to `main`, on pull requests into `main`, and when started manually.

```text
push to main
  └─ paths-ignore: pushes that only change docs (*.md, docs/**) or repo metadata do not start a run
      ├─ validate      npm ci --ignore-scripts → npm audit signatures → lint → typecheck → tests
      │                → npm audit (high) → production build → verify dist/ → upload artifact
      ├─ secret-scan   gitleaks (checksum-verified CLI) over the full git history, findings redacted
      └─ deploy        needs both jobs above, main branch only, "production" environment
                       download the tested artifact → re-verify → wrangler deploy → production smoke test
```

- Pull requests run `validate` and `secret-scan` only. They never deploy, and they cannot read the Cloudflare
  secrets.
- The deploy job uploads the same `dist/` artifact that was tested. It does not rebuild.
- Deploys are serialised (`concurrency: production-deploy`) and are never cancelled part-way through.
- `scripts/smoke-production.mjs` waits until the live site serves the new build, by matching its hashed entry
  script. It then checks the key routes, the trailing-slash redirect, the 404 page, the security headers,
  immutable asset caching and the HTTP→HTTPS redirect.

## Configuration

| File | Purpose |
| --- | --- |
| `wrangler.jsonc` | Worker name `uems-agency`, `dist/` as assets, trailing-slash HTML handling, `404.html` for unknown URLs, custom domain route. `workers.dev` and preview URLs are disabled. |
| `public/_headers` | CSP, HSTS, `nosniff`, frame blocking, referrer and permissions policies, and long-lived caching for hashed `/assets/*`. Copied into `dist/`. |
| `worker/` | The Worker behind `/api/enquiry`: validates form submissions and emails them to info@uemsventures.com (`send_email` binding), with a rate limit of 5 per minute per visitor. Every other request is served from `dist/`. |
| `scripts/verify-dist.mjs` | Fails the build if a route page, `_headers`, `404.html` or `sitemap.xml` is missing. Also fails if source maps, env/credential/config files, or secret-like strings are in the artifact. |

## Form email delivery

Forms post to `/api/enquiry`, and the Worker emails each submission to **info@uemsventures.com** from
`website@spacesdrive.cc`, with Reply-To set to the visitor. This uses Cloudflare Email Routing, which is free on
every plan when sending to a verified address.

| Step | Status |
| --- | --- |
| Email Routing enabled on `spacesdrive.cc` (Cloudflare MX, SPF and DKIM records added; the zone had no mail records before) | Done |
| `info@uemsventures.com` added as a destination address | Done |
| Someone with access to that inbox clicks **Verify email address** in the email from Cloudflare | Needed once |

Until the address is verified, sends are refused and every form opens the visitor's mail app instead, so nothing
breaks. After verification, emails start arriving straight away; no redeploy is needed. To check the status, open
Cloudflare → Email Service → Email Routing → Destination addresses. If the verification email expired, resend it
from there.

Emails sent by the Worker appear in the Email Routing summary as "dropped" even when delivered; check the Email
Service logs for delivery instead.

## Secrets

The deploy job reads two secrets from the GitHub **`production` environment**, which is restricted to the `main`
branch:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token used by Wrangler |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account that owns the `spacesdrive.cc` zone |

The secrets are never written to files, logs or the repository. Wrangler reads them from the environment of
that one step.

**Recommended token scope** (least privilege). Create a dedicated token for this site with only:

- Account → Workers Scripts → Edit
- Zone (`spacesdrive.cc` only) → Workers Routes → Edit
- Zone (`spacesdrive.cc` only) → DNS → Edit (needed to attach the custom domain)
- Account → Email Routing Addresses → Read (only needed to check delivery status)

To rotate the token, create a new one in the Cloudflare dashboard, then run
`gh secret set CLOUDFLARE_API_TOKEN --env production --repo spacesdrive/uems-agency` and paste the value at the
prompt. Revoke the old token afterwards.

## Deploying manually

CI is the normal path. A manual deploy from a trusted machine needs the two variables in the shell environment,
never in a file inside the repository:

```bash
npm ci
npm run build && npm run verify:dist
npx wrangler deploy
node scripts/smoke-production.mjs https://uems-agency.spacesdrive.cc
```

`npm run preview:cf` serves `dist/` locally through the Cloudflare runtime (`wrangler dev`), including
`_headers`, redirects and 404 handling.

## Rollback

Every deploy creates a Worker version tagged with the commit SHA. To roll back, run `npx wrangler rollback`, or
use Workers & Pages → `uems-agency` → Deployments in the dashboard. Reverting the commit on `main` also redeploys
the previous code through the pipeline.
