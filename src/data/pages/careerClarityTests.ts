import { site } from '../site';
import type { ContentPageData } from '../types';

const evalBooking = 'https://evaltest.com/tests-info';

const page: ContentPageData = {
  path: '/career-clarity-tests',
  meta: {
    title: 'Career Clarity Tests – Discover the Career That Truly Fits You',
    description:
      'EvalTest career assessment with UEMS Ventures: understand your strengths, interests and personality in under 30 minutes, with a detailed Eval report and tests for Humanities, Science, Commerce, Engineering and Grades 8 to 10.',
  },
  hero: {
    eyebrow: 'Powered by EvalTest',
    title: 'Discover the career that truly fits you',
    lead: [
      'At **UEMS Ventures**, we believe career decisions should be based on clarity, not confusion, pressure, or guesswork. Let us introduce you to EvalTest.',
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
      blocks: [{ type: 'quizzes' }],
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
            'The assessment provides **personalized insights**, identifying natural strengths, career interests, personality traits, suitable pathways, subject recommendations, and ideal learning environments.',
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
            'It’s not an exam, it’s self-discovery',
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
      label: 'Steps',
      title: 'Steps to achieve career clarity',
      intro: 'Follow these steps to get complete clarity in your career.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Register', text: 'First, visit www.evaltest.com and register for the Eval Test.' },
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
              text: 'We help students explore their options by providing career counsellors, who help them interpret their career report and find careers that suit them.',
            },
          ],
        },
      ],
    },
    {
      label: 'Eval report',
      title: 'What does the Eval Test report include?',
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
              text: 'The EVAL test can be offered as a value-added service through tuition classes. It helps class owners understand which career paths are best for their students and provide guidance accordingly, and offer further educational support that extends student loyalty to the institute.',
            },
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
            'Guiding students at every stage, from subject selection to career planning. Our expert mentors provide personalized counselling tailored to each student’s unique strengths.',
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
            { label: 'See the Eval test series', to: '#series', variant: 'light' },
          ],
        },
      ],
    },
  ],
};

export default page;
