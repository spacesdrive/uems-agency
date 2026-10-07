import { enquirySection, partnerSection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/studyincanada',
  meta: {
    title: 'Study in Canada – Requirements, Costs & Visa',
    description:
      'Study in Canada with UEMS Ventures: what Canada offers international students, estimated study costs, popular scholarships and the SDS and General student visa streams.',
  },
  hero: {
    eyebrow: 'Study in Canada',
    title: 'Study in Canada – requirements & benefits',
    lead: [
      'Canada is a land of majestic mountains and green forests that extends to bustling cities with vast and amazing features. It is known to have more lakes than any other place in the world, and has been considered one of the best places to live by the United Nations for its healthy and safe communities.',
      'Canada offers quality and affordable education which is recognised globally, attracting a large number of students every year. 26 of Canada’s universities rank in the QS World University Rankings 2019 and 27 of them in The World University Rankings 2019.',
    ],
    actions: [
      { label: 'Book a consultation', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'ca-hero', alt: 'Smiling international students on a Canadian campus' },
  },
  sections: [
    {
      label: 'What Canada offers',
      title: 'What Canada offers to international students',
      blocks: [
        {
          type: 'split',
          image: { name: 'city-canada', alt: 'Toronto skyline with the CN Tower' },
          bullets: [
            'Three Canadian universities are ranked among the top 100 universities in the world',
            'Plenty of research opportunities',
            'Uncompromised quality of education in universities and colleges',
            'Affordable tuition fees compared to any other country',
            '3 years of post-study work rights for a 2-year course',
            'Possibility of permanent residency',
          ],
        },
        {
          type: 'tags',
          title: 'Popular courses',
          items: ['Business', 'Architecture', 'Data Analysis', 'Nursing', 'HR Management', 'Artificial Intelligence'],
        },
      ],
    },
    partnerSection,
    {
      label: 'Study costs',
      title: 'Estimated study cost for Canada',
      layout: 'aside',
      intro:
        'Course costs vary every year and also depend on the institute a student chooses for enrolment. Living cost also depends on where a student decides to stay and the type of accommodation chosen.',
      blocks: [
        {
          type: 'table',
          caption: 'Indicative annual tuition',
          columns: ['Program', 'Tuition per year'],
          rows: [
            ['Undergraduate degree', 'CAD $13,000 – CAD $20,000'],
            ['Masters program', 'CAD $17,000 – CAD $25,000'],
            ['Doctoral degree', 'CAD $7,000 – CAD $15,000'],
            ['MBA program', 'CAD $30,000 – CAD $40,000'],
          ],
          note: 'The total cost is calculated on the basis of many factors. Tuition cost varies for each course.',
        },
      ],
    },
    {
      label: 'Scholarships',
      title: 'Scholarships in Canada',
      intro:
        'Scholarships in Canada are quite competitive as they are very limited, unlike countries such as Australia, the USA and the UK. The eligibility criteria are an outstanding academic background and exceptional English proficiency scores.',
      blocks: [
        {
          type: 'checklist',
          title: 'Popular scholarships',
          columns: 2,
          items: [
            'PEO International Peace Scholarships for Women',
            'Dalhousie University Scholarship',
            'University of Saskatchewan International Students Awards',
            'York University International Student Scholarship',
            'University of Waterloo',
            'Lakehead University',
            'Brock – UG Entrance Scholarship',
            'Trent International Global Citizen Scholarships and Awards',
          ],
        },
      ],
    },
    {
      label: 'Student visa',
      title: 'Canada student visa',
      intro: 'Are you ready to go? The student visa process for Canada includes an SDS stream and a General stream.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'Stream 01',
              title: 'SDS visa',
              text: 'A streamlined visa process with minimal financial documents and a much faster visa turnaround time. All it requires is:',
              bullets: [
                'IELTS score of 6.0 band for each ability',
                'Purchasing a GIC of CAD $10,000 to cover living expenses',
                'Proof of payment of 1 year’s fees',
              ],
            },
            {
              eyebrow: 'Stream 02',
              title: 'General visa',
              text: 'The requirements for a general student visa application are the same as the SDS category except the GIC requirement: English language test, admission process completion (LOA, tuition fees), GIC, medical, and biometrics.',
            },
          ],
        },
        { type: 'actions', items: [{ label: 'Book a consultation now', to: '/contact-us' }] },
      ],
    },
    enquirySection(),
  ],
};

export default page;
