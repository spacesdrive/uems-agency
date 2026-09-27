import type { ImageName } from './images';
import { site } from './site';
import type { Fact, ImageRef, Stat } from './types';

export const homeMeta = {
  title: 'Expert Study Abroad & Migration Consultancy | UEMS Ventures',
  description:
    'Trust UEMS Ventures for expert study abroad, IELTS and migration consultancy. Study in Australia, USA, UK, Canada & NZ with our guidance. Call +91 9833808612.',
};

export const hero = {
  eyebrow: 'Study abroad & migration',
  title: 'We help you chart your destiny abroad.',
  lead: 'UEMS Ventures is your expert partner for studying abroad and seamless migration. From university selection to visa success — we guide every step of your journey to a brighter future.',
  facts: [
    { value: '5K+', label: 'Students launched their future through us' },
    { value: '98%', label: 'Success' },
    { value: '24hr', label: 'Free consult response' },
  ] satisfies Fact[],
  destinations: ['US', 'UK', 'CA', 'AU', 'DE'],
};

export const whyUems = {
  label: 'Study abroad & immigration experts',
  title: 'Why choose UEMS? Your trusted partner for study abroad and immigration services.',
  text: 'With over 15 years of expertise, UEMS Ventures is your trusted partner for study abroad and immigration services. We provide comprehensive guidance to chart your destiny abroad.',
  facts: [
    { value: '15+ countries', label: 'Global network' },
    { value: '5,200+', label: 'Students trust us' },
  ] satisfies Fact[],
  images: {
    small: { name: 'founder', alt: 'UEMS founder Shalini Menon reviewing a student file in the office' },
    large: { name: 'home-students', alt: 'Students from around the world celebrating together' },
  } satisfies Record<string, ImageRef>,
};

export interface Service {
  readonly title: string;
  readonly text: string;
  readonly cta: string;
  readonly to: string;
  readonly image: ImageRef;
}

export const services: readonly Service[] = [
  {
    title: 'EVAL – Path to Career Clarity',
    text: 'Explore a logical way to discover your ideal career path. Our proprietary assessment analyzes your aptitude, interests, and personality to recommend the best courses and countries for your future.',
    cta: 'Find my clarity',
    to: site.evalUrl,
    image: { name: 'svc-eval', alt: 'Student presenting a career assessment result on a tablet' },
  },
  {
    title: 'Study Abroad',
    text: 'Explore the world of global educational opportunities. We guide you through university selection, applications, scholarships, and the entire admission process for top destinations worldwide.',
    cta: 'More info',
    to: '/study-abroad-consultants',
    image: { name: 'svc-study', alt: 'Student with luggage at an international airport' },
  },
  {
    title: 'Migration',
    text: 'Chart your path to settling abroad with confidence. From skilled worker programs to family sponsorship, our licensed consultants navigate the immigration process with you every step.',
    cta: 'More info',
    to: '/migration',
    image: { name: 'svc-migration', alt: 'Family walking through an international airport terminal' },
  },
];

export const approach = {
  label: 'Study abroad & migration experts',
  title: 'We work together to help you achieve your dream',
};

export const metrics = {
  label: 'Live metrics',
  title: 'Built on trust',
  items: [
    { value: '1000+', label: 'Success cases completed', note: 'Verified cases · +12% quarterly growth' },
    { value: '280', label: 'Partner institutions worldwide', note: 'Across 40 countries' },
    { value: '15 yrs', label: 'Industry experience', note: 'Est. 2009 · proven track record' },
    { value: '98%', label: 'Client success rate', note: 'Industry leading' },
  ] satisfies Stat[],
};

export interface Destination {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly description: string;
  readonly benefits: readonly string[];
  readonly courses: string;
  readonly tuition: string;
  readonly to: string;
  readonly cta: string;
  readonly image?: ImageName;
}

