import { RegistrationForm } from '../../components/RegistrationForm';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { accelerator } from '../../data/home';
import s from './Accelerator.module.css';

/** Career counselling → Global Profile Accelerator → study abroad, with the free counselling registration. */
export function Accelerator({ index }: { index: number }) {
  return (
    <Section id="global-profile-accelerator" labelledBy="accelerator-title">
      <div className={s.grid}>
        <div className={s.aside}>
          <Reveal>
            <SectionHeading
              index={index}
              label={accelerator.label}
              title={accelerator.title}
              intro={accelerator.intro}
              id="accelerator-title"
              size="compact"
            />
          </Reveal>
          <Reveal delay={80}>
            <ol className={s.steps}>
              {accelerator.steps.map((step, i) => (
                <li key={step.title} className={s.step}>
                  <span className={s.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                    <p className={s.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={100} className={s.formCol}>
          <div id="free-counselling" className={s.formHead}>
            <h3 className={s.formTitle}>Register for a free counselling session</h3>
            <p className={s.formText}>Career counselling and study abroad advice, one-on-one with our experts.</p>
          </div>
          <RegistrationForm />
        </Reveal>
      </div>
    </Section>
  );
}
