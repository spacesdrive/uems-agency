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
