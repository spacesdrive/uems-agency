import { site } from '../../site';
import { enquirySection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-europe',
  meta: {
    title: 'Study in Europe from India – Top Universities & Admission Guidance',
    description:
      'Study in Europe with UEMS Ventures: the Schengen advantage, admission checklist, the “Big 5” destinations, featured universities by country and scholarship support.',
  },
  hero: {
    eyebrow: 'Study in Europe',
    title: 'Why Europe? Elevate your future beyond borders',
    lead: [
      '**Study in Europe: the global powerhouse for your career.** Europe isn’t just a destination; it’s a strategic career move. Combining centuries of prestige with modern innovation, the European Union offers an unmatched ecosystem for international students.',
    ],
    actions: [
      { label: 'Talk to the experts', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'eu-hero', alt: 'Students sitting together on university steps in Europe' },
  },
  sections: [
    {
      label: 'Why Europe',
      title: 'The global powerhouse for your career',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'The Schengen advantage',
              text: 'One visa, 27 countries. Experience unrestricted travel and networking across the world’s largest economic zone.',
            },
            {
              title: 'World-class ROI',
              text: 'Access top-tier education at a fraction of the cost. From **tuition-free public universities** in Germany to extensive housing subsidies in France, Europe makes premium education affordable.',
            },
            {
              title: 'A global tech & business hub',
              text: 'Home to the headquarters of Google, BMW, Airbus, and L’Oréal. Benefit from a curriculum designed in collaboration with industry leaders.',
            },
            {
              title: 'Post-graduation security',
              text: 'With stay-back options ranging from **18 to 24 months**, Europe provides a stable bridge from your degree to a high-paying global career.',
            },
            {
              title: 'Earn while you learn',
              text: 'Flexible work rights allow you to cover your living expenses while gaining local professional experience.',
            },
          ],
        },
      ],
    },
    {
      label: 'Admission checklist',
      title: 'Fast-track your journey',
      layout: 'aside',
      intro: 'We’ve simplified the complexities. Here is what you need to qualify for the top European institutions:',
      blocks: [
        {
          type: 'table',
          columns: ['Feature', 'Requirement'],
          rows: [
            ['Academics', 'Minimum **55% – 60%** (public universities prefer 70%+)'],
            ['English proficiency', '**IELTS 6.0 – 6.5** or **Medium of Instruction (MOI)** waiver'],
            ['Study gaps', '**Accepted** when supported by relevant work experience'],
            ['Intakes', '**Winter (Sept/Oct)** & **Spring (Jan/Feb)**'],
          ],
        },
      ],
    },
    {
      label: 'The “Big 5”',
      title: 'Choose the country that matches your ambition',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              eyebrow: 'Germany',
              title: 'The engineering capital',
              text: 'Low tuition, 18-month stay-back, and the strongest job market in the EU.',
            },
            {
              eyebrow: 'France',
              title: 'The hub of luxury & business',
              text: 'Home to elite Grande Écoles and generous student housing support (CAF).',
            },
            {
              eyebrow: 'Ireland',
              title: 'The Silicon Valley of Europe',
              text: 'Exceptional opportunities in IT, Pharma, and Finance with a 2-year post-study work visa.',
            },
            {
              eyebrow: 'Netherlands',
              title: 'The logistics leader',
              text: '95% English-speaking population and a world-class research environment.',
            },
            {
              eyebrow: 'Finland & Sweden',
              title: 'The innovation frontiers',
              text: 'Pioneers in Sustainability, Design, and Technology.',
            },
          ],
        },
      ],
    },
    {
      label: 'Featured universities',
      title: 'Featured universities by country',
      blocks: [
        {
          type: 'table',
          columns: ['Country', 'Why study here?', 'Featured universities'],
          rows: [
            [
              'Germany',
              'Tuition-free public education & 18-month stay back.',
              'Constructor University (Bremen)\nSRH University (Berlin, Heidelberg)\nInternational School of Management (ISM)\nEU Business School (Munich)',
            ],
            [
              'France',
              'Hub for Luxury, Fashion & Business. Housing subsidy (CAF) available.',
              'SKEMA Business School\nNEOMA Business School\nINSEEC Business School\nECE Engineering School (Paris)',
            ],
            [
              'Ireland',
              'The “Silicon Valley of Europe” with a 2-year post-study work visa.',
              'Trinity College Dublin\nUniversity College Dublin (UCD)\nUniversity of Limerick\nDublin City University (DCU)',
            ],
            [
              'Netherlands',
              '95% English-speaking & top-ranked research universities.',
              'University of Twente\nTilburg University\nWittenborg University of Applied Sciences',
            ],
            [
              'Sweden',
              'Innovation & Sustainability leader with 1-year stay back.',
              'Linnaeus University\nHalmstad University\nUniversity of Skövde\nDalarna University',
            ],
            [
              'Finland',
              'World’s happiest country with high-tech education ecosystem.',
              'LUT University\nMetropolia University of Applied Sciences\nSatakunta University of Applied Sciences (SAMK)',
            ],
            ['Poland', 'Extremely affordable living & tuition fees.', 'Warsaw University of Business'],
          ],
        },
      ],
    },
    {
      label: 'Your success partner',
      title: 'UEMS Ventures: your European success partner',
      intro: 'Applying to Europe is about more than just a form; it’s about a perfect strategy. We provide:',
      blocks: [
        {
          type: 'split',
          image: { name: 'eu-admission', alt: 'Student reading an admissions booklet outdoors' },
          bullets: [
            '**Precision country selection:** we match your profile to the country with the best job prospects for your field',
            '**Scholarship maximization:** we help you secure merit-based waivers from 20% to 100%',
            '**Visa mastery:** specialized support for **blocked accounts** and complex documentation',
            '**Family orientation:** expert guidance on dependent visas and spouse work rights',
          ],
        },
        {
          type: 'callout',
          title: 'Ready to launch your global career?',
          text: `Direct line: ${site.phones[0].display} | ${site.phones[1].display} · Email: ${site.email}`,
          actions: [
            { label: 'Contact us', to: '/contact-us' },
            { label: 'Call now', to: site.phones[0].href },
          ],
        },
      ],
    },
    enquirySection('Talk to the experts'),
  ],
};

export default page;
