import { Icon } from '../../components/Icon';
import { Img } from '../../components/Img';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { founder } from '../../data/home';
import { site } from '../../data/site';
import s from './Founder.module.css';

export function Founder({ index }: { index: number }) {
  return (
    <Section labelledBy="founder-title">
      <div className={s.grid}>
        <Reveal className={s.portrait}>
          <Img name={founder.image.name} alt={founder.image.alt} sizes="(min-width: 1024px) 38vw, 100vw" />
          <div className={s.nameCard}>
            <p className={s.name}>{founder.name}</p>
            <p className={s.role}>Founder &amp; CEO</p>
          </div>
        </Reveal>

        <div className={s.content}>
          <Reveal>
            <SectionHeading index={index} label={founder.label} title={founder.title} id="founder-title" size="compact" />
          </Reveal>
          <Reveal as="figure" className={s.letter} delay={80}>
            <Icon name="quote" size={40} className={s.mark} />
            <blockquote className={s.quote}>
              {founder.paragraphs.map((p, i) => (
                <p key={p} className={i === 0 ? s.first : undefined}>
                  {p}
                </p>
              ))}
            </blockquote>
            <figcaption className={s.caption}>
              <span>
                <strong>{founder.name}</strong>
                <span>{founder.role}</span>
              </span>
              <a href={site.founderLinkedIn} target="_blank" rel="noopener noreferrer" className={s.linkedin} aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}>
                <Icon name="linkedin" size={16} />
              </a>
            </figcaption>
          </Reveal>
          <Reveal className={s.facts} delay={140}>
            <dl>
              {founder.facts.map((f) => (
                <div key={f.label}>
                  <dd>{f.value}</dd>
                  <dt>{f.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
