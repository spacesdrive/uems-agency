import { Button } from '../../components/Button';
import { Img } from '../../components/Img';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { whyUems } from '../../data/home';
import s from './WhyUems.module.css';

export function WhyUems({ index }: { index: number }) {
  const { image } = whyUems;
  return (
    <Section labelledBy="why-title" className={s.section}>
      <Reveal>
        <SectionHeading index={index} label={whyUems.label} title={whyUems.title} id="why-title" size="compact" />
      </Reveal>
      <div className={s.grid}>
        <Reveal className={s.copy}>
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
        <Reveal className={s.photo} delay={120}>
          <Img name={image.name} alt={image.alt} sizes="(min-width: 768px) 52vw, 100vw" />
        </Reveal>
      </div>
    </Section>
  );
}
