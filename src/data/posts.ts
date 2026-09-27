import type { ImageName } from './images';

export interface BlogPost {
  readonly title: string;
  readonly excerpt: string;
  readonly url: string;
  readonly image: ImageName;
  /** Display date where the original listing shows one. */
  readonly date?: string;
}

const base = 'https://uemsventures.com';

/** Latest articles from the UEMS Ventures blog (full articles live on the original blog). */
export const blogPosts: readonly BlogPost[] = [
  {
    title: 'Low-Cost Study Abroad Options for Indian Students (2026 Guide)',
    excerpt: 'Studying abroad is often seen as expensive, but in 2026, there are several…',
    url: `${base}/low-cost-study-abroad-options-for-indian-students-2026-guide/`,
    image: 'blog-1',
    date: 'Apr 20',
  },
  {
    title: 'Study Abroad Consultants in Mumbai: Why Choose UEMS Ventures?',
    excerpt: 'Planning to study abroad is a life-changing decision, but the process can be…',
    url: `${base}/study-abroad-consultants-in-mumbai-why-choose-uems-ventures/`,
    image: 'blog-2',
    date: 'Apr 20',
  },
  {
    title: 'Best European Countries with Post-Study Work Visa for Indian Students in 2026',
    excerpt: 'Choosing the right country is not just about education, it’s about what…',
    url: `${base}/best-european-countries-with-post-study-work-visa-for-indian-students-in-2026/`,
    image: 'blog-3',
    date: 'Apr 20',
  },
  {
    title: 'Top Affordable Countries to Study Abroad for Indian Students in 2026',
    excerpt: 'Studying abroad is no longer limited to expensive destinations like the USA or…',
    url: `${base}/top-affordable-countries-to-study-abroad-for-indian-students-in-2026/`,
    image: 'blog-4',
    date: 'Apr 16',
  },
  {
    title: 'Study in Europe from India: Complete Guide for 2026',
    excerpt: 'Europe has become one of the most preferred study destinations for Indian…',
    url: `${base}/study-in-europe-from-india-complete-guide-for-2026/`,
    image: 'blog-5',
  },
  {
    title: 'UK Student Visa Process for Indian Students',
    excerpt: 'The United Kingdom remains one of the most preferred destinations for higher…',
    url: `${base}/uk-student-visa-process-for-indian-students/`,
    image: 'blog-6',
  },
  {
    title: 'IELTS Requirement for UK Universities (2026 Guide for Indian Students)',
    excerpt: 'Planning to study in the UK in 2026 Every Indian student applying to a UK…',
    url: `${base}/ielts-requirement-for-uk-universities/`,
    image: 'blog-7',
  },
  {
    title: 'How Overseas Study Consultants Simplify Your Admission Process',
    excerpt: 'The admission process for studying abroad can feel complex and overwhelming…',
    url: `${base}/how-overseas-study-consultants-simplify-your-admission-process/`,
    image: 'blog-8',
  },
  {
    title: 'Why Choose Foreign Studies Consultants for Study Abroad',
    excerpt: 'Studying abroad is a major milestone that shapes a student academic and…',
    url: `${base}/why-choose-foreign-studies-consultants-in-mumbai-for-study-abroad/`,
    image: 'blog-9',
  },
  {
    title: 'How an Abroad Studies Consultancy Helps You Study Overseas',
    excerpt: 'Studying overseas is a dream for many students but turning that dream into…',
    url: `${base}/how-an-abroad-studies-consultancy-helps-you-study-overseas/`,
    image: 'blog-10',
  },
  {
    title: 'Role of International Education Consultants for Study Abroad',
    excerpt: 'Studying abroad is a major life decision that impacts a student’s…',
    url: `${base}/role-of-international-education-consultants-in-for-study-abroad/`,
    image: 'blog-11',
  },
  {
    title: 'Why Students Prefer the Best Education Consultants in Mumbai',
    excerpt: 'Studying abroad is one of the most important decisions in a student life With…',
    url: `${base}/why-students-prefer-the-best-education-consultants-in-mumbai/`,
    image: 'blog-12',
  },
];

export const blogArchiveUrl = `${base}/blogs/page/2/`;

export interface NewsItem {
  readonly title: string;
  readonly excerpt?: string;
  readonly url: string;
  readonly date?: string;
}

