/**
 * Seminars, webinars and events, shown on /news-and-events ("Seminars & Events").
 *
 * The page stays lightweight on purpose: no photos or video files are hosted here.
 * Each event links to its write-up, and to its YouTube video when there is one.
 *
 * To add an event, put a new entry at the top of `upcomingEvents` (before it happens)
 * or `pastEvents` (newest first). `url` can be a blog post or any page about the event;
 * `video` is the full YouTube link, e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX.
 */
export interface EventItem {
  readonly title: string;
  /** Date as shown on the page, e.g. "September 16, 2023". */
  readonly date: string;
  /** Where to read about the event. */
  readonly url: string;
  /** YouTube video of the event, if one was published. */
  readonly video?: string;
}

const blog = 'https://uemsventures.com';
const youtube = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** Seminars and events that have not happened yet. Empty until new dates are announced. */
export const upcomingEvents: readonly EventItem[] = [];

/** Past seminars and events from the UEMS Ventures blog, newest first. */
export const pastEvents: readonly EventItem[] = [
  {
    title: 'Webinar on Achieving excellence beyond the classroom',
    date: 'September 16, 2023',
    url: `${blog}/webinar-on-achieving-excellence-beyond-the-classroom/`,
  },
  {
    title: 'Career Clarity “Webinar” at The Heartfulness Learning Centre',
    date: 'February 17, 2023',
    url: `${blog}/career-clarity-webinar-at-the-heartfulness-learning-centre/`,
  },
  {
    title: 'S’cool’ Fest “Zest Fest 2022” (Mumbai)',
    date: 'February 16, 2023',
    url: `${blog}/scool-fest-zest-fest-2022-mumbai/`,
    video: youtube('FD73u3dbywo'),
  },
  {
    title: 'Webinar for Pragyan Foundation (Promoter of Pragyan International University)',
    date: 'May 11, 2022',
    url: `${blog}/webinar-for-pragyan-foundation-promoter-of-pragyan-international-university/`,
    video: youtube('0qXKXKQjh5c'),
  },
  {
    title: 'Seminar for Bunts Sangha Youth Wing, Mumbai',
    date: 'May 11, 2022',
    url: `${blog}/seminar-for-bunts-sangha-youth-wing-mumbai-presented-by-uems-ventures/`,
    video: youtube('Puay5mttPoc'),
  },
  {
    title: 'Webinar for Shri Kumarswami Mahavidhyalaya, Ausa, Latur, Maharashtra',
    date: 'May 11, 2022',
    url: `${blog}/webinar-for-shri-kumarswami-mahavidhyalaya-ausa-dist-latur-maharashtra-india/`,
  },
  {
    title: 'Webinar for Bharathi Vidyalaya English Medium School',
    date: 'April 10, 2021',
    url: `${blog}/webinar-for-bharathi-vidyalaya-english-medium-school/`,
  },
  {
    title: 'College Fair 2021',
    date: 'February 13, 2021',
    url: `${blog}/college-fair-2021/`,
  },
  {
    title: 'Webinar at St Johns College, Palghar',
    date: 'November 5, 2020',
    url: `${blog}/webinar-at-st-johns-college-palghar-november-2020/`,
  },
  {
    title: 'Seminar at St Johns College of Engineering',
    date: 'October 6, 2020',
    url: `${blog}/seminar-at-st-johns-college-of-engineering/`,
  },
  {
    title: 'Seminar at Wisdom High School',
    date: 'October 6, 2020',
    url: `${blog}/seminar-at-wisdom-high-school/`,
  },
  {
    title: 'Seminar at Garodia International',
    date: 'October 6, 2020',
    url: `${blog}/seminar-at-garodia-international/`,
  },
  {
    title: 'Seminar at Aeon Classes',
    date: 'October 6, 2020',
    url: `${blog}/seminar-at-aeon-classes/`,
  },
  {
    title: 'Free Career Guidance session Webinar at Professor’s Academy',
    date: 'August 5, 2020',
    url: `${blog}/free-career-guidance-session-webinar-at-professors-academy/`,
  },
];
