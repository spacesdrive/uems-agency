import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { metrics } from '../../data/home';
import s from './Metrics.module.css';

export function Metrics({ index }: { index: number }) {
  return (
    <Section tone="muted" labelledBy="metrics-title">
      <Reveal>
        <SectionHeading index={index} label={metrics.label} title={metrics.title} id="metrics-title" />
      </Reveal>
      <dl className={s.grid}>
        {metrics.items.map((m, i) => (
          <Reveal key={m.label} className={s.item} delay={i * 80}>
            <dt className={s.label}>{m.label}</dt>
            <dd className={s.value}>{m.value}</dd>
            {m.note && <dd className={s.note}>{m.note}</dd>}
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
