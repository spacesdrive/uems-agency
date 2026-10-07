import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/ielts',
  meta: {
    title: 'IELTS Coaching – Online & Offline Classes',
    description:
      'UEMS IELTS training with trainers trained by the British Council: General and Academic modules, Band 7+ learning outcomes, exam strategies and booking your test date.',
  },
  hero: {
    eyebrow: 'IELTS',
    title: 'IELTS training for study, migration and work abroad',
    lead: [
      'It’s the era of globalisation, hence it’s important for students to get international exposure while studying. Many countries require an English proficiency test such as IELTS and PTE. UEMS is offering customised virtual classes for IELTS and PTE at affordable costs.',
    ],
    actions: [
      { label: 'Book your training', to: '/contact-us' },
      { label: 'All test prep', to: '/test-preparation-for-international-students', variant: 'outline' },
    ],
    image: { name: 'ielts-1', alt: 'IELTS information booklet' },
  },
  sections: [
    {
      label: 'About IELTS',
      title: 'What is IELTS?',
      blocks: [
        {
          type: 'split',
          image: { name: 'ielts-2', alt: 'Students studying together for IELTS' },
          paragraphs: [
            'IELTS is an English language test. It is the test that allows you to enter Australia, Canada, UK and Ireland with a choice to study or migrate. IELTS assesses all your English skills – reading, writing, listening and speaking – and is a requirement for your new life abroad.',
            'The IELTS test is developed by some of the world’s leading experts in language assessment. It is accepted by over 10,000 organisations worldwide, including schools, universities, employers, immigration authorities and professional bodies.',
            'IELTS is designed to test your English communication skills using a one-on-one speaking test. This means that you are assessed by having a real-life conversation with a real person.',
          ],
        },
      ],
    },
    {
      label: 'UEMS IELTS training',
      title: 'UEMS IELTS training',
      intro: 'UEMS [IELTS](https://www.ielts.org/) trainers support you in achieving the highest possible scores you can work towards.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'Module',
              title: 'General Training',
              text: 'This module is attempted by working professionals who wish to migrate to Australia or Canada.',
            },
            {
              eyebrow: 'Module',
              title: 'Academic Training',
              text: 'This module is attempted by students who are looking at moving to Australia, Canada, New Zealand etc. for further studies.',
            },
          ],
        },
      ],
    },
    {
      label: 'In the training',
      title: 'In the training you',
      blocks: [
        {
          type: 'split',
          imageSide: 'left',
          image: { name: 'ielts-3', alt: 'Students learning together in a classroom' },
          bullets: [
            'Achieve learning outcomes for Band 7+ in every section',
            'Academic and General exam strategies and tactics',
            'Computer-based exam strategies and tactics',
            'Increase your reading answer accuracy',
            'Successfully overcome your IELTS listening traps',
            'Know what IELTS examiners want from speaking and writing',
          ],
          paragraphs: [
            'Our trainers are trained by the British Council and are able to share their expertise and tips for getting the best scores, for studying abroad, migration or to work as a professional overseas.',
          ],
          actions: [{ label: 'Contact us', to: '/contact-us' }],
        },
      ],
    },
    {
      label: 'Book',
      title: 'Book your training session and your examination date with UEMS Ventures',
      tone: 'dark',
      blocks: [{ type: 'actions', items: [{ label: 'Contact us', to: '/contact-us', variant: 'accent' }] }],
    },
  ],
};

export default page;