export const destinations = {
  label: 'Study destinations',
  title: 'Explore your global education opportunities',
  intro:
    'Choose from the world’s most sought-after study destinations with expert guidance, visa assistance, and university admissions support.',
  footnote: 'More destinations available through consultation',
  items: [
    {
      id: 'canada',
      name: 'Canada',
      code: 'CA',
      description: 'Affordable education with strong immigration pathways and world-class research opportunities.',
      benefits: ['Express Entry Opportunities', 'Top-Ranked Universities', 'Post-Study Work Options (Up to 3 Yrs)'],
      courses: 'Business, IT, Engineering, Healthcare',
      tuition: 'CAD 15k – 35k / yr',
      to: '/studyincanada',
      cta: 'Study in Canada',
      image: 'dest-canada',
    },
    {
      id: 'usa',
      name: 'USA',
      code: 'US',
      description: 'Home to the Ivy League and Silicon Valley — launch your career at the highest level.',
      benefits: ['OPT & STEM Visa Extensions', 'Cutting-Edge Research Facilities', 'Global Networking Hub'],
      courses: 'Computer Science, Business, Medicine',
      tuition: 'USD 20k – 50k / yr',
      to: '/study-in-usa',
      cta: 'Study in USA',
      image: 'dest-usa',
    },
    {
      id: 'uk',
      name: 'UK & Ireland',
      code: 'GB',
      description: 'Experience rich academic heritage with accelerated 1-year master’s programs.',
      benefits: ['Graduate Route Visa (2-3 Years)', 'World-Renowned Degrees', 'Access to European Job Market'],
      courses: 'Finance, Law, Data Science, Design',
      tuition: '£12k – 25k / yr',
      to: '/study-in-uk-ireland',
      cta: 'Study in UK & Ireland',
      image: 'dest-uk',
    },
    {
      id: 'ireland',
      name: 'Ireland',
      code: 'IE',
      description: 'The tech hub of Europe, offering a seamless path to residency.',
      benefits: ['2-Year Post-Study Work Visa', 'European Tech Hub (Google, Apple)', 'Pathway to Permanent Residency'],
      courses: 'Pharma, Tech, Business, Finance',
      tuition: '€10k – 25k / yr',
      to: '/study-in-uk-ireland',
      cta: 'Study in UK & Ireland',
    },
    {
      id: 'germany',
      name: 'Germany',
      code: 'DE',
      description: 'World-class engineering and tuition-free public universities.',
      benefits: ['Tuition-Free Public Universities', '18-Month Job Seeker Visa', 'Strong Engineering & Tech Sector'],
      courses: 'Engineering, Automotive, Medicine',
      tuition: 'Free – €500 / semester',
      to: '/contact-us',
      cta: 'Talk to an advisor',
      image: 'dest-germany',
    },
    {
      id: 'france',
      name: 'France',
      code: 'FR',
      description: 'Affordable, culturally rich education with strong EU connectivity.',
      benefits: ['APS Visa (1 Year Post-Study)', 'Affordable Tuition Fees', 'Hub for Luxury & Business'],
      courses: 'Luxury Brand Mgmt, Art, Business',
      tuition: '€3k – 15k / yr',
      to: '/contact-us',
      cta: 'Talk to an advisor',
      image: 'dest-france',
    },
    {
      id: 'italy',
      name: 'Italy',
      code: 'IT',
      description: 'Rich history, affordable living, and world-renowned design schools.',
      benefits: ['Affordable Cost of Living', 'Post-Study Work Options', 'Excellence in Design & Architecture'],
      courses: 'Design, Architecture, Arts, Culinary',
      tuition: '€1k – 10k / yr',
      to: '/contact-us',
      cta: 'Talk to an advisor',
      image: 'dest-italy',
    },
    {
      id: 'uae',
      name: 'Dubai (UAE)',
      code: 'AE',
      description: 'A booming, tax-free metropolis with golden visa opportunities.',
      benefits: ['Golden Visa Opportunities', 'Tax-Free Income Potential', 'Booming Economy & Internships'],
      courses: 'Business, Oil & Gas, Aviation',
      tuition: 'AED 30k – 80k / yr',
      to: '/study-in-uae',
      cta: 'Study in UAE',
      image: 'dest-uae',
    },
    {
      id: 'australia',
      name: 'Australia',
      code: 'AU',
      description: 'High quality of life with generous post-study work rights up to 6 years.',
      benefits: ['Up to 6 Years Post-Study Visa', 'Regional PR Pathways', 'Top QS Ranked Institutions'],
      courses: 'Nursing, Engineering, Accounting, IT',
      tuition: 'AUD 20k – 45k / yr',
      to: '/study-in-australia',
      cta: 'Study in Australia',
      image: 'city-australia',
    },
    {
      id: 'newzealand',
      name: 'New Zealand',
      code: 'NZ',
      description: 'Unmatched work-life balance with straightforward PR pathways.',
      benefits: ['Post-Study Work Visa (1-3 Yrs)', 'Straightforward PR Process', 'Unmatched Work-Life Balance'],
      courses: 'Agriculture, IT, Nursing',
      tuition: 'NZD 22k – 35k / yr',
      to: '/study-in-new-zealand',
      cta: 'Study in New Zealand',
      image: 'dest-nz',
    },
  ] satisfies Destination[],
};

