import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/career-clarity-tests',
  meta: {
    title: 'Career Clarity Tests – Discover the Career That Truly Fits You',
    description:
      'EvalTest career assessment with UEMS Ventures: understand your natural strengths, interests and personality, get subject and stream recommendations, in under 30 minutes.',
  },
  hero: {
    eyebrow: 'Powered by EvalTest',
    title: 'Discover the career that truly fits you',
    lead: [
      'At **UEMS Ventures**, we believe career decisions should be based on clarity — not confusion, pressure, or guesswork. Let us introduce you to EvalTest.',
      'Whether you’re confused about subject selection, choosing a degree, or planning your future career, **EvalTest** helps you make smarter decisions with confidence.',
    ],
    actions: [
      { label: 'Visit EvalTest.com', to: site.evalUrl },
      { label: 'Learn more', to: '#about-evaltest', variant: 'outline' },
    ],
    image: { name: 'cg-tests', alt: 'Student taking a career assessment on a tablet' },
    facts: [
      { value: '2,500+', label: 'Students already found their path' },
      { value: '<30 min', label: 'No prep needed' },
      { value: 'Private', label: 'Scientific, private & secure' },
    ],
  },
  sections: [
    {
      label: 'EvalTest assessment',
      title: 'A career discovery tool',
      blocks: [
        {
          type: 'checklist',
          columns: 3,
          items: [
            'Natural strengths & abilities',
            'Career interests & personality',
            'Suitable career pathways',
            'Subject & stream recommendations',
            'Future education opportunities',
          ],
        },
      ],
    },
    {
      label: 'Quick curriculum quiz',
      title: 'Confused about subjects or stream?',
      intro:
        'Take a curriculum-based quiz to explore the right subjects, careers, and future opportunities. Make smarter subject choices with confidence.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: '6 subjects',
              title: 'IB Curriculum',
              text: 'Choose IB subjects like you’re designing your future. Discover whether Science/Tech, Commerce, Humanities, or Creative paths suit you best.',
              tags: ['TOK', 'EE', 'CAS', '3 HL + 3 SL'],
              action: { label: 'Start IB quiz', to: site.evalUrl },
            },
            {
              eyebrow: 'Streams',
              title: 'ICSE Curriculum',
              text: 'Explore the right stream and subject combination for your ICSE journey. Find out if Science, Commerce, or Humanities is your calling.',
              tags: ['Science', 'Commerce', 'Humanities'],
              action: { label: 'Start ICSE quiz', to: site.evalUrl },
            },
          ],
        },
      ],
    },
    {
      id: 'about-evaltest',
      label: 'About',
      title: 'What is EvalTest?',
      layout: 'aside',
      intro:
        'EvalTest is an advanced career assessment and psychometric evaluation platform that helps students identify their true potential and ideal career pathways.',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'The assessment provides **personalized insights** — identifying natural strengths, career interests, personality traits, suitable pathways, subject recommendations, and ideal learning environments.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            { title: 'Natural strengths', text: 'Innate abilities & aptitudes' },
            { title: 'Interests & personality', text: 'What truly drives you' },
            { title: 'Career pathways', text: 'Suitable directions' },
            { title: 'Subject guidance', text: 'Stream recommendations' },
            { title: 'Education options', text: 'Future study paths' },
            { title: 'Learning style', text: 'Ideal environments' },
          ],
        },
        { type: 'actions', items: [{ label: 'Try EvalTest', to: site.evalUrl }] },
      ],
    },
    {
      label: 'Why EvalTest',
      title: 'Why students love EvalTest',
      intro:
        'Simple. Fun. Insightful. Students enjoy the process because it feels less like an exam and more like discovering themselves. The assessment is easy to take and requires no special preparation.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '<30', label: 'Minutes' },
            { value: '0', label: 'Prep needed' },
            { value: '100%', label: 'Insightful' },
          ],
        },
        {
          type: 'checklist',
          columns: 2,
          items: [
            'No prior preparation needed',
            'No technical knowledge required',
            'Simple and interactive questions',
            'Less than 30 minutes to complete',
            'Instant career insights & recommendations',
            'It’s not an exam — it’s self-discovery',
          ],
        },
      ],
    },
    {
      label: 'Who it’s for',
      title: 'Who should take EvalTest?',
      blocks: [
        {
          type: 'cards',
          columns: 4,
          items: [
            { eyebrow: 'Class 8–10', title: 'Exploring careers & preparing for stream selection' },
            { eyebrow: 'Grades 11–12', title: 'Confused about courses, careers, or university' },
            { eyebrow: 'College & grads', title: 'Seeking clarity on career direction' },
            { eyebrow: 'Parents', title: 'Want scientific guidance for their children' },
          ],
        },
      ],
    },
    {
      label: 'Mentoring',
      title: 'Personalised one-on-one mentoring',
      blocks: [
        {
          type: 'split',
          image: { name: 'cct-mentoring', alt: 'Mentor with a group of smiling students' },
          title: 'Live mentoring · signature program',
          paragraphs: [
            'Guiding students at every stage — from subject selection to career planning. Our expert mentors provide personalized counselling tailored to each student’s unique strengths.',
          ],
          actions: [{ label: 'Book a session', to: site.evalUrl }],
        },
      ],
    },
    {
      label: 'Book today',
      title: 'Book your EvalTest assessment today',
      tone: 'dark',
      intro:
        'Take the first step toward a future built around your strengths, passions, and potential. Start your career discovery journey with UEMS Ventures.',
      blocks: [
        {
          type: 'actions',
          items: [
            { label: 'Visit EvalTest.com', to: site.evalUrl, variant: 'accent' },
            { label: 'Premium career assessment', to: '/career-guidance/career-assessment-test', variant: 'light' },
          ],
        },
      ],
    },
  ],
};

export default page;
