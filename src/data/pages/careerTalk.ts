import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/career-talk',
  meta: {
    title: 'Career Talks & Guidance Programs for Schools and Colleges',
    description:
      'UEMS Ventures career seminars and talks, one-on-one career counselling and Career Counselling Cell setup for schools, colleges, universities and organisations.',
  },
  hero: {
    eyebrow: 'Career guidance programs',
    title: 'Inspiring students. Creating career awareness.',
    lead: [
      'At UEMS Ventures, our Career Talks and Guidance Programs are designed to help students make informed academic and career decisions through expert-led sessions, interactive workshops, and real-world industry insights.',
      'We collaborate with schools, colleges, educational institutions, and organizations to conduct impactful career awareness sessions that empower students with clarity, confidence, and direction.',
    ],
    actions: [
      { label: 'Explore programs', to: '#programs' },
      { label: 'Get in touch', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'cg-talks', alt: 'Mentor leading a career talk with a group of students' },
  },
  sections: [
    {
      id: 'programs',
      label: 'Programs',
      title: 'Three ways we work with institutions',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              title: 'Career Seminars & Talks',
              text: 'Expert-led seminars introducing students to emerging careers, future industries, and smart career planning strategies.',
              tags: ['Future Careers', 'Study Abroad', 'AI & Tech', 'Scholarships'],
              facts: [
                { label: 'Group size', value: '+50 students/session' },
                { label: 'Duration', value: '90 min' },
              ],
            },
            {
              title: '1-on-1 Career Counselling',
              text: 'Personalized support based on a student’s interests, strengths, goals, and aspirations. Every journey is unique.',
              tags: ['Psychometric', 'Career Roadmap', 'Study Abroad'],
              facts: [
                { label: 'Format', value: 'Online & Offline' },
                { label: 'Duration', value: '60 min' },
              ],
            },
            {
              title: 'Counselling Cell Setup',
              text: 'Establish a dedicated Career Counselling Cell in your institution with ongoing support and future planning assistance.',
              tags: ['Framework', 'Calendar', 'Reports'],
              facts: [
                { label: 'For', value: 'Schools & Colleges' },
                { label: 'Scope', value: 'Full setup' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Career seminars & talks',
      title: 'Helping students explore careers beyond traditional choices',
      layout: 'aside',
      intro:
        'Our expert-led seminars introduce students to emerging careers, future industries, global education opportunities, and smart career planning strategies.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '+50', label: 'Students per session' },
            { value: '90 min', label: 'Duration' },
            { value: '9+', label: 'Topics' },
            { value: 'Q&A', label: 'Included' },
          ],
        },
      ],
    },
    {
      label: 'One-on-one counselling',
      title: 'Personalized guidance for every student',
      layout: 'aside',
      intro:
        'Every student is different, and so is every career journey. Our one-on-one counselling sessions provide personalized support based on a student’s interests, strengths, goals, and aspirations.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'Designed for',
              title: 'Students who need focused guidance and customized career planning support.',
            },
            {
              eyebrow: 'Format',
              title: 'Face-to-face or online sessions',
              facts: [
                { label: 'Per session', value: '60 min' },
                { label: 'Deliverables', value: '7' },
                { label: 'Mode', value: 'Online/Offline' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Counselling cell setup',
      title: 'Build a structured career guidance ecosystem in your institution',
      layout: 'aside',
      intro:
        'UEMS Ventures helps schools and colleges establish dedicated Career Counselling Cells that provide ongoing support, guidance, and future planning assistance to students.',
      blocks: [{ type: 'tags', title: 'Who can set up', items: ['Schools', 'Colleges', 'Universities', 'Organizations'] }],
    },
    {
      label: 'Partner with us',
      title: 'Let’s build brighter futures together',
      tone: 'dark',
      intro:
        'Whether you are a school, college, coaching institute, or educational organization, we can help your students gain career clarity, confidence, and direction through impactful guidance programs.',
      blocks: [
        { type: 'tags', items: ['Free Consultation', 'Custom Programs', 'Expert Mentors'] },
        {
          type: 'actions',
          items: [
            { label: site.email, to: `mailto:${site.email}`, variant: 'accent' },
            { label: 'Get in touch', to: '/contact-us', variant: 'light' },
          ],
        },
      ],
    },
  ],
};

export default page;
