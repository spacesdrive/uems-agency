import type { PageSection } from './types';

export const achieveYourDream = [
  'At **UEMS Ventures**, we prioritize our clients’ needs as a Study Abroad & Migration Expert. Our services include EVAL Career Clarity Tests, Study Abroad guidance, and Migration support. We aim to help people upgrade their lives. With EVAL, we help clients clarify their career paths. Through Study Abroad, we assist students in achieving their dream of studying at top universities overseas. And with Migration support, we empower individuals to build a new life in a foreign country.',
  'We offer comprehensive and personalized solutions that are tailored to meet each client’s unique needs and goals. Our team of experienced and knowledgeable consultants provide expert guidance and support at every step, from the initial evaluation to the final destination.',
  'With a client-centric approach, we work closely with our clients to understand their aspirations and provide them with the information, resources, and support they need to achieve their dreams. Whether you are looking to study abroad, migrate to a new country, or clarify your career path, UEMS Ventures is your dedicated partner to help you chart your destiny abroad.',
] as const;

export const partnerSection: PageSection = {
  label: 'Why UEMS',
  title: 'We work together to help you achieve your dream',
  layout: 'aside',
  blocks: [{ type: 'prose', paragraphs: achieveYourDream }],
};

export function enquirySection(label = 'Talk to Mumbai expert'): PageSection {
  return {
    id: 'enquire',
    label,
    title: 'Let’s connect & guide you forward',
    intro:
      'Drop your details and our team will contact you shortly to understand your goals and help you choose the best pathway for your future abroad.',
    layout: 'aside',
    blocks: [{ type: 'enquiry' }],
  };
}
