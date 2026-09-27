import { enquirySection, partnerSection } from '../shared';
import type { CardItem, ContentPageData } from '../types';

const destinations: CardItem[] = [
  { title: 'Australia', image: { name: 'city-australia', alt: 'Sydney Opera House and harbour' }, action: { label: 'Study in Australia', to: '/study-in-australia' } },
  { title: 'Canada', image: { name: 'city-canada', alt: 'Toronto skyline with the CN Tower' }, action: { label: 'Study in Canada', to: '/studyincanada' } },
  { title: 'UK / Ireland', image: { name: 'city-uk', alt: 'Big Ben and the Houses of Parliament, London' }, action: { label: 'Study in UK & Ireland', to: '/study-in-uk-ireland' } },
  { title: 'USA', image: { name: 'city-usa', alt: 'Statue of Liberty, New York' }, action: { label: 'Study in USA', to: '/study-in-usa' } },
  { title: 'Asia', image: { name: 'city-asia', alt: 'Marina Bay, Singapore' }, action: { label: 'Study in Asia', to: '/study-in-asia' } },
  { title: 'New Zealand', image: { name: 'city-nz', alt: 'Auckland waterfront, New Zealand' }, action: { label: 'Study in New Zealand', to: '/study-in-new-zealand' } },
  { title: 'UAE', image: { name: 'city-uae', alt: 'Dubai waterfront architecture' }, action: { label: 'Study in UAE', to: '/study-in-uae' } },
  { title: 'Europe', image: { name: 'city-europe', alt: 'Modern European waterfront architecture' }, action: { label: 'Study in Europe', to: '/study-in-europe' } },
];

const page: ContentPageData = {
  path: '/study-abroad-consultants',
  meta: {
    title: 'Best Study Abroad Consultants in Mumbai',
    description:
      'Study abroad consultants UEMS Ventures offer guides to studying in Australia, Canada, the UK & Ireland, USA, Asia, New Zealand, UAE and Europe, with complete application assistance.',
  },
  hero: {
    eyebrow: 'Best study abroad consultants',
    title: 'Study abroad consultants for abroad studies',
    lead: [
      'You have come to the right place for study abroad consultants. Here you will find guides to study in different countries, also giving you a chance to connect with us for a one-on-one consultation. UEMS offers complete application assistance for courses in many countries.',
    ],
    actions: [
      { label: 'Enquire now', to: '#enquire' },
      { label: 'Talk to Mumbai expert', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'sa-hero', alt: 'Graduate in cap and gown pointing towards a city skyline' },
  },
  sections: [
    {
      label: 'Destinations',
      title: 'What’s your study destination?',
      blocks: [{ type: 'cards', columns: 4, items: destinations }],
    },
    {
      label: 'Why study abroad',
      title: 'Why study abroad?',
      blocks: [
        {
          type: 'split',
          image: { name: 'sa-benefits', alt: 'Student in a graduation cap pointing to flags of study destinations' },
          paragraphs: [
            'Studying abroad welcomes you to a whole new world, giving you a new experience. You get to make new friends and experience new cultures, and anyone with average scores can also get into a good course abroad. Studying abroad grooms you into an independent human being with a lot more confidence in your professional life.',
            'It helps you get out of your comfort zone and makes you experience new possibilities, bringing out your hidden strengths.',
          ],
        },
      ],
    },
    partnerSection,
    {
      label: 'Our approach',
      title: 'We listen, we discuss, and then you decide what’s best for you',
      blocks: [
        {
          type: 'prose',
          size: 'lead',
          paragraphs: [
            'The process of selecting the course and the country is done in such a way that our study abroad consultants ensure our students are left empowered with the decision they finally make. After all, it is a life-changing experience.',
          ],
        },
      ],
    },
    {
      label: 'Types of courses',
      title: 'Types of courses',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              title: 'High School',
              text: 'Going to high school overseas offers international students a life-changing opportunity. Play a sport, practice English and live a new experience, all while gaining skills that will last you a lifetime.',
            },
            {
              title: 'Undergraduate',
              text: 'Choose a country of your choice to enhance yourself with skills you gain with international exposure. If you are someone who likes to venture out and build your confidence, study abroad opens doors to many options you might not have available to you here. Aspire yourself to new avenues – personally and academically.',
            },
            {
              title: 'Post Graduation',
              text: 'Post graduation degrees abroad can give you a leap in your professional life, as studying abroad also means that you are allowed to work while you are studying. The work experience you gain while studying gives you a practical outlook into your profession.',
            },
          ],
        },
        {
          type: 'callout',
          title: 'Many countries welcome international students',
          text: 'Talk to us — each country has its own advantage, and UEMS helps you find the right country and the right course for you.',
          actions: [
            { label: 'Enquire now', to: '/contact-us' },
            { label: 'Read about student experiences', to: '/#reviews' },
          ],
        },
      ],
    },
    enquirySection(),
  ],
};

export default page;
