import { enquirySection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-asia',
  meta: {
    title: 'Study in Asia – Singapore, Malaysia, Japan & Korea Universities Guide',
    description:
      'Explore education in Asia with UEMS Ventures: why choose Singapore, popular courses, other Asian destinations and end-to-end study abroad support.',
  },
  hero: {
    eyebrow: 'Study in Asia',
    title: 'Explore education in Asia offering quality, diversity, opportunity',
    lead: [
      'Asia’s education landscape is dynamic and evolving — from research-intensive programs in Singapore and Japan to affordable degree options in Malaysia, South Korea, and beyond.',
    ],
    actions: [
      { label: 'Book a free counselling session', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'city-asia', alt: 'Singapore’s Marina Bay skyline and ArtScience Museum' },
    facts: [
      { value: 'Research', label: 'High-impact universities with cutting-edge research' },
      { value: 'Value', label: 'Competitive tuition fees and scholarship opportunities' },
      { value: 'Culture', label: 'Rich cultural and professional experiences' },
    ],
  },
  sections: [
    {
      label: 'Singapore',
      title: 'Singapore – Asia’s education & innovation capital',
      intro:
        'Singapore is one of the top education destinations in Asia, known for its academic excellence, cutting-edge research, and strong global reputation.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Why choose Singapore?',
              bullets: [
                'Home to top-ranked universities and private institutions',
                'Industry-aligned programs with practical learning',
                'Strong global recognition of qualifications',
                'Internship and industry exposure opportunities',
                'Safe, modern, and multicultural lifestyle',
              ],
            },
            {
              title: 'Popular courses in Singapore',
              bullets: [
                'Business & Management',
                'Finance & Banking',
                'Information Technology & Data Analytics',
                'Engineering & Technology',
                'Hospitality & Tourism',
                'Healthcare & Allied Sciences',
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'More destinations',
      title: 'Other Asian destinations we support',
      intro: 'Along with Singapore, UEMS Ventures also guides students for education opportunities in:',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            { eyebrow: 'Malaysia', title: 'Affordable degrees with international recognition' },
            { eyebrow: 'South Korea', title: 'Technology, innovation, and research-driven programs' },
            { eyebrow: 'Japan', title: 'Advanced science, engineering, and cultural studies' },
          ],
        },
        { type: 'prose', paragraphs: ['Country options depend on student profile, eligibility, and intake availability.'] },
      ],
    },
    {
      label: 'Our support',
      title: 'How UEMS Ventures supports you',
      layout: 'aside',
      intro:
        'We offer end-to-end guidance, ensuring a smooth and transparent study-abroad journey. Our counselling approach is personalised, ethical, and outcome-focused.',
      blocks: [
        {
          type: 'checklist',
          items: [
            'Career clarity & country shortlisting',
            'Course and institution selection based on your profile',
            'SOP & documentation support',
            'Application submission and follow-ups',
            'Student visa guidance',
            'Pre-departure and settlement support',
          ],
        },
      ],
    },
    {
      label: 'Who can apply',
      title: 'Who can apply?',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            { title: 'Students completing 12th grade' },
            { title: 'Undergraduate students planning Master’s programs' },
            { title: 'Working professionals seeking career-oriented education abroad' },
          ],
        },
        {
          type: 'callout',
          title: 'Start your Asian education journey with confidence',
          text: 'Whether you’re aiming for Singapore’s world-class universities or exploring emerging opportunities across Asia, UEMS Ventures is here to guide you at every step. UEMS Ventures – guiding careers beyond borders.',
          actions: [{ label: 'Book a free counselling session', to: '/contact-us' }],
        },
      ],
    },
    enquirySection('Talk to the experts'),
  ],
};

export default page;
