import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/about-us',
  meta: {
    title: 'About Us – 15+ Years of Expertise',
    description:
      'UEMS Ventures has a clear “You First” policy. Meet our Mumbai and Sydney teams and associates, and learn how we have guided 3000+ students to universities around the world.',
  },
  hero: {
    eyebrow: 'About us',
    title: 'We at UEMS have a clear “You First” policy',
    lead: [
      'Our clients’ needs and satisfaction are our top priority. It gives our team immense pleasure to leave our clients feeling empowered and happy with the choice they make — be it choosing where and what to study, or migrating to a different part of the world.',
    ],
    actions: [
      { label: 'Talk to our team', to: '/contact-us' },
      { label: 'Meet the team', to: '#team', variant: 'outline' },
    ],
    image: { name: 'about-shalini', alt: 'Shalini Menon presenting a career counselling session to students' },
    facts: [
      { value: '15+ yrs', label: 'Of student counselling experience' },
      { value: '3000+', label: 'Students placed in Australia and Canada' },
      { value: '3', label: 'Continents — offices in India, Australia and Canada' },
    ],
  },
  sections: [
    {
      label: 'Organised by design',
      blocks: [
        {
          type: 'quote',
          text: 'Organising is what you do before you do something, so that when you do it, it’s not all mixed up.',
          cite: 'A. A. Milne',
        },
        {
          type: 'prose',
          size: 'lead',
          paragraphs: [
            'The UEMS team organises your application file for study abroad and migration very systematically, leaving no place for errors, so that the results are clear and precise.',
          ],
        },
      ],
    },
    {
      label: 'Who we are',
      title: 'Unique for a reason',
      layout: 'aside',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'We help students and professionals fulfil their dreams and optimise their potential by connecting them with education and migration opportunities globally. We also help students and young professionals explore their strengths and pick the best career path through our career interest / aptitude test, [Eval](https://www.evaltest.com).',
            'We not only guide students to make the best educational and career choices, but hold their hand and support them as they fulfil their dream of studying abroad. We specialise in helping students study abroad in [Australia](/study-in-australia), [Canada](/studyincanada), Germany, [Ireland](/study-in-uk-ireland), New Zealand, Russia, the [UK](/study-in-uk-ireland), and the [USA](/study-in-usa).',
            'Our honesty, commitment to doing our best for our clients, and nearly two decades of student counselling experience make us incomparable in our field. We are called Unique for a reason, and we live up to our name!',
          ],
        },
        {
          type: 'gallery',
          items: [
            { name: 'about-meet', alt: 'UEMS Ventures student meet in a packed classroom' },
            { name: 'team-1', alt: 'UEMS counsellors working with a student' },
            { name: 'team-3', alt: 'UEMS team in a counselling session' },
          ],
        },
      ],
    },
    {
      label: 'Purpose',
      title: 'Our goals, mission and vision',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Our goals',
              title: 'Aim higher, dare to aspire',
              bullets: [
                'Transform the lives of students and professionals who aim higher and dare to aspire for a better education and life.',
                'Empower students and professionals with honest and accurate advice about career guidance, education abroad, and migration.',
                'Exceed client expectations and ensure they are content with the services provided to them.',
              ],
              action: { label: 'Career guidance', to: '/career-guidance' },
            },
            {
              eyebrow: 'Mission',
              title: 'Discovering your path',
              text: 'To assist students and professionals in their journey of discovering their path through career guidance, study abroad and migration counseling.',
              action: { label: 'Study abroad', to: '/study-abroad-consultants' },
            },
            {
              eyebrow: 'Vision',
              title: 'Designing your destiny',
              text: 'To make every individual aware of their potential and design their destiny accordingly.',
              action: { label: 'Migration', to: '/migration' },
            },
          ],
        },
      ],
    },
    {
      id: 'team',
      label: 'Our team',
      title: 'The people behind your application',
      blocks: [
        {
          type: 'people',
          items: [
            { name: 'Shalini Menon', role: 'CEO, Founder', credentials: 'B.Sc. IT (UTS Sydney), MCSE, DipBow', image: 'person-shalini' },
            { name: 'Disha Shah', role: 'Student Counselor', credentials: 'BA (Sociology), Montessori teacher training', image: 'person-disha' },
            { name: 'Tanya Nair', role: 'Career Counselor', credentials: 'B.Sc. Psychology (Davidson College USA)', image: 'person-tanya' },
            { name: 'Smitha Leo', role: 'IELTS Coach', credentials: 'B.Com, MBA', image: 'person-smitha' },
            { name: 'Gauri Katira', role: 'Creative and Research Team Member', credentials: 'B.Sc. in Textiles major', image: 'person-gauri' },
            { name: 'Gagandeep Singh', role: 'Digital Marketing Manager', credentials: 'B.B.A', image: 'person-gagandeep' },
          ],
        },
      ],
    },
    {
      label: 'Our Sydney team',
      title: 'Our Sydney team',
      blocks: [
        {
          type: 'people',
          items: [
            { name: 'Dr. Kuldip Nandra', role: 'CEO', image: 'person-kuldip' },
            { name: 'Shefali Nandra', role: 'Solicitor & MARA Agent (MARN 1464717)', image: 'person-shefali' },
            { name: 'Rinku Sharma', role: 'Solicitor / Legal Team', image: 'person-rinku' },
          ],
        },
      ],
    },
    {
      label: 'Our associates',
      title: 'Our associates',
      blocks: [
        {
          type: 'people',
          items: [
            { name: 'Manjusha Bhaskarwar', role: 'Career Counselor', image: 'person-manjusha' },
            {
              name: 'Binal Soni',
              role: 'Edu Compass – Founder & Counsellor',
              image: 'person-binal',
              phone: '9869172620',
              email: 'binal@educompass.in',
              bio: [
                'Masters in Computer Applications · Masters in Counseling Psychology · Global Career Counselor from University of California, Los Angeles · Certified Career Analyst from Edumilestones · 3-level Certification for Career Coach from myAglakadam · ISO Certified Handwriting Analyst · TA-101 · Drawing Analysis.',
                '7+ years of experience, guided 1500+ individuals across the globe including students and professionals. Visiting Career Counselor at Mithibai College.',
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'How we work',
      title: 'Our clientele, approach and experience',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              eyebrow: 'Our clientele includes',
              title: 'Students, educators and professionals',
              bullets: [
                'Students seeking career guidance or wanting to study abroad.',
                'Teachers, principals, schools, colleges, and education institutes who wish to use career guidance and study abroad counseling for their students.',
                'Professionals wanting to migrate or change careers.',
              ],
            },
            {
              eyebrow: 'Our approach',
              title: 'Client-centric, end to end',
              text: 'We adopt a client-centric approach and exceed client expectations through our clear and consistent communication, honest advice, and end-to-end support for all services provided.',
            },
            {
              eyebrow: 'Our experience',
              title: '3000+ students placed',
              text: 'Over the last 15 years, we have placed more than 3000 students in universities in Australia and Canada and have expanded our expertise to other countries. Our esteemed team of lawyers, with a combined work experience of more than three decades, have successfully lodged migration applications for hundreds of clients in Australia and Canada.',
            },
          ],
        },
        {
          type: 'callout',
          title: 'Our office',
          text: 'We work in virtual teams across three continents, with offices in India, Australia, and Canada.',
          actions: [{ label: 'Contact us', to: '/contact-us' }],
        },
      ],
    },
  ],
};

export default page;
