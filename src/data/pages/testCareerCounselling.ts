import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/test-career-counselling',
  meta: {
    title: 'Test Career Counselling – Get Connected to a Career Counsellor',
    description:
      'EVAL’s 4-step approach to academic and career counselling: understand yourself, overcome external pressures and make an informed career decision with a UEMS career counsellor.',
  },
  hero: {
    eyebrow: 'Test career counselling',
    title: 'A successful career is just one step away',
    lead: ['Gain a better understanding of your career path forward.'],
    actions: [
      { label: 'Book your session', to: '/contact-us' },
      { label: 'Book career clarity test', to: site.evalUrl, variant: 'outline' },
    ],
    image: { name: 'cct-mentoring', alt: 'Career counsellor with a group of students' },
  },
  sections: [
    {
      label: 'EVAL 4-step approach',
      title: 'Get connected to a career counsellor',
      layout: 'aside',
      intro: 'EVAL 4-step approach to academic, test career counselling & planning.',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'A very important part of a career planning journey is test career counselling. Our expert career counsellors help all individuals understand themselves better to make an informed decision about a meaningful career.',
            'Career counselors work with you to create self-awareness and develop understanding. Whether you are a student or a professional, if you are confused or looking for a career change, career counselors can shed light on the options available.',
            'A session with a career counselor gives you a detailed insight into yourself and your interests.',
          ],
        },
      ],
    },
    {
      label: 'Boost your career',
      title: 'Take a step forward to boost your career',
      intro:
        'There are so many external factors that influence any aspiring learner’s career decision. Some of the top factors which influence career decisions are:',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            { title: 'Parental pressure' },
            { title: 'Peer pressure' },
            { title: 'Society trends' },
            { title: 'Quick settling / money career options' },
            { title: 'Fast money (less knowledge)' },
            { title: 'Wrong prejudices about careers in general' },
          ],
        },
      ],
    },
    {
      label: 'How we help',
      title: 'How our career counsellor will help you take the right career decision',
      blocks: [
        {
          type: 'split',
          image: { name: 'cg-tests', alt: 'Student completing a career assessment' },
          paragraphs: [
            'Our expert career counsellor will help you realise your true potential, talents, skills and interests using a series of career assessment tools.',
            'At the end of a career counselling session you will have clarity of your career goals, in-depth knowledge of various career options that are suitable to you, and proper guidance about the right education and training required to achieve your career goals.',
          ],
          actions: [
            { label: 'Book career clarity test', to: site.evalUrl },
            { label: 'Book counselling session', to: '/contact-us', variant: 'outline' },
          ],
        },
      ],
    },
    {
      label: 'Our counsellors',
      title: 'Our team of career counsellors',
      tone: 'dark',
      intro:
        'Our test career counselling members hold years of experience and have expertise in career development theory, counselling techniques, administration and interpretation of assessments, and career information resources. Our career counselors are fully trained to assist with all aspects of the candidate’s career decisions.',
      blocks: [
        {
          type: 'callout',
          title: 'Start your career with a great impact',
          text: 'Get in touch today.',
          actions: [
            { label: 'Get in touch', to: '/contact-us' },
            { label: `Call ${site.phones[0].display}`, to: site.phones[0].href },
          ],
        },
      ],
    },
  ],
};

export default page;
