import { enquirySection, partnerSection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-usa',
  meta: {
    title: 'Study in the USA from Mumbai – Universities & Visa Guide',
    description:
      'Study in the USA with UEMS Ventures: what the USA offers international students, application documents and estimated course costs at public and private institutions.',
  },
  hero: {
    eyebrow: 'Study in the USA',
    title: 'Study in the USA – universities & visa guide',
    lead: [
      'As the third largest country in the world in size with nearly 319 million people, America is one of the most sought after study abroad destinations. It has the largest economy, connected to the country’s enormous population, technological innovation and high average incomes with a moderate unemployment rate, and it’s home to artists including Frank Sinatra, Elvis Presley, Madonna and Whitney Houston.',
    ],
    actions: [
      { label: 'Talk to Mumbai expert', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'us-hero', alt: 'Students holding books in a university library' },
  },
  sections: [
    {
      label: 'What the USA offers',
      title: 'What the USA offers to international students',
      blocks: [
        {
          type: 'split',
          image: { name: 'city-usa', alt: 'The Statue of Liberty in New York harbour' },
          paragraphs: [
            'The USA has emerged as one of the top study destinations for students because of the quality of education it offers. There are more than a million international students studying in the USA.',
            'It is less competitive than schools in India, as even an average student can get a chance to get into a good institute.',
          ],
        },
        {
          type: 'tags',
          title: 'Popular courses',
          items: ['Business', 'IT', 'Liberal Arts', 'Engineering', 'Artificial Intelligence', 'Social Sciences'],
        },
      ],
    },
    partnerSection,
    {
      label: 'Requirements',
      title: 'What you need to study in the USA',
      layout: 'aside',
      blocks: [
        {
          type: 'checklist',
          items: [
            'Your Xth and XIIth marksheets',
            'Statement of Purpose',
            'Academic resume',
            'Your portfolio',
            'Two letters of recommendation from teachers and counselors',
            'Proof of funds',
          ],
        },
      ],
    },
    {
      label: 'Course cost',
      title: 'Estimated course cost',
      intro:
        'The cost of study in the USA varies depending on the course of study, the type of institution (private or public), and the length of the program.',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '$17,000', label: 'Average cost at a public university' },
            { value: '$43,000', label: 'Average cost at a private institute' },
          ],
        },
        { type: 'actions', items: [{ label: 'Contact us', to: '/contact-us' }] },
      ],
    },
    enquirySection(),
  ],
};

export default page;