export const profileServices = {
  label: 'Other services',
  title: 'Strengthen your profile',
  intro: 'Expert support to clarify your path and hit your target scores.',
  items: [
    {
      title: 'IELTS & PTE',
      text: 'Expert-led training with proven strategies to hit your target band score and secure your admission.',
      cta: 'Start preparing',
      to: '/test-preparation-for-international-students',
      image: { name: 'svc-ielts-pte', alt: 'Open books on a library desk' },
    },
    {
      title: 'EVAL Career Clarity',
      text: 'Scientific aptitude assessment mapping your strengths to the ideal courses and global career paths.',
      cta: 'Find my clarity',
      to: '/career-clarity-tests',
      image: { name: 'svc-eval-card', alt: 'Group of smiling schoolchildren' },
    },
  ] satisfies Service[],
};

export const founder = {
  label: 'Founder’s message',
  name: 'Shalini Menon',
  role: 'Founder & CEO, UEMS Ventures',
  title: 'From the desk of the founder',
  paragraphs: [
    'I’m Shalini Menon, Founder of UEMS Ventures. With over two decades of experience in corporate consulting and business transformation, I envisioned a platform that bridges the gap between ambition and achievement.',
    'At UEMS Ventures, we are committed to empowering businesses and individuals through strategic consulting, professional training, and comprehensive development programs. Our mission is to unlock potential and drive meaningful growth for every client we serve.',
    'We believe that the right guidance at the right time can transform trajectories. That belief is the cornerstone of everything we do — from shaping leadership capabilities to building resilient organizations.',
  ],
  facts: [
    { value: '20+', label: 'Years exp.' },
    { value: '500+', label: 'Clients' },
  ] satisfies Fact[],
  image: { name: 'founder', alt: 'Shalini Menon, Founder & CEO of UEMS Ventures' } satisfies ImageRef,
};

export const team = {
  label: 'Our team',
  title: 'Our team, in person',
  photos: [
    { name: 'team-1', alt: 'UEMS counsellors reviewing an application together' },
    { name: 'team-2', alt: 'UEMS trainer teaching at a whiteboard' },
    { name: 'team-3', alt: 'UEMS team counselling students in the office' },
  ] satisfies ImageRef[],
};

export const affiliations: readonly { name: string; image: ImageName }[] = [
  { name: 'HDFC Credila', image: 'logo-hdfc-credila' },
  { name: 'British Council IELTS', image: 'logo-ielts' },
  { name: 'Medibank', image: 'logo-medibank' },
  { name: 'ahm OSHC', image: 'logo-ahm' },
  { name: 'Allianz Global Assistance', image: 'logo-allianz' },
  { name: 'CBHS International Health', image: 'logo-cbhs' },
  { name: 'Cohort Go', image: 'logo-cohort-go' },
  { name: 'Condat Solutions', image: 'logo-condat' },
];

export const socialCards = {
  facebook: {
    title: 'Unique Education & Migration Services Mumbai',
    href: 'https://www.facebook.com/UniqueEducationandMigrationMumbai/',
    cta: 'Open Facebook page',
  },
  linkedin: {
    title: 'UEMS Ventures',
    subtitle: 'Education & Migration Services',
    text: 'Helping students & professionals achieve their global education and migration goals. Australia · Canada · UK · USA · New Zealand',
    stats: [
      { value: '500+', label: 'Followers' },
      { value: '15+', label: 'Years' },
      { value: '5+', label: 'Countries' },
    ] satisfies Fact[],
    href: 'https://www.linkedin.com/company/unique-education-and-migration-services/',
    cta: 'Visit on LinkedIn',
  },
};
