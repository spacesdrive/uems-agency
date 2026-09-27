import { enquirySection } from '../../shared';
import type { ContentPageData } from '../../types';

const page: ContentPageData = {
  path: '/study-in-new-zealand',
  meta: {
    title: 'Study in New Zealand from India – Universities, Courses & Student Visa',
    description:
      'Study in New Zealand with UEMS Ventures: why students choose New Zealand, popular courses, work rights, our step-by-step process and student visa guidance.',
  },
  hero: {
    eyebrow: 'Study in New Zealand',
    title: 'Study in New Zealand: your gateway to global success',
    lead: [
      'New Zealand is one of the most sought-after study destinations for international students, known for its high academic standards, globally recognised qualifications, and excellent post-study work opportunities. It blends picturesque landscapes with top educational offerings and strong student support systems, making it ideal for international scholars.',
      'At **UEMS**, we guide you through every step of your journey, from choosing the right course to successfully starting your life in New Zealand.',
    ],
    actions: [
      { label: 'Book a free consultation', to: '#enquire' },
      { label: 'Contact us', to: '/contact-us', variant: 'outline' },
    ],
    image: { name: 'city-nz', alt: 'Auckland waterfront and skyline in New Zealand' },
  },
  sections: [
    {
      label: 'Why New Zealand',
      title: 'Why students are choosing New Zealand',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Why students are choosing New Zealand',
              bullets: [
                'Globally recognized degrees and hands-on learning models',
                'Post-study work rights and career opportunities',
                'Safe, friendly, and welcoming campuses',
              ],
            },
            {
              title: 'UEMS Ventures support includes',
              bullets: [
                'Tailored course & institution guidance',
                'Application tracking & documentation support',
                'Visa filing and interview guidance',
                'Pre-departure orientation & accommodation support',
              ],
            },
            {
              title: 'Popular fields',
              bullets: ['IT & Computer Science', 'Environmental Studies', 'Business & Entrepreneurship', 'Healthcare & Allied Sciences'],
            },
          ],
        },
      ],
    },
    {
      label: 'Popular courses',
      title: 'Popular courses in New Zealand',
      intro: 'UEMS helps students apply to a wide range of programs, including:',
      blocks: [
        {
          type: 'tags',
          items: [
            'Healthcare & Allied Health Programs',
            'Business & Management',
            'Information Technology & Data Science',
            'Engineering & Construction',
            'Hospitality & Tourism',
            'Education & Social Sciences',
          ],
        },
        { type: 'prose', paragraphs: ['We help you choose courses aligned with your career goals and global mobility plans.'] },
      ],
    },
    {
      label: 'Why study here',
      title: 'Why study in New Zealand?',
      layout: 'aside',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Globally recognised universities & institutions',
              text: 'All New Zealand qualifications are regulated by the New Zealand Qualifications Authority (NZQA) and recognised worldwide.',
            },
            {
              title: 'High quality of life & safety',
              text: 'New Zealand consistently ranks among the safest and most peaceful countries in the world.',
            },
            {
              title: 'Work while you study',
              text: 'International students can work up to **20 hours per week** during studies and full-time during scheduled breaks.',
            },
            {
              title: 'Post-study work opportunities',
              text: 'Eligible graduates can apply for post-study work visas, opening pathways to international work experience and long-term settlement options.',
            },
            {
              title: 'Industry-focused education',
              text: 'Courses emphasise practical learning, research, and real-world application.',
            },
          ],
        },
      ],
    },
    {
      label: 'Our process',
      title: 'Our step-by-step process',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Free profile assessment' },
            { title: 'Course & institution shortlisting' },
            { title: 'Application submission' },
            { title: 'Offer letter & acceptance' },
            { title: 'Visa documentation & filing' },
            { title: 'Pre-departure orientation' },
            { title: 'Ongoing student support' },
          ],
        },
      ],
    },
    {
      label: 'Visa & work rights',
      title: 'Student visa & work rights',
      layout: 'aside',
      blocks: [
        {
          type: 'checklist',
          items: [
            'New Zealand student visas allow part-time work during study',
            'Post-study work options depend on course level and duration',
            'Clear visa pathways with regulated immigration policies',
          ],
        },
        { type: 'prose', paragraphs: ['Our team ensures your application meets **all immigration and compliance requirements**.'] },
        {
          type: 'callout',
          title: 'Start your New Zealand journey today',
          text: 'Whether you’re a student, graduate, or working professional, **UEMS** is here to guide you towards a globally rewarding education in New Zealand.',
          actions: [{ label: 'Book a free consultation', to: '/contact-us' }],
        },
      ],
    },
    enquirySection('Talk to the experts'),
  ],
};

export default page;
