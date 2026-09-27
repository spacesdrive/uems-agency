import { MediaCard } from '../../components/MediaCard';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import type { Service } from '../../data/home';
import { cx } from '../../lib/cx';
import s from './MediaGrid.module.css';

interface MediaGridProps {
  index: number;
  id: string;
  label: string;
  title: string;
  intro?: string;
  items: readonly Service[];
  tone?: 'light' | 'muted';
}

/** Project-style showcase grid used for services on the home page. */
export function MediaGrid({ index, id, label, title, intro, items, tone = 'muted' }: MediaGridProps) {
  const columns = items.length >= 3 ? 3 : 2;
  return (
    <Section tone={tone} labelledBy={id}>
      <Reveal>
        <SectionHeading index={index} label={label} title={title} intro={intro} id={id} />
      </Reveal>
      <ul role="list" className={cx(s.grid, columns === 3 ? s.three : s.two)}>
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 90}>
            <MediaCard
              title={item.title}
              text={item.text}
              image={item.image}
              to={item.to}
              cta={item.cta}
              tone={i % 2 === 1 ? 'dark' : 'light'}
              aspect={columns === 3 ? 'square' : 'wide'}
              sizes={columns === 3 ? '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
