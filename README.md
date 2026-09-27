# UEMS Ventures website

Redesign of [uemsventures.com](https://uemsventures.com/): UEMS Ventures content, pages and brand, presented in the
design language of the Hirael agency landing template. Built with React 19, TypeScript and Vite, and pre-rendered
to static HTML for every route.

## Scripts

```bash
npm install
npm run dev            # development server with hot reload
npm run build          # typecheck → client build → SSR build → pre-render every route into dist/
npm run preview        # serve dist/ locally
npm run preview:cf     # serve dist/ through the Cloudflare runtime (headers, redirects, 404)
npm run lint           # oxlint (TypeScript, React, hooks, a11y rules)
npm run typecheck
npm test               # Vitest: unit, component and integration tests
npm run test:coverage
npm run verify:dist    # check the build artifact before deploying
```

## Testing

Tests live in `tests/` and run with Vitest and Testing Library in jsdom:

- `tests/unit`: link helpers, route matching, internal-link integrity across all content data, JSON-LD
  escaping, and enquiry submission (endpoint and mailto fallback).
- `tests/components`: enquiry form validation and submission states, header dropdowns and mobile menu, the
  destination tabs' keyboard support, RichText and SmartLink.
- `tests/integration`: server-renders every route through `src/entry-server.tsx`, the same entry the
  pre-render step uses, and checks the heading, title, description, canonical URL and indexing rules.

## How it works

- **Routing** – `src/routes.ts` is the single route table. Each route loads lazily (one small chunk per page), and
  links preload the target chunk on hover, focus or touch.
- **Pre-rendering** – `scripts/prerender.mjs` renders each route with `react-dom/static` and writes
  `dist/<route>/index.html`, plus `404.html` and `sitemap.xml`. React 19 renders `<title>`/`<meta>` from each page,
  and the script moves those tags into `<head>` and inlines the stylesheet. The client hydrates only when
  the page markup matches the current URL, and otherwise renders from scratch.
- **Content model** – most inner pages are data, not markup: `src/data/pages/**` files describe a hero and a list of
  sections made of typed blocks (`src/data/types.ts`), rendered by `src/pages/ContentPage.tsx` and
  `src/blocks/`. To edit copy, change the data file. Text fields support `**bold**` and `[label](href)`.
- **Shared data** – company details, navigation and footer links are in `src/data/site.ts`. Home page content is in
  `src/data/home.ts`, reviews in `src/data/reviews.ts`, and blog/news listings in `src/data/posts.ts`.
- **Styling** – plain CSS with design tokens in `src/styles/tokens.css` and CSS Modules per component. Motion uses
  CSS transforms and opacity only. `prefers-reduced-motion` turns it off.
- **Hero background** – `src/lib/fluidGlass.ts` is a dependency-free WebGL renderer written for this site. It runs
  three passes: a pointer ink/shadow simulation, a blurred low-resolution scene, and a glass pass. The glass pass
  gives each flute cylindrical refraction, colour fringes, streaking along the flute and a rim light, so the ink
  shows up as soft coral streaks with vivid edges and fades after about a second (`TRAIL_INK` in
  `src/components/HeroBackdrop.tsx`). The canvas fades in over a CSS fallback. It pauses
  when the hero is off screen or the tab is hidden, and it draws a single still frame when reduced motion is on.
  The reference template builds this effect with the proprietary `shaders` package. That package needs a paid
  licence for commercial sites, so this site doesn't use it.
- **Images** – optimised WebP files at several widths live in `public/images/`. `src/data/images.ts` records the
  dimensions for each one, and `<Img>` uses them to output `srcset`, `width`/`height` and lazy loading.

## Directory layout

```
src/
├── blocks/        content blocks for data-driven pages
├── components/    shared UI (Header, Footer, Button, PageHero, Img, EnquiryForm…)
├── data/          site, page and listing content; generated image manifest
├── layouts/       SiteLayout (header, main, footer, scroll & focus handling)
├── lib/           small utilities (reveal observer, enquiry submission, links)
├── pages/         route components (Home, ContentPage, Blogs, News, Contact, legal, 404)
├── sections/      home page sections and the contact section
├── styles/        tokens and base styles
├── entry-server.tsx
└── main.tsx
tests/             unit, component and integration tests (Vitest)
scripts/           prerender, dist verification, production smoke test
.github/           CI/CD workflow and Dependabot
```

## Deployment

Production is **https://uems-agency.spacesdrive.cc**, served by Cloudflare Workers static assets. Every push to
`main` that changes the app runs lint, type checking, tests, dependency and secret scans, and a production build.
Only then does it deploy and run a smoke test against the live site. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
for the pipeline, secrets and rollback.

`dist/` also works on any other static host:

- Configure the host to serve `404.html` for unknown paths. If the host serves `index.html` instead, the app still
  shows the 404 page because it renders on the client.
- Canonical URLs use trailing slashes (`/about-us/`), matching the current site. The pre-rendered files live at
  `/<route>/index.html`, so most hosts serve both forms.
- The enquiry form posts JSON to `VITE_ENQUIRY_ENDPOINT` when it is set at build time (see `.env.example`).
  Without it, the form opens the visitor's email client addressed to `info@uemsventures.com`.

## Content notes

- Blog and news articles link to their full versions on the current UEMS blog. Only the listings were migrated.
- The interactive free career quiz on `/best-free-career-personality-test` is a plugin on the current site. This
  page includes all its content, but the quiz itself needs to be connected again.
- The current site's "Write a review" link used a placeholder Google place ID. It now opens a Google search for the
  UEMS listing. Replace it with the real review link from Google Business Profile.
- The current Disclaimer page says "Coming soon", and this build keeps that (the page is `noindex`).
