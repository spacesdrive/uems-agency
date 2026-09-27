export interface NavLinkItem {
  readonly label: string;
  readonly to: string;
}

export interface NavItem extends NavLinkItem {
  readonly children?: readonly NavLinkItem[];
}

export const site = {
  name: 'UEMS Ventures',
  fullName: 'Unique Education and Migration Services',
  url: 'https://uemsventures.com',
  summary:
    'UEMS Ventures is your one stop solution for all services related to Career Guidance, Study Abroad and Migration.',
  phones: [
    { display: '+91 9833808612', href: 'tel:+919833808612' },
    { display: '+91 9321646670', href: 'tel:+919321646670' },
  ],
  email: 'info@uemsventures.com',
  address: ['416 Marathon Max', 'LBS Marg', 'Mulund West', 'Mumbai – 400080'],
  mapUrl: 'https://www.google.com/maps/search/UEMS+Ventures+Mulund+West+Mumbai/',
  appointmentUrl: 'https://www.picktime.com/43b6a5f6-94a8-4835-a4e3-288436e74f02',
  whatsappUrl: 'https://wa.me/919833808612',
  evalUrl: 'https://www.evaltest.com/',
  reviews: {
    rating: '4.9',
    count: 63,
    listUrl: 'https://www.google.com/maps/search/UEMS+Ventures+Mulund+West+Mumbai/',
    // The original site's "write a review" link used a placeholder place ID; this opens the real listing search.
    writeUrl: 'https://www.google.com/search?q=UEMS+Ventures+Mulund+West+Mumbai+reviews',
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/UniqueEducationandMigrationMumbai/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com/uemsventures', icon: 'instagram' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/unique-education-and-migration-services/',
      icon: 'linkedin',
    },
    { label: 'Twitter', href: 'https://twitter.com/uniqueeducatio2', icon: 'twitter' },
  ],
  founderLinkedIn: 'https://in.linkedin.com/in/shalini-menon',
  credit: { label: 'AK Dezigns', href: 'https://akdezigns.com/' },
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'];

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  {
    label: 'Study Abroad',
    to: '/study-abroad-consultants',
    children: [
      { label: 'Study Abroad overview', to: '/study-abroad-consultants' },
      { label: 'Australia', to: '/study-in-australia' },
      { label: 'Canada', to: '/studyincanada' },
      { label: 'UK / Ireland', to: '/study-in-uk-ireland' },
      { label: 'USA', to: '/study-in-usa' },
      { label: 'Asia', to: '/study-in-asia' },
      { label: 'New Zealand', to: '/study-in-new-zealand' },
      { label: 'UAE', to: '/study-in-uae' },
      { label: 'Europe', to: '/study-in-europe' },
      { label: 'Student Needs', to: '/student-needs' },
    ],
  },
  {
    label: 'Migration',
    to: '/migration',
    children: [
      { label: 'Migration overview', to: '/migration' },
      { label: 'Australia', to: '/australia-migration' },
    ],
  },
  {
    label: 'Career Guidance',
    to: '/career-guidance',
    children: [
      { label: 'Career Guidance overview', to: '/career-guidance' },
      { label: 'Programs', to: '/programs' },
      { label: 'Career Clarity Tests', to: '/career-clarity-tests' },
      { label: 'Career Talk', to: '/career-talk' },
      { label: 'Premium Career Assessment Test', to: '/career-guidance/career-assessment-test' },
      { label: 'Free Career Personality Test', to: '/best-free-career-personality-test' },
      { label: 'Test Career Counselling', to: '/test-career-counselling' },
    ],
  },
  { label: 'Test Prep', to: '/test-preparation-for-international-students' },
  {
    label: 'Blogs',
    to: '/blogs',
    children: [
      { label: 'Blogs', to: '/blogs' },
      { label: 'News & Events', to: '/news-and-events' },
    ],
  },
  { label: 'Contact Us', to: '/contact-us' },
];

export const footerNav = {
  menu: [
    { label: 'About us', to: '/about-us' },
    { label: 'Terms & conditions', to: '/terms-conditions' },
    { label: 'Privacy policy', to: '/privacy-policy' },
    { label: 'Disclaimer', to: '/disclaimer' },
    { label: 'Franchise & Channel Partners', to: '/franchise-channel-partners' },
    { label: 'Contact Us', to: '/contact-us' },
  ],
  services: [
    { label: 'Career Guidance', to: '/career-guidance' },
    { label: 'Study Abroad', to: '/study-abroad-consultants' },
    { label: 'IELTS', to: '/ielts' },
    { label: 'Migration', to: '/migration' },
    { label: 'Student Needs', to: '/student-needs' },
  ],
} as const satisfies Record<string, readonly NavLinkItem[]>;

/** Options offered by every UEMS enquiry form. */
export const enquiryOptions = {
  heardFrom: ['Google', 'Social Media', 'Newspaper', 'Friends/Relatives', 'Others'],
  queryAbout: ['Study Abroad', 'Migration', 'Career Counseling', 'External Exam (Coaching)'],
} as const;

/** Extra choice shown by specialised enquiry forms. */
export const enquiryPresets = {
  migration: { legend: 'I want to migrate to', options: ['Australia', 'Canada', 'Both'], query: 'Migration' },
  coaching: {
    legend: 'Interested in',
    options: ['GRE', 'GMAT', 'SAT', 'ACT', 'IELTS', 'PTE', 'TOEFL'],
    query: 'External Exam (Coaching)',
  },
} as const;

export type EnquiryPreset = keyof typeof enquiryPresets;
