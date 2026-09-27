import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/best-free-career-personality-test',
  meta: {
    title: 'Best Free Career Personality Test – RIASEC Quiz',
    description:
      'The UEMS Career Personality Quiz follows the RIASEC format — Realistic, Investigative, Artistic, Social, Enterprising and Conventional — to point you towards careers that suit you.',
  },
  hero: {
    eyebrow: 'Best free career personality quiz',
    title: 'Discover your ideal career path',
    lead: [
      'Embark on our Best Free Career Personality Quiz to unveil your distinct personality traits. Discover which careers align seamlessly with who you are, and navigate towards a professional future that suits your unique characteristics!',
    ],
    actions: [
      { label: 'Request the free quiz', to: '/contact-us' },
      { label: 'Premium test at evaltest.com', to: site.evalUrl, variant: 'outline' },
    ],
    image: { name: 'cg-programs', alt: 'Student at a crossroads choosing between career paths' },
  },
  sections: [
    {
      label: 'About the quiz',
      title: 'What is the UEMS Best Free Career Personality Quiz?',
      layout: 'aside',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'Embark on a transformative journey of self-discovery with our UEMS Career Personality Quiz. Our test follows the renowned RIASEC format – Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. This tailored assessment is designed to unlock the door to your ideal career path by delving into the realms of your unique strengths, interests, and values.',
          ],
        },
      ],
    },
    {
      label: 'Decoding RIASEC',
      title: 'Decoding RIASEC',
      intro:
        'The RIASEC Career Personality Quiz is based on John Holland’s Six Types of Occupational Personalities, which categorize individuals based on their dominant personality traits. Each letter represents a unique personality type and corresponding career preferences:',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'R',
              title: 'Realistic',
              text: 'Characterized by a hands-on approach, mechanical aptitude, and preference for concrete experiences. They often enjoy working with tools, machines, and physical objects.',
            },
            {
              eyebrow: 'I',
              title: 'Investigative',
              text: 'Analytical, curious, and enjoy solving problems. They are drawn to research, scientific inquiry, and technical fields.',
            },
            {
              eyebrow: 'A',
              title: 'Artistic',
              text: 'Creative, imaginative, and expressive. They are often drawn to fields that involve creativity, self-expression, and the arts.',
            },
            {
              eyebrow: 'S',
              title: 'Social',
              text: 'Outgoing, cooperative, and enjoy helping others. They are drawn to careers in education, healthcare, and social work.',
            },
            {
              eyebrow: 'E',
              title: 'Enterprising',
              text: 'Ambitious risk-takers who enjoy leading others. They are often drawn to sales, marketing, and entrepreneurial ventures.',
            },
            {
              eyebrow: 'C',
              title: 'Conventional',
              text: 'Detail-oriented, organized, and value structure. They are often drawn to careers in administration, finance, and data management.',
            },
          ],
        },
      ],
    },
    {
      label: 'Why take it',
      title: 'Why take our UEMS Best Free Career Personality Quiz?',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              title: 'Gain self-awareness',
              text: 'Understand your strengths, interests, and values, which are crucial for career satisfaction and success.',
            },
            {
              title: 'Explore career options',
              text: 'Discover potential career paths that align with your personality traits, increasing your chances of finding a fulfilling job.',
            },
            {
              title: 'Make informed decisions',
              text: 'Use test results to guide your career decisions, including education, training, and job applications.',
            },
          ],
        },
      ],
    },
    {
      label: 'How it works',
      title: 'How does the UEMS Best Free Career Personality Quiz work?',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Visit the UEMS website', text: 'Locate the UEMS Career Personality Test page.' },
            { title: 'Start the test', text: 'Initiate the testing process by clicking the “Take the Test Now” button.' },
            { title: 'Complete registration', text: 'Fill out the form with your personal details and click “Submit” to move to the test.' },
            { title: 'Log in again', text: 'After registration, log in again in order to get the result directly to your email.' },
            { title: 'Begin the test', text: 'Answer the 36 simple “yes” or “no” questions that make up the UEMS Career Personality Test.' },
            { title: 'Submit your responses', text: 'Click “Submit” to complete the test. It should take approximately 10–15 minutes to finish.' },
            { title: 'Receive your results', text: 'Your personalized RIASEC profile will be displayed on the screen upon completion.' },
            { title: 'Results via email', text: 'An email notification containing your RIASEC profile and career suggestions will be sent.' },
            { title: 'Interpret your results', text: 'Review your RIASEC profile and consider how your traits align with your career aspirations.' },
            {
              title: 'Enhance your career insights',
              text: 'For a comprehensive assessment report, consider the premium RIASEC Career Personality Test at [evaltest.com](https://www.evaltest.com/).',
            },
          ],
        },
        {
          type: 'actions',
          items: [
            { label: 'Request the free quiz', to: '/contact-us' },
            { label: 'Premium career assessment', to: '/career-guidance/career-assessment-test', variant: 'outline' },
          ],
        },
      ],
    },
  ],
};

export default page;
