import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/career-guidance',
  meta: {
    title: 'Career Guidance – From Confusion to Clarity',
    description:
      'UEMS Ventures career guidance: academic programs from Class 8 to graduation, scientific career clarity tests with Eval, career talks, counselling and mentoring.',
  },
  hero: {
    eyebrow: 'Future starts here',
    title: 'Confusion to clarity',
    lead: [
      'Don’t leave your future to guesswork. Discover the right career path through a proven journey of discovery, assessment, and guidance.',
    ],
    actions: [
      { label: 'Start your journey', to: '/programs' },
      { label: 'How it works', to: '#roadmap', variant: 'outline' },
    ],
    image: { name: 'cg-hero', alt: 'Student standing thoughtfully, facing a choice of paths' },
    facts: [
      { value: '01 · Programs', label: 'Discovery' },
      { value: '02 · Tests', label: 'Assessment' },
      { value: '03 · Talks', label: 'Guidance' },
    ],
  },
  sections: [
    {
      id: 'roadmap',
      label: 'Your roadmap',
      title: 'Three steps to success',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              image: { name: 'cg-programs', alt: 'Student at a crossroads with signposts for Science, Commerce and Arts' },
              title: 'Programs',
              text: 'Build a strong foundation. We offer tailored academic mentoring from Class 8 through college graduation.',
              bullets: ['Career Discovery', 'Subject Selection', 'University Planning'],
              action: { label: 'Explore programs', to: '/programs' },
            },
            {
              image: { name: 'cg-tests', alt: 'Student taking a psychometric assessment on a tablet' },
              title: 'Career Clarity Tests',
              text: 'Remove the guesswork with scientific psychometric assessments to understand your strengths.',
              bullets: ['Aptitude Analysis', 'Stream Mapping', 'Detailed Reports'],
              action: { label: 'Take the test', to: '/career-clarity-tests' },
            },
            {
              image: { name: 'cg-talks', alt: 'Mentor speaking to a group of students in a counselling session' },
              title: 'Career Talk',
              text: 'Gain real-world insights through expert seminars, workshops, and personalized counselling.',
              bullets: ['Expert Seminars', 'Cell Setup', 'Industry Exposure'],
              action: { label: 'Book a talk', to: '/career-talk' },
            },
          ],
        },
      ],
    },
    {
      label: 'How Eval helps you',
      title: 'Discover the right career path for yourself',
      intro:
        'Get ready to steer yourself in the right direction by using our innovative methods and tools. It is important that every individual understands their strengths and weaknesses so that one can set realistic goals. We follow a three-step career guidance process to help every individual make an informed and well-researched choice of career.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Step one',
              title: 'Career Clarity Test',
              text: 'Test takers gain an in-depth understanding of their strengths, interests, work style indicators, further education options, and ideal career path.',
              action: { label: 'Start Eval test', to: 'https://evaltest.com/tests-info' },
            },
            {
              eyebrow: 'Step two',
              title: 'In-person career counselling',
              text: 'After attempting Eval you can take further help from our expert counsellors, who will understand the result of your Eval career report and help you plan your career — the stream you need to choose and the courses you need to study to achieve your desired career goals.',
              action: { label: 'Book your counselling session', to: '/contact-us' },
            },
            {
              eyebrow: 'Step three',
              title: 'Mentoring',
              text: 'Connect with industry-related mentors who will give their valuable time to share their experiences. Learn from them about the practicalities of the career of your choice. This is offered after the career counselling sessions.',
              action: { label: 'Get in touch', to: '/contact-us' },
            },
          ],
        },
      ],
    },
    {
      id: 'free-counselling',
      label: 'Global Profile Accelerator',
      title: 'Register for free career counselling',
      intro:
        'Career counselling leads into our Global Profile Accelerator, where expert mentors help you choose your study and career path and build a stronger study abroad application.',
      layout: 'aside',
      blocks: [{ type: 'registration' }],
    },
    {
      label: 'First step',
      title: 'Ready to take the first step?',
      tone: 'dark',
      intro: 'Join thousands of students who found their path with UEMS Ventures.',
      blocks: [
        {
          type: 'actions',
          items: [
            { label: 'Speak to a study expert', to: '/contact-us', variant: 'accent' },
            { label: 'Visit EvalTest.com', to: site.evalUrl, variant: 'light' },
          ],
        },
      ],
    },
  ],
};

export default page;
