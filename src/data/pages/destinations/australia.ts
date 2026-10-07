import { enquirySection, partnerSection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-australia',
  meta: {
    title: 'Study in Australia – Eligibility, Courses & Visa',
    description:
      'Why study in Australia: quality education, up to 3 years of post-study work rights, requirements, accommodation costs, scholarships and the subclass 500 student visa, with UEMS Ventures.',
  },
  hero: {
    eyebrow: 'Study in Australia',
    title: 'Why study in Australia? Eligibility & courses',
    lead: [
      'Australia has much more to offer than the usual expectations. Many international students are choosing to study in Australia because of its friendly, laid-back nature, excellent education system, and high standard of living, and the support provided by education consultants.',
    ],
    actions: [
      { label: 'Talk to an expert', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'au-hero', alt: 'International students gathered in front of the Australian flag' },
  },
  sections: [
    {
      label: 'Why Australia',
      title: 'A land of abundance for international students',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              title: 'Great weather condition',
              text: 'Australia is a land of abundance: abundance of sun, abundance of green pastures, abundance of fresh air, abundance of minerals and it doesn’t just end there.',
            },
            {
              title: 'Quality education',
              text: 'For international students Australia offers a globally recognised education with renowned facilities and educators. It offers quality study options and an excellent lifestyle.',
            },
            {
              title: 'Affordable education',
              text: 'There’s almost nothing that Australia does not have… some of the best universities in the world with affordable education. It is home to over 800,000 international students and the numbers of students each year are growing.',
            },
          ],
        },
      ],
    },
    {
      label: 'What Australia offers',
      title: 'What Australia offers to international students',
      intro: 'Many universities and programs in various fields to choose from. Top 8 out of 100 universities are in Australia.',
      blocks: [
        {
          type: 'split',
          image: { name: 'city-australia', alt: 'Sydney Opera House and harbour skyline' },
          bullets: [
            'No application fees in most of the institutes',
            'No visa interviews',
            'Pathway programs eventually helping you get the degree you aspire',
            'Up to 3 years of post-study work rights',
            'Higher minimum wages than other countries',
            'Options to study courses that lead to permanent residency',
          ],
        },
      ],
    },
    partnerSection,
    {
      label: 'Requirements',
      title: 'Requirements to study in Australia',
      layout: 'aside',
      blocks: [
        {
          type: 'table',
          caption: 'Academic and English requirements',
          columns: ['Level of education', 'Min aggregate score', 'IELTS'],
          rows: [
            ['Bachelors Degree', '60–65% in year 12 with best 4 subjects', '6.5, no band less than 6.0'],
            ['Masters Degree', '55% and above in UG', '6.0 – 6.5'],
          ],
        },
      ],
    },
    {
      label: 'Costs',
      title: 'Cost of studying in Australia',
      layout: 'aside',
      intro:
        'The entire cost of studying in Australia isn’t just the tuition cost but many other factors: accommodation, student visa cost, airfares and the availability of scholarships.',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            '**If studying abroad is planned with utmost details, then it can be affordable for everyone.**',
            'In Australia most universities offer on-campus accommodation, but it is not mandatory to live there. A student can choose between the various accommodation choices given below. These are indicative costs and they vary from city to city. UEMS provides you with full assistance on where to live and how to choose the accommodation before you land in the country.',
            '**Most of the students end up sharing** an apartment or a house with other students, which helps reduce the expenses.',
          ],
        },
        {
          type: 'table',
          caption: 'Accommodation in Australia',
          columns: ['Accommodation type', 'Expenses (indicative)'],
          rows: [
            ['Hostels and Guesthouses', '$90 to $150 per week'],
            ['Shared Rental', '$95 to $215 per week'],
            ['On-campus', '$110 to $280 per week'],
            ['Homestay', '$235 to $325 per week'],
            ['Rental', '$185 to $440 per week'],
            ['Boarding schools', '$11,000 to $22,000 a year'],
          ],
          note: 'Source: [studyinaustralia.gov.au](https://www.studyinaustralia.gov.au/english/live-in-australia/living-costs). Tuition fees depend on the course a student chooses.',
        },
      ],
    },
    {
      label: 'Scholarships',
      title: 'Scholarships to study abroad in Australia',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'Australia offers many scholarships which make the study abroad decision much more affordable and accessible. Scholarships are offered on the basis of academics and differ with each institute depending on the student’s profile. They range from $2,000 up to 100% of the tuition fee. Most Australian universities and colleges also have their own list of scholarships for Indian students which can be shared when a student enquires with UEMS.',
          ],
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'Government',
              title: 'Australian Government Scholarships',
              text: 'Australian government scholarships are offered for full-time study in Australia for undergraduate, Masters or technical courses. Students are advised to apply a year in advance after receiving an offer from the respective Australian university.',
            },
            {
              eyebrow: 'International organisations',
              title: 'Organisations providing scholarships for Australia',
              bullets: [
                'Rotary Peace Fellows',
                'Aga Khan Foundation International Scholarship',
                'CSIRO PG Scholarship Programme',
                'OFID Scholarship Award',
                'Flowers Across Melbourne Scholarship – for design, technology and agriculture students',
                'The Australian Government is preparing programme guidelines for the new Indigenous Students Support Program (ISSP)',
              ],
            },
          ],
        },
        {
          type: 'prose',
          paragraphs: ['This is in no way an exhaustive list; there are many more scholarships.'],
        },
      ],
    },
    {
      label: 'Student visa',
      title: 'Australia student visa (subclass 500)',
      layout: 'aside',
      intro: 'Are you a student who has all the relevant documentation ready and can now apply for your student visa?',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'This visa will entitle you to travel and stay in Australia for up to 5 years, in line with your enrolment. The Australian government cost for the visa is AUD 620 per person. As a student you will be eligible to invite your spouse and your child. You and your family must meet all the visa conditions and follow Australian laws.',
          ],
        },
        {
          type: 'checklist',
          title: 'Study visa documents checklist',
          columns: 2,
          items: [
            'Student visa application form',
            'Passport details of the applicant',
            'Certificate of Enrolment (COE) or Letter of Offer (LoO)',
            'Financial proofs',
            'Overseas Student Health Cover proof',
            'English language test results',
            'Passport size photographs',
            'Health & character records',
          ],
        },
        {
          type: 'actions',
          items: [{ label: 'Consult the UEMS team', to: '/contact-us' }],
        },
      ],
    },
    enquirySection(),
  ],
};

export default page;
