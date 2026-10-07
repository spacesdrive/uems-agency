import { enquirySection } from '../shared';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/services',
  meta: {
    title: 'Student Services – Finance, Accommodation, Visa, Insurance & Exam Prep',
    description:
      'UEMS Ventures supports students end to end: financial assistance and education loans, accommodation, visa lodgement, pre-departure counselling, health insurance and external exam preparation.',
  },
  hero: {
    eyebrow: 'Our services',
    title: 'Everything you need, from offer letter to landing',
    lead: [
      'Getting admitted is only half the journey. UEMS takes care of the practical steps too, so you and your family can plan with confidence, wherever in the world you are applying from.',
    ],
    actions: [
      { label: 'Inquire now', to: '#enquire' },
      { label: 'External exam preparation', to: '/test-preparation-for-international-students', variant: 'outline' },
    ],
    image: { name: 'sn-hero', alt: 'Students studying together at a table' },
  },
  sections: [
    {
      label: 'At a glance',
      title: 'Our student services',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            { title: 'Financial assistance', text: 'Education loans through HDFC Credila and approved banks.', action: { label: 'Learn more', to: '#financial-assistance' } },
            { title: 'Accommodation', text: 'On-campus, homestay and rental options arranged before you fly.', action: { label: 'Learn more', to: '#accommodation' } },
            { title: 'Visa lodgement', text: 'Document checklists, application lodgement and interview preparation.', action: { label: 'Learn more', to: '#visa-lodgement' } },
            { title: 'Pre-departure counselling', text: 'A face-to-face or virtual briefing so you land with confidence.', action: { label: 'Learn more', to: '#pre-departure' } },
            { title: 'Health insurance', text: 'Shortlisted overseas student health cover that meets visa rules.', action: { label: 'Learn more', to: '#health-insurance' } },
            { title: 'External exam preparation', text: 'Coaching for IELTS, PTE, TOEFL, SAT, ACT, GRE and GMAT.', action: { label: 'Learn more', to: '/test-preparation-for-international-students' } },
          ],
        },
      ],
    },
    {
      id: 'financial-assistance',
      label: 'Financial assistance',
      title: 'Financial assistance',
      blocks: [
        {
          type: 'split',
          image: { name: 'sn-loan', alt: 'Illustration of a bank building' },
          paragraphs: [
            'UEMS is working closely with HDFC Credila and other approved banks to provide education loans for studying abroad. Speak to us to understand the various options available, including scholarships you may be eligible for.',
          ],
          actions: [
            { label: 'Inquire now', to: '#enquire' },
          ],
        },
      ],
    },
    {
      id: 'accommodation',
      label: 'Accommodation',
      title: 'Accommodation',
      blocks: [
        {
          type: 'split',
          imageSide: 'left',
          image: { name: 'sn-accommodation', alt: 'Illustration of a student house' },
          paragraphs: [
            'UEMS assists all its students in finding the right accommodation for them. We are linked to many accommodation providers who can assist. Each country offers different types of accommodation, such as:',
          ],
          bullets: ['**USA:** on campus', '**Australia:** on campus, boarding and lodging, or renting an apartment'],
        },
        {
          type: 'prose',
          paragraphs: ['We are here to make sure you land in a new country with all your basic needs arranged before you leave.'],
        },
      ],
    },
    {
      id: 'visa-lodgement',
      label: 'Visa lodgement',
      title: 'Visa lodgement',
      blocks: [
        {
          type: 'split',
          image: { name: 'mig-visa', alt: 'Passport and visa documents on a desk' },
          paragraphs: [
            'Once you accept your offer, our team prepares and lodges your student visa application with you. We give you a clear document checklist, review your financial and academic evidence, and make sure everything is submitted correctly and on time.',
            'Where an interview or biometrics appointment is required, we help you prepare so you walk in confident.',
          ],
          actions: [{ label: 'Inquire now', to: '#enquire' }],
        },
      ],
    },
    {
      id: 'pre-departure',
      label: 'Pre-departure counselling',
      title: 'Pre-departure counselling',
      blocks: [
        {
          type: 'split',
          imageSide: 'left',
          image: { name: 'sn-departure', alt: 'Traveller with luggage at an airport' },
          paragraphs: [
            'So all application procedures are completed and you are ready to leave but feeling anxious. Don’t be, as we have everything covered before you land.',
            'After the visa is received, UEMS invites you for a face-to-face or a virtual pre-departure counselling session. We feel it is our responsibility to make sure our students leave their home country with confidence and no fear of landing in an unknown place.',
          ],
        },
      ],
    },
    {
      id: 'health-insurance',
      label: 'Health insurance',
      title: 'Health insurance',
      blocks: [
        {
          type: 'split',
          image: { name: 'sn-insurance', alt: 'Hands protecting a paper family and heart' },
          paragraphs: [
            'Health insurance is a must as it takes care of your medical needs in a foreign country. UEMS has already shortlisted a few health insurance providers for you. Contact our office so that we can assist.',
            'One of the student visa requirements is health insurance, and students who do not maintain it are at risk of having their visas cancelled.',
          ],
        },
      ],
    },
    {
      id: 'exam-preparation',
      label: 'External exam preparation',
      title: 'External exam preparation',
      blocks: [
        {
          type: 'callout',
          title: 'Coaching for every exam on your application',
          text: 'Online coaching for IELTS, PTE, TOEFL, SAT, ACT, GRE and GMAT, with expert instructors, practice tests and personal feedback.',
          actions: [
            { label: 'View exam preparation', to: '/test-preparation-for-international-students' },
            { label: 'IELTS training', to: '/ielts', variant: 'outline' },
          ],
        },
      ],
    },
    enquirySection('Inquire now'),
  ],
};

export default page;
