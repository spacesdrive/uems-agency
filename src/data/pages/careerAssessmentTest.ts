import type { ContentPageData } from '../types';

const evalBooking = 'https://evaltest.com/tests-info';

const page: ContentPageData = {
  path: '/career-guidance/career-assessment-test',
  meta: {
    title: 'Premium Career Assessment Test – Eval',
    description:
      'Looking for career clarity? Take the Eval career test: five steps to clarity, a detailed premium report and Eval test series for Humanities, Science, Commerce, Engineering and Grades 8–10.',
  },
  hero: {
    eyebrow: 'Looking for career clarity?',
    title: 'You are at the right place…',
    lead: [
      'Use a quick and fun way to find a match between your personal interests and the right career. To start with, you can take our [free career test](/best-free-career-personality-test) and then proceed to the **Premium Eval Test** for a detailed report of your interests, education and future careers.',
    ],
    actions: [
      { label: 'Visit evaltest.com', to: 'https://www.evaltest.com' },
      { label: 'Eval test series', to: '#series', variant: 'outline' },
    ],
    image: { name: 'cg-tests', alt: 'Student completing an online career assessment' },
  },
  sections: [
    {
      label: 'Steps',
      title: 'Steps to achieve career clarity',
      intro: 'Follow these steps to get complete clarity in your career.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Register', text: 'First, visit our website www.evaltest.com and register for the Eval Test.' },
            { title: 'Pick your test', text: 'Pick the most appropriate Eval Test based on your education background and career goals.' },
            {
              title: 'Answer 40 questions',
              text: 'Answer 40 easy questions. Read the pairs of phrases and select the phrase that most accurately describes you.',
            },
            {
              title: 'Get your report',
              text: 'After your test, you will receive a detailed report about your strengths and preferences, including career paths you may want to explore.',
            },
            {
              title: 'Talk to a counsellor',
              text: 'We help students explore their options by providing career counselors, who help them interpret their career report and find careers that suit them.',
            },
          ],
        },
        { type: 'actions', items: [{ label: 'Visit evaltest.com', to: evalBooking }] },
      ],
    },
    {
      label: 'What is Eval',
      title: 'Gain a detailed understanding of yourself with Eval Test',
      layout: 'aside',
      intro: 'Eval test is a systematic means of testing a student’s ability to perform specific tasks and interests.',
      blocks: [
        { type: 'checklist', columns: 2, items: ['No prior knowledge', 'No preparation', 'Simple questions', 'Takes less than 30 minutes'] },
        {
          type: 'prose',
          paragraphs: [
            'It is designed in a way that it measures your ability in many areas of work and your interest level. The concept behind this test is that each test question will have only one correct answer and everyone can correctly solve each question.',
          ],
        },
      ],
    },
    {
      label: 'Premium report',
      title: 'What does the Premium Eval Test report include?',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            { title: 'Quantitative & descriptive reports' },
            { title: 'Graphical representation of interest scores' },
            { title: 'Detailed and diverse career categories' },
            { title: 'Complete guidance on education options' },
            { title: 'Exhaustive list of job recommendations' },
          ],
        },
      ],
    },
    {
      id: 'series',
      label: 'Eval test series',
      title: 'Pick the most appropriate Eval Test for your education background and career goals',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: '₹500',
              title: 'Eval for Humanities',
              text: 'Designed for students currently studying arts or humanities subjects, or professionals who have completed their degree in it.',
              action: { label: 'Book now', to: evalBooking },
            },
            {
              eyebrow: '₹500',
              title: 'Eval General Test',
              text: 'Designed for students in Grades 8, 9, and 10 who are exploring their interests and need guidance with stream selection.',
              action: { label: 'Book now', to: evalBooking },
            },
            {
              eyebrow: '₹500',
              title: 'Eval for Science',
              text: 'Designed for students currently studying Science, or professionals who have completed their degree in it.',
              action: { label: 'Book now', to: evalBooking },
            },
            {
              eyebrow: '₹500',
              title: 'Eval for Commerce',
              text: 'Designed for students currently studying Commerce, or professionals who have completed their degree in it.',
              action: { label: 'Book now', to: evalBooking },
            },
            {
              eyebrow: '₹500',
              title: 'Eval for Engineering',
              text: 'Designed for students currently studying Engineering, or professionals who have completed their degree in it.',
              action: { label: 'Book now', to: evalBooking },
            },
          ],
        },
      ],
    },
    {
      label: 'Benefits',
      title: 'Benefits of the Eval Test',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'For students',
              title: 'Choose courses, internships and a field with confidence',
              text: 'EVAL can be used to make decisions about what kind of courses to pick for Bachelor’s and Master’s degrees, which internship opportunities to pursue, and to get a clear understanding of what field to build a career in.',
            },
            {
              eyebrow: 'For parents',
              title: 'Understand and support your child',
              text: 'EVAL can help parents understand the strengths and interests of their children and feel confident about supporting their dreams.',
            },
            {
              eyebrow: 'For educators',
              title: 'Encourage holistic development',
              text: 'EVAL helps educators understand test takers’ strengths and interests and encourage them in areas of their interest, while providing extra support in areas that are less interesting to them to facilitate holistic development.',
            },
            {
              eyebrow: 'For class owners',
              title: 'A value-added service for your students',
              text: 'The EVAL test can be offered as a value-added service through tuition classes. It helps class owners understand which career paths are best for their students and provide guidance accordingly — and offer further educational support that extends student loyalty to the institute.',
            },
          ],
        },
        { type: 'actions', items: [{ label: 'Sign up for your Eval', to: 'https://evaltest.com/home' }] },
      ],
    },
  ],
};

export default page;
