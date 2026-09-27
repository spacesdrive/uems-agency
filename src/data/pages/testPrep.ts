import { enquirySection } from '../shared';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/test-preparation-for-international-students',
  meta: {
    title: 'Test Prep for International Students – GMAT, GRE, IELTS, PTE, SAT & TOEFL',
    description:
      'Online coaching with UEMS Ventures for GMAT, GRE, SAT, IELTS, PTE and TOEFL — exam formats, score validity and fees at a glance, plus answers to common questions.',
  },
  hero: {
    eyebrow: 'Test preparation for studying abroad',
    title: 'Get the coaching you need to ace your external exam',
    lead: [
      'Welcome to our online coaching platform. Our expert instructors will guide you through test preparation for studying abroad. With a focus on the GRE, GMAT, IELTS, PTE, SAT, ACT, and TOEFL, we’ll optimize your performance.',
      'We will ensure outstanding scores and increased chances of admission to top universities. Start your journey today and unlock a world of opportunities!',
    ],
    actions: [
      { label: 'Enroll now', to: '#enquire' },
      { label: 'IELTS training', to: '/ielts', variant: 'outline' },
    ],
    image: { name: 'tp-hero', alt: 'Students preparing for exams together on a laptop' },
  },
  sections: [
    {
      label: 'Online coaching',
      title: 'Online coaching for a variety of external exams',
      intro: 'Our team of experienced tutors will help you achieve your dream of studying abroad.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Business school',
              title: 'GMAT coaching',
              text: 'Stand out in the highly competitive business school admissions process. Our program covers quantitative reasoning, verbal reasoning, integrated reasoning, and analytical writing, providing you with the tools to ace the GMAT and gain admission to top business schools.',
              action: { label: 'Start your GMAT prep', to: '#enquire' },
            },
            {
              eyebrow: 'Graduate studies',
              title: 'GRE coaching',
              text: 'Prepare for your graduate-level studies abroad with our comprehensive GRE program. Our expert instructors will guide you through the verbal reasoning, quantitative reasoning, and analytical writing sections, equipping you with the skills to excel.',
              action: { label: 'Start your GRE prep', to: '#enquire' },
            },
            {
              eyebrow: 'College admission',
              title: 'SAT coaching',
              text: 'Prepare for college admission with our SAT online coaching program. Our expert instructors will guide you through the maths, reading and writing sections of the SAT, equipping you with the skills and strategies to achieve your best possible score.',
              action: { label: 'Start your SAT prep', to: '#enquire' },
            },
            {
              eyebrow: 'English proficiency',
              title: 'IELTS coaching',
              text: 'Achieve your desired English language proficiency score. Our experienced instructors will help you develop your listening, reading, writing, and speaking skills, enabling you to demonstrate your language abilities effectively.',
              action: { label: 'Start your IELTS prep', to: '#enquire' },
            },
            {
              eyebrow: 'English proficiency',
              title: 'PTE coaching',
              text: 'Excel in the PTE exam with our comprehensive online coaching program. Our expert instructors will guide you through the speaking, writing, listening, and reading sections, helping you achieve your desired PTE score.',
              action: { label: 'Start your PTE prep', to: '#enquire' },
            },
            {
              eyebrow: 'English proficiency',
              title: 'TOEFL coaching',
              text: 'Demonstrate your English language proficiency. Our experienced instructors will guide you through the reading, listening, speaking, and writing sections, helping you achieve your desired TOEFL score and gain admission to English-speaking institutions.',
              action: { label: 'Start your TOEFL prep', to: '#enquire' },
            },
          ],
        },
      ],
    },
    {
      label: 'At a glance',
      title: 'External exams at a glance',
      intro: 'Everything you need to know about external exams, in one place. Connect with us to find out the latest fees for each of these exams.',
      blocks: [
        {
          type: 'table',
          columns: ['Exam', 'Format', 'Levels', 'Score validity', 'Exam fees (INR)'],
          rows: [
            ['Graduate Record Exam (GRE)', 'Verbal Reasoning, Quantitative Reasoning, and Analytical Writing', 'Postgraduate', '5 years', '22,550 (General Test), 14,550 (Subject Test)'],
            ['Graduate Management Admission Test (GMAT)', 'Quantitative Reasoning, Verbal Reasoning, and Analytical Writing', 'Postgraduate', '5 years', '23,000 – 25,000'],
            ['Scholastic Aptitude Test (SAT)', 'Reading, Writing and Language, and Math', 'Undergraduate', '5 years', '11,000 – 12,000'],
            ['International English Language Testing System (IELTS)', 'Listening, Reading, Writing, and Speaking', 'Undergraduate and Postgraduate', '2 years', '18,000'],
            ['Pearson Test of English (PTE)', 'Listening, Reading, Writing, and Speaking', 'Undergraduate and Postgraduate', '2 years', '17,000'],
            ['Test of English as a Foreign Language (TOEFL)', 'Reading, Listening, Speaking, and Writing', 'Undergraduate and Postgraduate', '2 years', '18,000'],
          ],
        },
      ],
    },
    {
      label: 'Why choose us',
      title: 'Why choose us for your external exam',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            {
              title: 'Expert instructors',
              text: 'Benefit from the guidance of experienced instructors who possess in-depth knowledge of the exams and can provide effective strategies and personalized instruction.',
            },
            {
              title: 'Comprehensive study materials',
              text: 'Access a wealth of carefully curated study materials, including video lessons, interactive exercises, and practice tests, designed to cover all exam sections comprehensively.',
            },
            {
              title: 'Personalized approach',
              text: 'Receive tailored coaching that addresses your specific needs, allowing you to focus on areas that require improvement and maximize your score potential.',
            },
          ],
        },
      ],
    },
    {
      label: 'FAQ',
      title: 'Frequently asked questions',
      layout: 'aside',
      intro: 'Get answers to commonly asked questions about our coaching program.',
      blocks: [
        {
          type: 'faq',
          items: [
            {
              question: 'How does the online coaching program work?',
              answer:
                'Our online coaching program provides comprehensive study materials, expert instruction, and personalized guidance through a user-friendly online platform. You can access video lessons, practice tests, and additional resources at your own pace, while receiving support from our experienced instructors.',
            },
            {
              question: 'Can I enroll in multiple exam coaching programs?',
              answer:
                'Yes, you can enroll in multiple exam coaching programs based on your study abroad requirements and goals. Each program is designed to specifically target the skills and knowledge needed for that particular exam.',
            },
            {
              question: 'How long is the coaching program?',
              answer:
                'The duration of the coaching program varies depending on the exam and your individual progress. Our programs are flexible, allowing you to study at your own pace and adapt the timeline to fit your needs.',
            },
            {
              question: 'Are the practice tests similar to the actual exams?',
              answer:
                'Yes, our practice tests are designed to closely resemble the format, difficulty level, and question types of the actual exams. By practicing with these tests, you can familiarize yourself with the exam structure and improve your performance.',
            },
            {
              question: 'Do you provide support and feedback during the coaching program?',
              answer:
                'Absolutely! Our instructors are available to provide support, clarify doubts, and offer personalized feedback throughout the coaching program. You can reach out to them via email, discussion forums, or other designated channels.',
            },
            {
              question: 'Is there any prerequisite knowledge required to enroll in the coaching programs?',
              answer:
                'While some exams may have recommended prior knowledge, our coaching programs are designed to cater to both beginners and those with prior familiarity with the subject matter. Our instructors will guide you from the basics to advanced concepts.',
            },
          ],
        },
      ],
    },
    {
      ...enquirySection('Enroll now'),
      title: 'Ready to excel in your external exams?',
      intro:
        'Enroll in our online coaching program today & embark on your journey to success! GMAT, GRE, IELTS, PTE, SAT and TOEFL online coaching.',
      blocks: [{ type: 'enquiry', preset: 'coaching' }],
    },
  ],
};

export default page;
