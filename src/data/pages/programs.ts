import { site } from '../site';
import type { ContentPageData } from '../types';

const book = { label: 'Book now', to: '/contact-us' } as const;

const page: ContentPageData = {
  path: '/programs',
  meta: {
    title: 'Programs – Career Discovery, Subject Selection & University Planning',
    description:
      'UEMS Ventures academic pathway programs for Grades 8–12, college graduates and premium mentorship: career discovery, subject selection, university planning and profile building.',
  },
  hero: {
    eyebrow: 'Admissions open',
    title: 'Your future starts here',
    lead: [
      'Discover the right career. Build a powerful profile. Get into your dream university. At UEMS Ventures, we don’t just help students choose courses — we help them discover who they can become.',
    ],
    actions: [
      { label: 'Explore programs', to: '#pathways' },
      { label: 'Book a program', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'prog-counsel', alt: 'Student in a one-on-one career counselling session' },
    facts: [
      { value: '94%', label: 'Career match rate' },
      { value: '200+', label: 'Partner universities' },
      { value: '30+', label: 'Countries of admissions expertise' },
    ],
  },
  sections: [
    {
      label: 'About UEMS Ventures',
      title: 'Guiding students at every stage',
      intro:
        'From career clarity and subject selection to profile building and global university admissions, we guide students at every stage of their academic journey with personalised mentoring, expert insights, and future-focused strategies.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Personalised one-on-one mentoring',
              text: 'Every student gets dedicated attention tailored to their unique strengths, interests, and ambitions.',
            },
            {
              title: 'Scientific career assessments',
              text: 'Data-driven insights through validated psychometric tools — not guesswork or generic advice.',
            },
            {
              title: 'Global university expertise',
              text: 'Deep knowledge of admissions processes across 30+ countries and 200+ partner institutions.',
            },
          ],
        },
      ],
    },
    {
      id: 'pathways',
      label: 'Your journey',
      title: 'Academic pathways',
      intro: 'Find your strengths. Unlock your potential. Choose the stage that matches your current academic journey.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              image: { name: 'prog-discovery', alt: 'Young students exploring career options together' },
              eyebrow: 'Grades 8–9',
              title: 'Career Discovery Program',
              text: 'Discover interests early and build the right foundation through interactive counselling and aptitude mapping. The perfect starting point for young minds exploring their future.',
              bullets: ['Career Clarity Assessments', 'Learning Style Analysis', 'Future Career Exploration', 'Parent Counselling Sessions'],
              action: book,
            },
            {
              image: { name: 'prog-subject', alt: 'Two students choosing an academic stream' },
              eyebrow: 'Grade 10',
              title: 'Subject Selection Program',
              text: 'Choose the right stream with confidence. Science, Commerce, or Humanities — we’ll help you decide based on your unique aptitude and interests.',
              bullets: ['Stream Selection Counselling', 'Career Pathway Mapping', 'Personalised Assessment Reports', 'One-on-One Expert Guidance'],
              action: book,
            },
            {
              image: { name: 'prog-university', alt: 'Graduates in caps and gowns planning university' },
              eyebrow: 'Grades 11–12',
              title: 'University & Career Planning',
              text: 'Build a profile that top universities notice. Strategically prepare for admissions in India and abroad with expert guidance every step of the way.',
              bullets: ['University Shortlisting', 'Passion Project Guidance', 'Scholarship Guidance', 'Leadership & Profile Building'],
              action: book,
            },
            {
              image: { name: 'prog-graduate', alt: 'Graduate professionals ready for their next move' },
              eyebrow: 'College & graduates',
              title: 'From Degree to Dream Career',
              text: 'Career direction, higher studies options, and international opportunities for graduates ready to make their next move.',
              bullets: ['Career Transition Planning', 'Resume & LinkedIn Optimisation', 'Global Education Pathways', 'Industry Networking'],
              action: book,
            },
            {
              image: { name: 'prog-premium', alt: 'Mentor guiding a student through a premium mentorship program' },
              eyebrow: 'Premium',
              title: 'Build a World-Class Profile',
              text: 'A premium mentorship program designed to help students stand out in competitive admissions and build extraordinary profiles.',
              bullets: ['Leadership Development', 'Research Opportunities', 'Public Speaking & Comms', 'Certifications & Awards'],
              action: book,
            },
          ],
        },
        {
          type: 'actions',
          items: [
            { label: 'Explore Eval', to: site.evalUrl, variant: 'outline' },
          ],
        },
      ],
    },
    {
      label: 'Why choose us',
      title: 'Why students & parents trust UEMS Ventures',
      intro: 'We believe every student deserves clarity, confidence, and opportunities that match their true potential.',
      layout: 'aside',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Personalised attention, not generic advice',
              text: 'Every student receives one-on-one mentoring tailored to their unique strengths and aspirations.',
            },
            {
              title: 'Science-backed career assessments',
              text: 'Psychometric and aptitude tools give you clarity grounded in data, not assumptions.',
            },
            { title: 'Global university network', text: 'Admissions expertise across 30+ countries and 200+ institutions worldwide.' },
            {
              title: 'End-to-end support',
              text: 'From school career clarity all the way to university acceptance — we’re with you every step.',
            },
            {
              title: 'Student-first philosophy',
              text: 'Your aspirations lead — we simply illuminate the path and open the right doors.',
            },
          ],
        },
      ],
    },
    {
      label: 'Student stories',
      title: 'Futures we’ve helped build',
      intro: 'Real students. Real transformations. Real results.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'MBBS · Edinburgh',
              title: 'Aanya Sharma',
              text: '“UEMS helped me realise that medicine was genuinely my calling — not just family expectation. The aptitude tests and counselling sessions gave me absolute clarity.”',
            },
            {
              eyebrow: 'Finance · Bath',
              title: 'Rohan Mehta',
              text: '“I had no idea what stream to pick after Grade 10. After two sessions at UEMS I had a full roadmap — Commerce with Economics, leading to Finance at a top UK university.”',
            },
            {
              eyebrow: 'Psychology · KCL',
              title: 'Priya Nair',
              text: '“The profile-building program at UEMS was transformative. My essay, extracurriculars, and interview prep were all guided with precision. I got into my dream program.”',
            },
            {
              eyebrow: 'CS · NUS',
              title: 'Kabir Reddy',
              text: '“I was torn between engineering and design. UEMS showed me how I could combine both — and now I’m studying CS with a specialisation in HCI at my dream school.”',
            },
            {
              eyebrow: 'Architecture · UCL',
              title: 'Sara Ahmed',
              text: '“My portfolio and application were guided so carefully. The mentorship at UEMS turned my scattered ideas into a compelling narrative that admissions committees loved.”',
            },
          ],
        },
      ],
    },
    {
      label: 'Begin your journey',
      title: 'More than counselling. We help students build futures.',
      tone: 'dark',
      intro: 'Every student deserves clarity, confidence, and opportunities that match their true potential. Ready to begin your journey?',
      blocks: [
        {
          type: 'actions',
          items: [
            { label: 'Book your program', to: '/contact-us', variant: 'accent' },
            { label: 'Call us now', to: site.phones[0].href, variant: 'light' },
          ],
        },
      ],
    },
  ],
};

export default page;
