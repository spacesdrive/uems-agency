import { enquirySection } from '../shared';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/australia-migration',
  meta: {
    title: 'Australia Immigration Specialist in Mumbai – Migrate to Australia',
    description:
      'Migrate to Australia with UEMS Ventures: MARA agents with 20+ years’ combined experience, and skilled visas (189, 190 and 491).',
  },
  hero: {
    eyebrow: 'Migrate to Australia',
    title: 'Migrate to Australia',
    lead: [
      'Are you looking for better weather, cleaner air, a high standard of living, a park at the corner of every street or a reliable healthcare system? Australia offers you all this and much more.',
      'Australia is a developed country with a strong economy, attracting many people from around the world to settle there every year. Australia welcomes immigrants as it requires skilled labour in many sectors.',
    ],
    actions: [
      { label: 'Inquire now', to: '#enquire' },
      { label: 'Migration overview', to: '/migration', variant: 'outline' },
    ],
    image: { name: 'aumig-hero', alt: 'Smiling student in a classroom' },
    facts: [
      { value: '20+ yrs', label: 'Combined experience of our MARA agents' },
      { value: '98%', label: 'Success rate' },
      { value: 'Points-based', label: 'Skilled visa system' },
    ],
  },
  sections: [
    {
      label: 'Skills in demand',
      title: 'Are your skills in demand?',
      blocks: [
        {
          type: 'prose',
          size: 'lead',
          paragraphs: [
            'You may be eligible to apply for a skilled visa in Australia if your current skills are in demand. It’s a points-based system, and there are many visas on offer.',
            'Find out if your skills are currently in demand. Remember this list keeps changing every now and then, so if you are thinking of shifting to Australia, it is advisable not to delay.',
          ],
        },
      ],
    },
    {
      label: 'How UEMS helps',
      title: 'How UEMS can help you migrate to Australia',
      layout: 'aside',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'Migration is a very big decision for anyone, shifting from their hometown to a whole new country. Hence it is very important to have someone with you who can guide you step by step through the complete application process, giving you accurate and detailed Australian visa advice.',
            'UEMS’ Australian Migration Team comprises MARA agents who have a combined experience of over 20 years in the field with a 98% success rate. We are committed to achieving successful outcomes for clients. Unique Education and Migration Services (UEMS) has its very own team of lawyers, as the UEMS headquarters is a law firm led by Ms Shefali Nandra (see [www.uniquemigration.com.au](https://www.uniquemigration.com.au)). Our firm offers pre-eminent expertise in all aspects of immigration and nationality law.',
            'Our assistance starts with counselling in India itself by an Australian citizen who is happy to share all about the country and what it offers. We like to know your migration dream and guide you with first-hand knowledge.',
            'We share our belief of doing our “homework first” with our clients, which starts the process with a preliminary assessment.',
          ],
        },
      ],
    },
    {
      label: 'Eligibility',
      title: 'Eligibility criteria: our services include',
      blocks: [
        {
          type: 'cards',
          columns: 4,
          numbered: true,
          items: [
            { title: 'Assistance with choosing the “best” option for your situation.' },
            {
              title: 'Guidance on the right visa stream',
              text: 'We guide professionals working across various occupation types, including engineers, architects, doctors, managers, teachers and more, to select the visa stream or immigration program most suitable for their profile.',
            },
            { title: 'Simplifying the process with complete navigation through the paperwork.' },
            { title: 'Sharing professional knowledge and education.' },
          ],
        },
      ],
    },
    {
      label: 'Visa types',
      title: 'Skilled visas',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Permanent',
              title: '189 Visa',
              text: 'A permanent, points-based visa which allows you to live and work in Australia. This visa applies to those who are not sponsored by an employer, any family member or a government agency.',
            },
            {
              eyebrow: 'Permanent',
              title: '190 Visa',
              text: 'A permanent, points-based visa which allows you to live and work in Australia. You must meet certain age, English, qualifications and work experience requirements. It is based on sponsorship by a government agency.',
            },
            {
              eyebrow: 'Provisional',
              title: '491 Visa',
              text: 'A provisional visa which allows you to work, live and study in regional areas of Australia (speak to UEMS to find out what the regional areas are). It allows you to travel to and from Australia while the visa is valid.',
            },
          ],
        },
      ],
    },
    {
      label: 'Profile assessment',
      title: 'Not sure which visa fits?',
      blocks: [
        {
          type: 'callout',
          title: 'Get your profile assessed thoroughly',
          text: 'Contact UEMS to understand if you qualify and which visa type is the best fit for your background, then follow through with complete guidance on the application process.',
          actions: [{ label: 'Inquire now', to: '#enquire' }],
        },
      ],
    },
    {
      label: 'Our services',
      title: 'Our services include',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Preliminary assessment and consultation',
              text: 'We do our homework, understand the case completely, and guide you on where you stand with respect to the application.',
            },
            {
              title: 'Step-by-step lodgement',
              text: 'Lodgement of the application with complete guidance at every step.',
            },
          ],
        },
      ],
    },
    enquirySection(),
  ],
};

export default page;
