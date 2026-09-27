import { site } from '../site';
import type { ContentPageData } from '../types';

const page: ContentPageData = {
  path: '/franchise-channel-partners',
  meta: {
    title: 'Franchise & Channel Partners',
    description:
      'Partner with UEMS Ventures: become an associate career counselor with the Eval team or associate with UEMS Abroad for study abroad, with training, marketing and admin support.',
  },
  hero: {
    eyebrow: 'Franchise & channel partners',
    title: 'Become a member of a team which believes in spreading light',
    lead: [
      'Become a member of a team which believes in spreading light and offering direction to students. Join us as our partner to enhance your own career or business. Choose to become an associate career counselor with the Eval team or associate with UEMS Abroad for study abroad.',
    ],
    actions: [
      { label: 'Register for free', to: '/contact-us' },
      { label: `Call ${site.phones[0].display}`, to: site.phones[0].href, variant: 'outline' },
    ],
  },
  sections: [
    {
      label: 'Our belief',
      blocks: [
        {
          type: 'quote',
          text: 'Every day you have lived and have not spent that day trying to make a positive impact on somebody else makes you like a candle wasting its light in a dark, abandoned cave.',
          cite: 'Patrick San Francesco',
        },
      ],
    },
    {
      label: 'Associate career counselor',
      title: 'Become an associate career counselor',
      layout: 'aside',
      intro:
        'UEMS Ventures is looking for partners who can join us in our mission of reaching out to as many students as possible with the Career Clarity Test series.',
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'It was important for us to create the Career Clarity Test series called Eval as we wanted to give young individuals clarity in what they take up as their careers. Now it’s time to spread the word.',
            'If you are someone who can work with our team to help students use Eval to find clarity, let’s discuss what we can do together. Working with our team means you gain full support in understanding the product and its benefits for the students and yourself. It’s a product which we all love to work with because of the underlying philosophy and the reason why it was created.',
          ],
        },
        {
          type: 'checklist',
          title: 'Special features available to a career counselor',
          columns: 2,
          items: [
            'Training',
            'Marketing support',
            'Career knowledge base',
            'Admin support',
            'Career Clarity Tests',
            'Teamwork and networking with mentors',
          ],
        },
        {
          type: 'callout',
          title: 'Special packages available',
          text: `Special packages are available for anyone interested in becoming a career counselor. Enquire with us: reach us on ${site.phones[0].display} for a complete write-up on how the counselling model can work for you.`,
          actions: [
            { label: 'Call us', to: site.phones[0].href },
            { label: 'Register for free', to: '/contact-us' },
          ],
        },
      ],
    },
    {
      label: 'Join the UEMS team',
      title: 'Are you someone who has access to students or can reach out to students?',
      blocks: [
        {
          type: 'prose',
          size: 'lead',
          paragraphs: [
            'Associate with us to help students fulfil their dream of studying abroad. We offer complete support in guiding the students with their application and visa process.',
          ],
        },
        {
          type: 'actions',
          items: [
            { label: `Reach us on ${site.phones[0].display}`, to: site.phones[0].href },
            { label: 'Register for free', to: '/contact-us', variant: 'outline' },
          ],
        },
      ],
    },
  ],
};

export default page;
