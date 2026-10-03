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
      <div className={s.grid}>
        <div className={s.copy}>
          <Reveal>
            <SectionHeading index={index} label={whyUems.label} title={whyUems.title} id="why-title" size="compact" />
          </Reveal>
          <Reveal className={s.details} delay={80}>
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
        </div>
        <Reveal className={s.photo} delay={120}>
          <Img name={image.name} alt={image.alt} sizes="(min-width: 960px) 46vw, 100vw" />
        </Reveal>
      </div>
    </Section>
  );
}