export interface NewsGroup {
  readonly label: string;
  readonly title: string;
  readonly items: readonly NewsItem[];
}

export const newsGroups: readonly NewsGroup[] = [
  {
    label: 'News flash',
    title: 'News flash',
    items: [
      {
        title: 'The List of Institution',
        excerpt:
          'The list of institutions which are accepting students without Higher Secondary mark-sheet or final semester Bachelor’s mark-sheet.',
        url: `${base}/the-list-of-institution/`,
        date: 'June 24, 2021',
      },
      {
        title: 'Our UK visa customer in India',
        excerpt: 'Priority / Super Priority Visa service will be available at some UK visa service centres for all visa categories except visitors.',
        url: `${base}/our-uk-visa-customer-in-india/`,
        date: 'June 24, 2021',
      },
    ],
  },
  {
    label: 'Events',
    title: 'Events',
    items: [
      {
        title: 'Webinar on Achieving excellence beyond the classroom',
        excerpt: 'Shalini Menon, an esteemed International Education consultant, …',
        url: `${base}/webinar-on-achieving-excellence-beyond-the-classroom/`,
        date: 'September 16, 2023',
      },
      {
        title: 'Career Clarity “Webinar” at The Heartfulness Learning Centre',
        excerpt: 'Are you curious about the recent webinar that …',
        url: `${base}/career-clarity-webinar-at-the-heartfulness-learning-centre/`,
        date: 'February 17, 2023',
      },
      {
        title: 'S’cool’ Fest “Zest Fest 2022” (Mumbai)',
        excerpt: 'The Dr Yashwantrao Dode World School’s …',
        url: `${base}/scool-fest-zest-fest-2022-mumbai/`,
        date: 'February 16, 2023',
      },
      {
        title: 'Webinar for Pragyan Foundation (Promoter of Pragyan International University)',
        excerpt: 'National Webinar – 29th April – …',
        url: `${base}/webinar-for-pragyan-foundation-promoter-of-pragyan-international-university/`,
        date: 'May 11, 2022',
      },
    ],
  },
  {
    label: 'Trending',
    title: 'Trending courses / university / institute / country',
    items: [
      {
        title: 'Nursing Program in Australia',
        excerpt:
          'Australia Traineeship Program Visa (407): the Training Subclass 407 Visa is a workplace-based occupational training activities program, initiated to improve the skills of the applicant in their job.',
        url: `${base}/nursing-program-in-australia/`,
      },
      {
        title: 'Top Diplomas in Culinary Arts in Canada 2021',
        excerpt: 'Conestoga College – Waterloo: College Diploma – Baking and Pastry Arts Management (Optional Co-op) and more.',
        url: `${base}/top-diplomas-in-culinary-arts-in-canada-2021/`,
      },
    ],
  },
  {
    label: 'Current event',
    title: 'Seminars & current events',
    items: [
      {
        title: 'Career Clarity “Webinar” at The Heartfulness Learning Centre',
        excerpt: 'Are you curious about the recent webinar that …',
        url: `${base}/career-clarity-webinar-at-the-heartfulness-learning-centre/`,
      },
      {
        title: 'Seminar for Bunts Sangha Youth Wing, Mumbai | Presented by UEMS Ventures',
        excerpt: 'UEMS Ventures presented a seminar on …',
        url: `${base}/seminar-for-bunts-sangha-youth-wing-mumbai-presented-by-uems-ventures/`,
      },
      {
        title: 'Seminar at St Johns College of Engineering',
        excerpt: 'Unique Education And Migration Services – Mumbai …',
        url: `${base}/seminar-at-st-johns-college-of-engineering/`,
      },
      {
        title: 'Seminar at Wisdom High School',
        excerpt: 'The core idea behind creating this platform is to …',
        url: `${base}/seminar-at-wisdom-high-school/`,
      },
      {
        title: 'Seminar at Garodia International',
        excerpt: 'Unique Education and Migration Service, Mumbai …',
        url: `${base}/seminar-at-garodia-international/`,
      },
      {
        title: 'Seminar at Aeon Classes',
        excerpt: 'Aeon Tutorials is conducting a free information …',
        url: `${base}/seminar-at-aeon-classes/`,
      },
    ],
  },
];
