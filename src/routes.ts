import { createElement, lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { ContentPageData } from './data/types';

type PageModule = { default: ComponentType };
type Loader = () => Promise<PageModule>;

export interface RouteDef {
  readonly path: string;
  readonly load: Loader;
  readonly Component: LazyExoticComponent<ComponentType>;
}

/** Pairs the shared content template with a page's data module. */
function contentPage(loadData: () => Promise<{ default: ContentPageData }>): Loader {
  return () =>
    Promise.all([import('./pages/ContentPage'), loadData()]).then(([template, data]) => ({
      default: function Page() {
        return createElement(template.ContentPage, { page: data.default });
      },
    }));
}

const table: ReadonlyArray<readonly [string, Loader]> = [
  ['/', () => import('./pages/HomePage')],
  ['/about-us', contentPage(() => import('./data/pages/about'))],
  ['/study-abroad-consultants', contentPage(() => import('./data/pages/studyAbroad'))],
  ['/study-in-australia', contentPage(() => import('./data/pages/destinations/australia'))],
  ['/studyincanada', contentPage(() => import('./data/pages/destinations/canada'))],
  ['/study-in-uk-ireland', contentPage(() => import('./data/pages/destinations/ukIreland'))],
  ['/study-in-usa', contentPage(() => import('./data/pages/destinations/usa'))],
  ['/study-in-asia', contentPage(() => import('./data/pages/destinations/asia'))],
  ['/study-in-new-zealand', contentPage(() => import('./data/pages/destinations/newZealand'))],
  ['/study-in-uae', contentPage(() => import('./data/pages/destinations/uae'))],
  ['/study-in-europe', contentPage(() => import('./data/pages/destinations/europe'))],
  ['/services', contentPage(() => import('./data/pages/services'))],
  ['/migration', contentPage(() => import('./data/pages/migration'))],
  ['/australia-migration', contentPage(() => import('./data/pages/australiaMigration'))],
  ['/career-guidance', contentPage(() => import('./data/pages/careerGuidance'))],
  ['/programs', contentPage(() => import('./data/pages/programs'))],
  ['/career-clarity-tests', contentPage(() => import('./data/pages/careerClarityTests'))],
  ['/career-talk', contentPage(() => import('./data/pages/careerTalk'))],
  ['/career-guidance/career-assessment-test', contentPage(() => import('./data/pages/careerAssessmentTest'))],
  ['/best-free-career-personality-test', contentPage(() => import('./data/pages/freeCareerTest'))],
  ['/test-career-counselling', contentPage(() => import('./data/pages/testCareerCounselling'))],
  ['/test-preparation-for-international-students', contentPage(() => import('./data/pages/testPrep'))],
  ['/ielts', contentPage(() => import('./data/pages/ielts'))],
  ['/franchise-channel-partners', contentPage(() => import('./data/pages/franchise'))],
  ['/blogs', () => import('./pages/BlogsPage')],
  ['/news-and-events', () => import('./pages/NewsEventsPage')],
  ['/contact-us', () => import('./pages/ContactPage')],
  ['/terms-conditions', () => import('./pages/legal/TermsPage')],
  ['/privacy-policy', () => import('./pages/legal/PrivacyPage')],
  ['/disclaimer', () => import('./pages/legal/DisclaimerPage')],
];

export const routes: readonly RouteDef[] = table.map(([path, load]) => ({ path, load, Component: lazy(load) }));

export const NotFound = lazy(() => import('./pages/NotFoundPage'));

function normalise(path: string): string {
  const clean = path.split(/[?#]/)[0] ?? '/';
  return clean.length > 1 ? clean.replace(/\/+$/, '').toLowerCase() : clean;
}

export function findRoute(path: string): RouteDef | undefined {
  const key = normalise(path);
  return routes.find((r) => r.path === key);
}

const preloaded = new Set<string>();

/** Starts loading a route's chunk ahead of navigation (hover, focus, touch). */
export function preloadRoute(path: string): Promise<unknown> | undefined {
  const route = findRoute(path);
  if (!route || preloaded.has(route.path)) return undefined;
  preloaded.add(route.path);
  return route.load();
}
