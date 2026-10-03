/** Curriculum quizzes on /career-clarity-tests (content from the UEMS Ventures site). */

export type QuizAnswer = 'A' | 'B' | 'C' | 'D';

export interface QuizResult {
  readonly path: string;
  readonly trait: string;
  readonly description: string;
}

export interface Quiz {
  readonly id: string;
  /** Card shown on the page before the quiz is opened. */
  readonly card: { readonly eyebrow: string; readonly title: string; readonly text: string; readonly tags: readonly string[]; readonly cta: string };
  readonly title: string;
  readonly intro: { readonly heading: string; readonly lines: readonly string[] };
  readonly questions: readonly { readonly question: string; readonly options: readonly { readonly value: QuizAnswer; readonly text: string }[] }[];
  readonly results: Readonly<Record<QuizAnswer, QuizResult>>;
}

const options = (a: string, b: string, c: string, d: string) =>
  [
    { value: 'A', text: a },
    { value: 'B', text: b },
    { value: 'C', text: c },
    { value: 'D', text: d },
  ] as const;

export const quizzes: readonly Quiz[] = [
  {
    id: 'ib',
    card: {
      eyebrow: '6 subjects',
      title: 'IB Curriculum',
      text: 'Choose IB subjects like you’re designing your future. Discover whether Science/Tech, Commerce, Humanities, or Creative paths suit you best.',
      tags: ['TOK', 'EE', 'CAS', '3 HL + 3 SL'],
      cta: 'Start IB quiz',
    },
    title: 'IB Curriculum Quiz',
    intro: {
      heading: 'Choose IB Subjects Like You’re Designing Your Future',
      lines: ['Your subject choices shape your university offers.', '6 subjects • 3 HL + 3 SL • TOK • EE • CAS'],
    },
    questions: [
      { question: 'What do you enjoy most?', options: options('Solving problems', 'Debating ideas', 'Creating things', 'Managing money') },
      { question: 'Pick a project you’d love', options: options('Science experiment', 'Business plan', 'Documentary', 'App or website') },
      { question: 'Your ideal future career?', options: options('Doctor / Engineer', 'Business leader', 'Lawyer / Journalist', 'Designer / Artist') },
    ],
    results: {
      A: { path: 'Science / Technology', trait: 'Analytical Mind', description: 'Consider HL subjects in Physics, Chemistry, Mathematics, and Computer Science.' },
      B: { path: 'Commerce / Business', trait: 'Strategic Mind', description: 'Consider HL subjects in Business Management, Economics, and Mathematics.' },
      C: { path: 'Humanities', trait: 'Communicative Mind', description: 'Consider HL subjects in History, English A, Economics, or Global Politics.' },
      D: { path: 'Creative / Design', trait: 'Creative Mind', description: 'Consider HL subjects in Visual Arts, Design Technology, or Film.' },
    },
  },
  {
    id: 'icse',
    card: {
      eyebrow: 'Streams',
      title: 'ICSE Curriculum',
      text: 'Explore the right stream and subject combination for your ICSE journey. Find out if Science, Commerce, or Humanities is your calling.',
      tags: ['Science', 'Commerce', 'Humanities'],
      cta: 'Start ICSE quiz',
    },
    title: 'ICSE Curriculum Quiz',
    intro: {
      heading: 'Find the Right Stream & Subject Combination',
      lines: ['Your ICSE/ISC stream choice opens different career doors.', 'Science • Commerce • Humanities • Arts'],
    },
    questions: [
      {
        question: 'What excites you most in school?',
        options: options('Math & Science experiments', 'Business Studies & Economics', 'History, Literature & Social Studies', 'Art, Music & Creative Projects'),
      },
      {
        question: 'Which activity would you choose?',
        options: options('Building a working model', 'Organizing a school event', 'Writing a research paper', 'Designing a poster or short film'),
      },
      {
        question: 'What career appeals to you?',
        options: options('Engineer, Doctor, Scientist', 'CA, Banker, Entrepreneur', 'Lawyer, Teacher, Civil Servant', 'Designer, Writer, Performer'),
      },
    ],
    results: {
      A: { path: 'Science Stream', trait: 'Analytical Mind', description: 'Consider Physics, Chemistry, Mathematics, and Biology in ISC.' },
      B: { path: 'Commerce Stream', trait: 'Strategic Mind', description: 'Consider Commerce, Accounts, Economics, and Mathematics in ISC.' },
      C: { path: 'Humanities Stream', trait: 'Communicative Mind', description: 'Consider History, Political Science, Sociology, and Literature in ISC.' },
      D: { path: 'Creative / Arts Stream', trait: 'Creative Mind', description: 'Consider Art, Music, Literature, and Mass Communication in ISC.' },
    },
  },
];

/**
 * The most chosen answer decides the result. On a tie the later letter wins, matching the
 * quiz on the original UEMS site.
 */
export function quizOutcome(answers: readonly QuizAnswer[]): QuizAnswer {
  const counts: Record<QuizAnswer, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const a of answers) counts[a]++;
  return (Object.keys(counts) as QuizAnswer[]).reduce((best, next) => (counts[best] > counts[next] ? best : next));
}
