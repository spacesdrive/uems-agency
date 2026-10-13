import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/global-profile-accelerator',
  meta: {
    title: 'Global Profile Accelerator (GPA) – Mentor-Led Profile Building',
    description:
      'The UEMS Global Profile Accelerator is a personalized, mentor-led program that helps students build real-world credentials, develop career skills and craft a standout application for top Indian and global universities.',
  },
  hero: {
    eyebrow: 'Global Profile Accelerator (GPA)',
    title: 'Turn your interests into a compelling story',
    lead: [
      'Connecting your academic interests, projects, and future career goals into a compelling story.',
      'Whether you are aiming for top-tier undergraduate programs or preparing for a Master’s degree, academic grades alone won’t set you apart. Leading institutions across India and around the globe, from premier private universities to elite international campuses, look for candidates who demonstrate clarity, hands-on skill, and proven impact.',
      'The **Global Profile Accelerator (GPA)** is a personalized, mentor-led program designed to help you build real-world credentials, develop essential career skills, and craft a standout application.',
    ],
    actions: [
      { label: 'Register for free counselling', to: '#register' },
      { label: 'What the program offers', to: '#offers', variant: 'outline' },
    ],
    image: { name: 'svc-gpa', alt: 'UEMS counsellor guiding a parent and student one-on-one' },
  },
  sections: [
    {
      label: 'Why it matters',
      title: 'Why profile building matters',
      intro: 'Admissions committees and future employers evaluate more than just test scores. They look for:',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          numbered: true,
          items: [
            { title: 'Passion', text: 'Genuine curiosity in your field.' },
            { title: 'Skills', text: 'Problem-solving, project execution, and communication.' },
            { title: 'Outcomes', text: 'Showing initiative and leadership.' },
          ],
        },
      ],
    },
    {
      id: 'offers',
      label: 'What the GPA program offers',
      title: 'What the GPA program offers',
      intro:
        'Through one-to-one expert mentorship, the GPA program guides you through every stage of profile strategy and application preparation:',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Personal Profile Strategy & Gap Analysis',
              text: 'Our experienced mentors evaluate your current academic and extra-curricular standing, identify key areas for growth, and build a customized action plan aligned with your target universities and field of study.',
            },
            {
              title: 'Guidance on Projects',
              text: 'Depending on the countries you are applying to, mentors guide you on spike or holistic projects.',
            },
            {
              title: 'Leadership & Practical Skill Development',
              text: 'Build core competencies that matter for university admissions and long-term career growth, including project management, research, personal branding, and communication.',
            },
            {
              title: 'End-to-End Application & Personal Branding',
              text: 'Translate your achievements into a powerful application package. Receive guidance on crafting standout Statements of Purpose (SOPs), professional international-format resumes, and optimized LinkedIn profiles.',
            },
          ],
        },
      ],
    },
    {
      label: 'Who it’s for',
      title: 'Who is this for?',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              eyebrow: 'High school students',
              title: 'Undergraduate Applicants',
              text: 'Build early clarity, explore career pathways, and create a strong foundation for top Indian and global university admissions.',
            },
            {
              eyebrow: 'University students & professionals',
              title: 'Master’s Applicants',
              text: 'Deepen domain specialization, demonstrate practical skills, and build a competitive edge for advanced degree programs.',
            },
          ],
        },
      ],
    },
    {
      id: 'register',
      label: 'Get started',
      title: 'Ready to build an application that stands out?',
      intro: 'Take the first step toward your global education and career goals with personalized guidance tailored to your path.',
      layout: 'aside',
      blocks: [{ type: 'registration' }],
    },
  ],
};

export default page;
