import { Button } from '../../components/Button';
import { Img } from '../../components/Img';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { whyUems } from '../../data/home';
import s from './WhyUems.module.css';

export function WhyUems({ index }: { index: number }) {
  const { small, large } = whyUems.images;
  return (
    <Section labelledBy="why-title" className={s.section}>
      <Reveal>
        <SectionHeading index={index} label={whyUems.label} title={whyUems.title} id="why-title" size="compact" />
      </Reveal>
      <div className={s.grid}>
        <Reveal className={s.small}>
          <Img name={small.name} alt={small.alt} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw" />
        </Reveal>
        <Reveal className={s.copy} delay={80}>
          <p className={s.text}>{whyUems.text}</p>
          <dl className={s.facts}>
            {whyUems.facts.map((f) => (
              <div key={f.label}>
                <dd>{f.value}</dd>
                <dt>{f.label}</dt>
              </div>
            ))}
          </dl>
          <Button to="/about-us" label="Discover more" />
        </Reveal>
        <Reveal className={s.large} delay={160}>
          <Img name={large.name} alt={large.alt} sizes="(min-width: 1024px) 44vw, (min-width: 640px) 55vw, 100vw" />
        </Reveal>
      </div>
    </Section>
  );
}
