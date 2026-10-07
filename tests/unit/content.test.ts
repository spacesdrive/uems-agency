import { describe, expect, it } from 'vitest';
import { pastEvents, upcomingEvents } from '../../src/data/events';
import { metrics, profileServices, whyUems } from '../../src/data/home';
import aboutPage from '../../src/data/pages/about';
import programsPage from '../../src/data/pages/programs';
import { primaryNav, site } from '../../src/data/site';
import { findRoute } from '../../src/routes';

/** Content decisions from the client's change list (Fixes.pdf) that must not regress. */
const allData = JSON.stringify(Object.values(import.meta.glob('../../src/data/**/*.ts', { eager: true })));
const navLabels = [primaryNav, primaryNav.flatMap((item) => item.children ?? [])].flat().map((link) => link.label);

describe('partner institution figures', () => {
  it('show 1200+ on the home page and the Programs page', () => {
    expect(metrics.items.find((m) => /partner/i.test(m.label))?.value).toBe('1200+');
    expect(JSON.stringify(programsPage)).not.toMatch(/\b200\+/);
    expect(JSON.stringify(programsPage).match(/1200\+/g)).toHaveLength(3);
  });
});

describe('home page', () => {
  it('no longer repeats the founder photo in "Why choose UEMS"', () => {
    expect(JSON.stringify(whyUems)).not.toContain('founder');
  });

  it('features EVAL Career Clarity, Global Profile Accelerator and External Exams, each linking to its page', () => {
    expect(profileServices.items.map((i) => i.title)).toEqual([
      'EVAL Career Clarity',
      'Global Profile Accelerator',
      'External Exams',
    ]);
    for (const item of profileServices.items) {
      expect(findRoute(item.to)).toBeDefined();
    }
    expect(profileServices.items[1]?.to).toBe('/#global-profile-accelerator');
  });
});

describe('contact details', () => {
  it('label the Australian address "Australia office" while keeping the address', () => {
    const australia = site.offices.find((o) => o.lines.join(' ').includes('Australia'));
    expect(australia?.label).toBe('Australia office');
    expect(allData).not.toMatch(/Sydney office/i);
  });
});

describe('about page', () => {
  it('uses photos in "Unique for a reason" that do not repeat the home page team photos', () => {
    expect(JSON.stringify(aboutPage)).not.toMatch(/"team-[123]"/);
  });
});

describe('appointments', () => {
  it('no longer use the Picktime booking widget', () => {
    expect(allData).not.toMatch(/picktime/i);
    expect(findRoute(site.appointmentPath)).toBeDefined();
  });
});

describe('career guidance navigation', () => {
  it('renames Test Career Counselling and drops the Premium assessment page', () => {
    expect(navLabels).toContain('Career Counselling');
    expect(navLabels.join('|')).not.toMatch(/test career|premium/i);
  });
});

describe('seminars and events', () => {
  it('replace News flash and trending posts', () => {
    expect(navLabels).toContain('Seminars & Events');
    expect(allData).not.toMatch(/news flash/i);
  });

  it('link videos to YouTube instead of hosting them', () => {
    const videos = [...upcomingEvents, ...pastEvents].flatMap((e) => (e.video ? [e.video] : []));
    expect(videos.length).toBeGreaterThan(0);
    for (const video of videos) expect(video).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
    expect(site.youtubeUrl).toBe('https://www.youtube.com/@uemsventures');
  });

  it('list each event once, newest first, with a real date', () => {
    const urls = pastEvents.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    const times = pastEvents.map((e) => Date.parse(e.date));
    for (const t of times) expect(Number.isNaN(t)).toBe(false);
    expect(times.toSorted((a, b) => b - a)).toEqual(times);
  });
});

describe('consistency follow-ups', () => {
  it('say Australia, not Sydney, outside the street address and proper names', () => {
    const stripped = allData
      .replace(/Sydney NSW 2000|Sussex\+Street\+Sydney|UTS Sydney|Sydney Opera House/g, '');
    expect(stripped).not.toMatch(/Sydney/);
    expect(JSON.stringify(aboutPage)).toContain('Our Australia team');
  });

  it('use one country figure for the partner network', () => {
    expect(JSON.stringify(programsPage)).not.toMatch(/30\+ countries/i);
    expect(metrics.items.find((m) => /partner/i.test(m.label))?.note).toBe('Across 40 countries');
  });

  it('use British spelling for counselling and counsellors (credential names excepted)', () => {
    const stripped = allData.replace(/Masters in Counseling Psychology|Global Career Counselor/g, '');
    expect(stripped).not.toMatch(/\bcounsel(or|ors|ing)\b/i);
  });
});

describe('October fixes', () => {
  const pages = Object.values(import.meta.glob<{ default: { meta: { title: string } } }>('../../src/data/pages/**/*.ts', { eager: true }));

  it('removes the Free Career Personality Test page and its menu link', () => {
    expect(findRoute('/best-free-career-personality-test/')).toBeUndefined();
    expect(navLabels.join('|')).not.toMatch(/personality test/i);
  });

  it('speaks to students everywhere, not only Mumbai, in page titles and buttons', () => {
    expect(allData).not.toMatch(/Talk to Mumbai expert/i);
    for (const page of pages) expect(page.default.meta.title).not.toMatch(/Mumbai/);
  });

  it('no longer links straight to the HDFC Credila application', () => {
    expect(allData).not.toMatch(/hdfccredila\.com\/apply/i);
  });
});
