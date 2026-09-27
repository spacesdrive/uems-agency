import { enquirySection, partnerSection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-uk-ireland',
  meta: {
    title: 'Study in UK & Ireland from Mumbai – Requirements, Costs & Visa',
    description:
      'Study in the UK and Ireland with UEMS Ventures: why students choose the UK & Ireland, course requirements, costs in Ireland and the student visa document checklist.',
  },
  hero: {
    eyebrow: 'Study in the UK & Ireland',
    title: 'Study in the UK & Ireland – best options',
    lead: [
      'A flight time of merely 9 hours gets you into a country full of cultural diversity called the United Kingdom — the biggest island in the European continent, with four countries: England, Scotland, Wales and Northern Ireland, surrounded by water all around.',
      'The UK shares its only land border with Ireland, where some of the biggest innovations come from — like the submarine, the modern stethoscope and colour photography. Ireland is one of the friendliest places to be; everyone is always made to feel at home.',
    ],
    actions: [
      { label: 'Talk to Mumbai expert', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'uk-hero', alt: 'Group of smiling students holding books' },
  },
  sections: [
    {
      label: 'What the UK & Ireland offer',
      title: 'What the UK & Ireland offer international students',
      intro:
        'Find out why more than 250,000 students are invited to study in the UK and 32,000 students in Ireland every year. The numbers are growing every year. Here’s a complete guide for reaching the UK / Ireland for further studies.',
      blocks: [
        {
          type: 'split',
          image: { name: 'city-uk', alt: 'The Palace of Westminster and Big Ben across the River Thames in London' },
          title: 'Reasons for moving to the UK & Ireland for further studies',
          bullets: ['Quality education', 'Safe environment', 'Shorter courses', 'Work while you study', 'Diverse culture'],
        },
        {
          type: 'tags',
          title: 'Popular courses',
          items: ['Law', 'Business', 'Medicine', 'Finance', 'Food Technology', 'Artificial Intelligence', 'Biotechnology', 'Social Sciences'],
        },
      ],
    },
    partnerSection,
    {
      label: 'Requirements & costs',
      title: 'Course requirements and costs',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'United Kingdom',
              title: 'Course requirements in the UK',
              text: 'Since UK universities are looking for the best candidates, most will conduct entrance tests to filter the bright minds. UK universities also require additional documents such as references to prove that you hold the competence to succeed in your course.',
              facts: [{ label: 'IELTS', value: '6.5 band for most courses' }],
            },
            {
              eyebrow: 'Ireland',
              title: 'Cost of the course – Ireland',
              text: 'The expenses for every individual in Ireland vary depending on where you choose to stay and what your personal expenditures are.',
              facts: [{ label: 'Average per year', value: '€6,000 – €11,000' }],
            },
          ],
        },
        {
          type: 'callout',
          title: 'Course requirements and UK course costs',
          text: 'Entry requirements for Ireland and detailed course costs for the UK depend on the course and institution — talk to our team for current figures for your profile.',
          actions: [{ label: 'Contact us', to: '/contact-us' }],
        },
      ],
    },
    {
      label: 'Student visa',
      title: 'Student visa for the UK and Ireland',
      layout: 'aside',
      intro: 'Original plus one copy for each of the following documents:',
      blocks: [
        {
          type: 'checklist',
          items: [
            'Acceptance letter & confirmation of fees paid',
            'Statement of Purpose',
            'Brief CV',
            'Class 10th mark sheet & certificate',
            'Class 12th mark sheet & certificate',
            'Graduation mark sheet & certificate (in case of PG course)',
            'IELTS/PTE score card (any one)',
            'Letter from current employer or experience certificate (where applicable)',
          ],
        },
        { type: 'actions', items: [{ label: 'Contact us', to: '/contact-us' }] },
      ],
    },
    enquirySection(),
  ],
};

export default page;
