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
  offices: [
    {
      label: 'India office',
      lines: ['416 Marathon Max', 'LBS Marg', 'Mulund West', 'Mumbai – 400080'],
      mapUrl: 'https://www.google.com/maps/search/UEMS+Ventures+Mulund+West+Mumbai/',
    },
    {
      label: 'Australia office',
      lines: ['526/368 Sussex Street', 'Sydney NSW 2000', 'Australia'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=368+Sussex+Street+Sydney+NSW+2000',
    },
  ],
  /** Appointment requests are sent to UEMS by email from this page. */
  appointmentPath: '/book-appointment',
  whatsappUrl: 'https://wa.me/919833808612',
  evalUrl: 'https://www.evaltest.com/',
  /** Event and seminar videos are hosted on YouTube rather than on this site. */
  youtubeUrl: 'https://www.youtube.com/@uemsventures',
  reviews: {
    rating: '4.9',
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
      { label: 'USA', to: '/study-in-usa' },
      { label: 'UK', to: '/study-in-uk-ireland' },
      { label: 'Australia', to: '/study-in-australia' },
      { label: 'Canada', to: '/studyincanada' },
      { label: 'Singapore & Asia', to: '/study-in-asia' },
      { label: 'Dubai', to: '/study-in-uae' },
      { label: 'Ireland, Germany & Europe', to: '/study-in-europe' },
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
      { label: 'Global Profile Accelerator', to: '/#global-profile-accelerator' },
      { label: 'Programs', to: '/programs' },
      { label: 'Career Clarity Tests', to: '/career-clarity-tests' },
      { label: 'Career Talk', to: '/career-talk' },
      { label: 'Career Counselling', to: '/test-career-counselling' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'All services', to: '/services' },
      { label: 'Financial assistance', to: '/services#financial-assistance' },
      { label: 'Accommodation', to: '/services#accommodation' },
      { label: 'Visa lodgement', to: '/services#visa-lodgement' },
      { label: 'Pre-departure counselling', to: '/services#pre-departure' },
      { label: 'Health insurance', to: '/services#health-insurance' },
      { label: 'External exam preparation', to: '/test-preparation-for-international-students' },
    ],
  },
  {
    label: 'Blogs',
    to: '/blogs',
    children: [
      { label: 'Blogs', to: '/blogs' },
      { label: 'Seminars & Events', to: '/news-and-events' },
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
    { label: 'Study Abroad', to: '/study-abroad-consultants' },
    { label: 'Career Guidance', to: '/career-guidance' },
    { label: 'Migration', to: '/migration' },
    { label: 'Student services', to: '/services' },
    { label: 'External exam preparation', to: '/test-preparation-for-international-students' },
    { label: 'IELTS', to: '/ielts' },
  ],
} as const satisfies Record<string, readonly NavLinkItem[]>;

/** Options offered by every UEMS enquiry form. */
export const enquiryOptions = {
  heardFrom: ['Google', 'Social Media', 'Newspaper', 'Friends/Relatives', 'Others'],
  queryAbout: ['Study Abroad', 'Migration', 'Career Counselling', 'Global Profile Accelerator', 'External Exam (Coaching)'],
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

/** Choices on the Book appointment form. UEMS confirms the final slot by email or phone. */
export const appointmentOptions = {
  time: ['Morning', 'Afternoon', 'Evening'],
  mode: ['In person at our Mumbai office', 'Online video call', 'Phone call'],
  topic: enquiryOptions.queryAbout,
} as const;

/** Options for the free counselling / Global Profile Accelerator registration. */
export const registrationOptions = {
  role: ['Student', 'Parent'],
  interest: ['Career counselling', 'Study abroad', 'Global Profile Accelerator'],
  curriculum: ['CBSE', 'ICSE / ISC', 'IB', 'Cambridge (IGCSE / A Level)', 'State board', 'American (AP / High School Diploma)', 'Other'],
  grade: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Undergraduate', 'Graduate / working professional'],
} as const;
