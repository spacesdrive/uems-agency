import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/student-needs',
  meta: {
    title: 'Student Needs – Pre-Departure Services & Resources for Moving Abroad',
    description:
      'UEMS Ventures helps students prepare to move abroad: accommodation, education loans with HDFC Credila and approved banks, health insurance and pre-departure counselling.',
  },
  hero: {
    eyebrow: 'Student needs',
    title: 'Everything you need before you leave',
    lead: [
      'UEMS presents a library of resources which assists students with complete preparation to move to a new country for further education.',
    ],
    actions: [{ label: 'Contact UEMS', to: '/contact-us' }],
    image: { name: 'sn-hero', alt: 'Students studying together at a table' },
  },
  sections: [
    {
      label: 'Accommodation',
      title: 'Accommodation',
      blocks: [
        {
          type: 'split',
          image: { name: 'sn-accommodation', alt: 'Illustration of a student house' },
          paragraphs: [
            'UEMS assists all its students in finding the right accommodation for them. We are linked to many accommodation providers who can assist. Each country offers different types of accommodation, such as:',
          ],
          bullets: ['**USA:** on campus', '**Australia:** on campus, boarding and lodging, or renting an apartment'],
          actions: [{ label: 'Contact UEMS', to: '/contact-us' }],
        },
        {
          type: 'prose',
          paragraphs: ['We are here to make sure you land in a new country with all your basic needs arranged before you leave.'],
        },
      ],
    },
    {
      label: 'Bank loan',
      title: 'Bank loan',
      blocks: [
        {
          type: 'split',
          imageSide: 'left',
          image: { name: 'sn-loan', alt: 'Illustration of a bank building' },
          paragraphs: [
            'UEMS is working closely with HDFC Credila and other approved banks to provide bank loans for studying. Speak to us to understand the various options available. You may also go straight to HDFC Credila and apply.',
          ],
          actions: [
            { label: 'Contact UEMS', to: '/contact-us' },
            { label: 'Apply with HDFC Credila', to: 'http://www.hdfccredila.com/apply-for-loan-partner.html?chear=Partner&cspecify=E1901080002', variant: 'outline' },
          ],
        },
      ],
    },
    {
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
          actions: [{ label: 'Contact UEMS', to: '/contact-us' }],
        },
      ],
    },
    {
      label: 'Pre-departure',
      title: 'Pre-departure',
      blocks: [
        {
          type: 'split',
          imageSide: 'left',
          image: { name: 'sn-departure', alt: 'Traveller with luggage at an airport' },
          paragraphs: [
            'So all application procedures are completed and you are ready to leave but feeling anxious. Don’t be, as we have everything covered before you land.',
            'After the visa is received, UEMS invites you for a face-to-face or a virtual pre-departure counselling session. We feel it is our responsibility to make sure our students leave their home country with confidence and no fear of landing in an unknown place.',
          ],
          actions: [{ label: 'Contact UEMS', to: '/contact-us' }],
        },
      ],
    },
  ],
};

export default page;
