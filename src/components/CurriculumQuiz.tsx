import { useId, useRef, useState, type MouseEvent } from 'react';
import { quizOutcome, quizzes, type Quiz, type QuizAnswer } from '../data/quizzes';
import { site } from '../data/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import blocks from '../blocks/blocks.module.css';
import s from './CurriculumQuiz.module.css';

/** Quiz cards for Career Clarity Tests; each opens its quiz in a modal dialog on the page. */
export function CurriculumQuizzes() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Quiz | null>(null);
  // Changing the key restarts the quiz from its intro each time it is opened.
  const [session, setSession] = useState(0);

  function open(quiz: Quiz) {
    setActive(quiz);
    setSession((n) => n + 1);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  // A click on the backdrop lands on the dialog element itself.
  function onDialogClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <>
      <ul role="list" className={`${blocks.cards} ${blocks.grid2}`}>
        {quizzes.map((quiz, i) => (
          <Reveal as="li" key={quiz.id} delay={i * 70} className={blocks.card}>
            <div className={blocks.cardBody}>
              <p className={blocks.cardEyebrow}>{quiz.card.eyebrow}</p>
              <h3 className={blocks.cardTitle}>{quiz.card.title}</h3>
              <p className={blocks.cardText}>{quiz.card.text}</p>
              <ul role="list" className={blocks.tags}>
                {quiz.card.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <button type="button" className={`${blocks.cardAction} ${s.start}`} onClick={() => open(quiz)}>
                {quiz.card.cta}
                <span className={blocks.cardActionIcon}>
                  <Icon name="arrow-right" size={14} />
                </span>
              </button>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* Backdrop clicks are a pointer shortcut; keyboard users close with Escape (native) or the Close button. */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog ref={dialogRef} className={s.dialog} aria-labelledby="quiz-title" onClick={onDialogClick} onClose={() => setActive(null)}>
        {active && <QuizRunner key={session} quiz={active} onClose={close} />}
      </dialog>
    </>
  );
}

function QuizRunner({ quiz, onClose }: { quiz: Quiz; onClose: () => void }) {
  const id = useId();
  const total = quiz.questions.length;
  // -1 is the intro, 0..total-1 the questions, total the result.
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [prompt, setPrompt] = useState(false);

  const progress = step < 0 ? 0 : Math.round((Math.min(step, total) / total) * 100);
  const status = step < 0 ? 'Get ready' : step < total ? `Question ${step + 1} of ${total}` : 'Complete!';

  function next() {
    if (step >= 0 && !answers[step]) {
      setPrompt(true);
      return;
    }
    setPrompt(false);
    setStep(step + 1);
  }

  function choose(value: QuizAnswer) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[step] = value;
      return copy;
    });
    setPrompt(false);
  }

  const question = step >= 0 && step < total ? quiz.questions[step] : undefined;
  const result = step >= total ? quiz.results[quizOutcome(answers)] : undefined;

  return (
    <div className={s.panel}>
      <header className={s.head}>
        <div>
          <h2 id="quiz-title" className={s.title}>
            {quiz.title}
          </h2>
          <p className={s.sub}>{total} quick questions</p>
        </div>
        <button type="button" className={s.close} onClick={onClose} aria-label="Close quiz">
          <Icon name="close" size={18} />
        </button>
      </header>

      <div className={s.progress}>
        <div className={s.progressMeta}>
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
        <div className={s.track} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Quiz progress">
          <div className={s.fill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={s.body}>
        {step < 0 && (
          <div className={s.intro}>
            <h3 className={s.introHeading}>{quiz.intro.heading}</h3>
            {quiz.intro.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}

        {question && (
          <fieldset className={s.question} key={step}>
            <legend className={s.legend}>
              <span className={s.qNumber}>Q{step + 1}</span>
              {question.question}
            </legend>
            <div className={s.options}>
              {question.options.map((option) => (
                <label key={option.value} className={s.option}>
                  <input
                    type="radio"
                    name={`${id}-q${step}`}
                    value={option.value}
                    checked={answers[step] === option.value}
                    onChange={() => choose(option.value)}
                  />
                  <span className={s.letter} aria-hidden="true">
                    {option.value}
                  </span>
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
            <p className={s.prompt} role="status" aria-live="polite">
              {prompt ? 'Please choose an answer to continue.' : ''}
            </p>
          </fieldset>
        )}

        {result && (
          <div className={s.result}>
            <p className={s.resultLabel}>Your recommended path</p>
            <h3 className={s.resultPath}>{result.path}</h3>
            <p className={s.trait}>{result.trait}</p>
            <p className={s.resultText}>{result.description}</p>
            <div className={s.next}>
              <p className={s.nextLabel}>Next step</p>
              <p>
                Get a <strong>detailed personalised report</strong> with career analysis, subject recommendations, and expert
                counselling.
              </p>
              <a href={site.evalUrl} target="_blank" rel="noopener noreferrer" className={s.nextCta}>
                Get detailed report: try EvalTest <Icon name="arrow-up-right" size={14} />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
            <button type="button" className={s.textButton} onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>

      {step < total && (
        <footer className={s.nav}>
          <button type="button" className={s.textButton} onClick={() => setStep(step - 1)} disabled={step <= 0} hidden={step < 0}>
            <Icon name="arrow-right" size={14} className={s.flip} /> Previous
          </button>
          <button type="button" className={s.primary} onClick={next}>
            {step < 0 ? 'Start quiz' : step === total - 1 ? 'See results' : 'Next'}
            <Icon name="arrow-right" size={14} />
          </button>
        </footer>
      )}
    </div>
  );
}
