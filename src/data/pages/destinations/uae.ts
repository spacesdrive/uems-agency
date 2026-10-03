import { enquirySection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-uae',
  meta: {
    title: 'Study in UAE from India – Top Universities, Courses & Visa Guide',
    description:
      'Study in Dubai with UEMS Ventures: why study in the UAE, top universities, popular courses, admission requirements, costs and the UAE student visa process.',
  },
  hero: {
    eyebrow: 'Study in UAE – Dubai',
    title: 'Study in UAE – Dubai: your gateway to global success',
    lead: [
      'The United Arab Emirates, and Dubai in particular, has rapidly emerged as a premier global destination for international students. Combining world-class education with a high-growth economy, Dubai offers a unique blend of academic excellence and professional opportunity.',
      'Whether you are looking for local institutional excellence or branch campuses of top Western universities, Dubai provides a safe, multicultural, and tax-free environment to launch your career.',
    ],
    actions: [
      { label: 'Talk to the experts', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'city-uae', alt: 'Dubai waterfront architecture at sunset' },
  },
  sections: [
    {
      label: 'Why Dubai',
      title: 'Why study in UAE – Dubai?',
      intro: 'Dubai is more than just a tourist destination; it is a global hub for innovation and education.',
      blocks: [
        {
          type: 'cards',
          columns: 4,
          items: [
            { title: 'World-class infrastructure', text: 'Access to state-of-the-art campuses and research facilities.' },
            {
              title: 'No age barrier',
              text: 'Dubai has no upper age limit for student visas. Whether a student is 18 or 50, they can secure a residence visa as long as they meet the university’s academic entry requirements.',
            },
            {
              title: 'Liberal policy on study gaps',
              text: 'Study gaps are not an issue in Dubai. The focus is placed on the student’s current academic merit and professional experience rather than how many years have passed since their last qualification.',
            },
            { title: 'Global branch campuses', text: 'Earn degrees from top UK, US, and Australian universities right in the heart of the Middle East.' },
            {
              title: 'Parent campus transfers',
              text: 'Students at branch campuses (UK, Australia, USA) can transfer to the parent campus after finishing one academic year of their undergraduate course, depending on their scores.',
            },
            { title: 'Cultural diversity', text: 'Join a student community from over 150 nationalities.' },
            { title: 'Career growth', text: 'High demand for skilled professionals in Finance, Engineering, Tourism, and Tech.' },
            { title: 'Safety & lifestyle', text: 'Ranked among the safest cities in the world with an unparalleled cosmopolitan lifestyle.' },
          ],
        },
      ],
    },
    {
      label: 'Universities',
      title: 'Top universities & colleges in Dubai',
      layout: 'aside',
      intro:
        'Dubai hosts the “International Academic City” and “Knowledge Village,” housing some of the world’s most prestigious institutions:',
      blocks: [
        {
          type: 'checklist',
          columns: 2,
          items: [
            'University of Birmingham Dubai Campus',
            'University of Wollongong Dubai (UOWD)',
            'Heriot-Watt University Dubai',
            'Instituto Marangoni, Dubai',
            'Curtin University Dubai',
            'Middlesex University Dubai',
            'Rochester Institute of Technology (RIT) Dubai',
            'Emirates Aviation University, Dubai Campus',
            'University of Europe for Applied Sciences, Dubai',
            'American University of Ras Al Khaimah, Dubai Campus',
          ],
        },
      ],
    },
    {
      label: 'Courses',
      title: 'Popular courses to study',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            { eyebrow: 'Business & Management', title: 'MBA, Finance, International Business' },
            { eyebrow: 'Engineering', title: 'Civil, Mechanical, and Aerospace Engineering' },
            { eyebrow: 'Information Technology', title: 'Cyber Security, Data Science, and AI' },
            { eyebrow: 'Tourism & Hospitality', title: 'Event Management and Hotel Management' },
            { eyebrow: 'Architecture & Design', title: 'Interior Design and Urban Planning' },
          ],
        },
      ],
    },
    {
      label: 'Admissions',
      title: 'Admission requirements',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Intakes',
              title: 'Two intakes a year',
              bullets: ['**Fall (September):** major intake for all programs', '**Spring (January):** secondary intake for select courses'],
            },
            {
              eyebrow: 'Eligibility',
              title: 'Academic entry',
              bullets: [
                '**Undergraduate:** minimum 70% in Grade 12 (HSC)',
                '**Postgraduate:** minimum GPA of 3.0 on a 4.0 scale (approx. 60%+)',
              ],
            },
            {
              eyebrow: 'English proficiency',
              title: 'IELTS (5.5 – 6.5) or TOEFL',
              text: 'Many universities give an IELTS waiver by accepting Medium of Instruction (MOI) certificates if your previous education was in English.',
            },
          ],
        },
      ],
    },
    {
      label: 'Costs',
      title: 'Cost of education & living',
      layout: 'aside',
      blocks: [
        {
          type: 'table',
          columns: ['Category', 'Estimated cost (annual)'],
          rows: [
            ['Tuition (Undergraduate)', 'AED 35,000 – AED 65,000'],
            ['Tuition (Postgraduate)', 'AED 45,000 – AED 85,000'],
            ['Living expenses', 'AED 3,000 – AED 6,000 (monthly)'],
          ],
        },
      ],
    },
    {
      label: 'Student visa',
      title: 'UAE student visa process',
      intro: 'Securing a visa for Dubai is efficient and streamlined.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Student residence visa', text: 'The student visa is granted for one year and is to be renewed every year.' },
            { title: 'Part-time work', text: 'Students are permitted to work part-time in designated sectors with university approval.' },
            {
              title: 'Entry permit vs. visa',
              text: 'Students first receive an **entry permit** to enter Dubai, and the actual residence visa is granted at the airport’s visa office.',
            },
          ],
        },
      ],
    },
    {
      label: 'How we help',
      title: 'How UEMS Ventures can help you',
      layout: 'aside',
      intro: 'At UEMS Ventures, we simplify your journey to Dubai. Our expert counsellors provide end-to-end support:',
      blocks: [
        {
          type: 'checklist',
          items: [
            '**Personalized counselling:** selecting the right university and course based on your profile',
            '**Application management:** handling documentation, SOPs, and LORs to ensure high acceptance rates',
            '**Scholarship assistance:** identifying merit-based scholarships to reduce your financial burden',
            '**Visa guidance:** navigating the GDRFA portal and medical insurance requirements',
            '**Post-arrival support:** assistance with accommodation, airport pickup, and local orientation',
          ],
        },
        { type: 'actions', items: [{ label: 'Contact us', to: '/contact-us' }] },
      ],
    },
    enquirySection('Talk to the experts'),
  ],
};

export default page;
