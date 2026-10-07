import { enquirySection } from '../shared';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/migration',
  meta: {
    title: 'Top Immigration Consultant – Migration Services',
    description:
      'UEMS Ventures migration services for Australia and Canada: free assessment, MARA agents and IRCC members, and a step-by-step migration process.',
  },
  hero: {
    eyebrow: 'Our migration services',
    title: 'Realise your dream of moving to a new country',
    lead: [
      'The UEMS Migration team assists its candidates in realising their dream of moving and re-establishing themselves in a new country.',
      'Choose from either Australia or Canada and we will have one of our migration professionals working on your application. Our aim is to help you at every step of the application, making it hassle-free and meeting a successful outcome.',
    ],
    actions: [
      { label: 'Get a free assessment', to: '#enquire' },
      { label: 'Migrate to Australia', to: '/australia-migration', variant: 'outline' },
    ],
    image: { name: 'mig-visa', alt: 'Passport, Australian flag and a migration sign on a desk' },
  },
  sections: [
    {
      label: 'How UEMS helps',
      title: 'How UEMS helps you with migration',
      layout: 'aside',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'UEMS helps you with a preliminary assessment, providing you with a well-researched answer about your profile. It’s important to work with migration professionals, as they support you with the correct government rules and regulations.',
            'The UEMS team in the Australian office includes MARA agents who are migration professionals with many years of experience under their belt. The Canada office also gives the same support with IRCC members who deal with migration to Canada.',
            'After the preliminary assessment you are linked with one of the team members from these offices to assist you in taking your application forward for the country you are interested in.',
          ],
        },
      ],
    },
    {
      label: 'Where to migrate',
      title: 'Choosing where to migrate',
      intro: 'Two of the most popular destinations to migrate to are Canada and Australia, because both offer:',
      blocks: [
        {
          type: 'split',
          image: { name: 'mig-students', alt: 'Group of young people looking up excitedly' },
          bullets: [
            'A high quality of life',
            'High standard of living',
            'A points-based system in both countries',
            'Safe and clean environments',
            'Excellent healthcare and education systems',
          ],
          actions: [{ label: 'Migrate to Australia', to: '/australia-migration' }],
        },
      ],
    },
    {
      label: 'The process',
      title: 'Step-by-step migration process',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Check if you’re qualified!' },
            { title: 'Submit all documents' },
            { title: 'Lodge your application' },
            { title: 'Visa granted' },
          ],
        },
      ],
    },
    {
      ...enquirySection('Free assessment'),
      title: 'Free assessment',
      intro: 'Please fill in this form to check your eligibility and we will contact you as soon as possible.',
      blocks: [{ type: 'enquiry', preset: 'migration' }],
    },
  ],
};

export default page;
