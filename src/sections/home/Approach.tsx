import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { RichText } from '../../components/RichText';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { approach } from '../../data/home';
import { achieveYourDream } from '../../data/shared';
import s from './Approach.module.css';

export function Approach({ index }: { index: number }) {
  const [first, ...rest] = achieveYourDream;
  return (
    <Section labelledBy="approach-title">
      <Reveal>
        <SectionHeading index={index} label={approach.label} title={approach.title} id="approach-title" />
      </Reveal>
      <div className={s.grid}>
        <Reveal className={s.lead}>
          <p>
            <RichText text={first} />
          </p>
        </Reveal>
        <Reveal className={s.body} delay={100}>
          {rest.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
          <Button to="/about-us" label="Read more" variant="dark" />
        </Reveal>
      </div>
    </Section>
  );
}
