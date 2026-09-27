import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Img } from '../../components/Img';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { SmartLink } from '../../components/SmartLink';
import { destinations } from '../../data/home';
import { cx } from '../../lib/cx';
import s from './Destinations.module.css';

export function Destinations({ index }: { index: number }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const items = destinations.items;
  const current = items[active] ?? items[0];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? (active + 1) % items.length
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? (active - 1 + items.length) % items.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  if (!current) return null;
  const panelId = `${baseId}-panel`;

  return (
    <Section labelledBy="destinations-title">
      <Reveal>
        <SectionHeading
          index={index}
          label={destinations.label}
          title={destinations.title}
          intro={destinations.intro}
          id="destinations-title"
        />
      </Reveal>

      <Reveal className={s.explorer}>
        {/* Tabs use roving tabIndex; the tablist only delegates arrow-key handling. */}
        {/* oxlint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div role="tablist" aria-label="Study destinations" aria-orientation="vertical" className={s.tabs} onKeyDown={onKeyDown}>
          {items.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${d.id}`}
              aria-selected={i === active}
              aria-controls={panelId}
              tabIndex={i === active ? 0 : -1}
              className={cx(s.tab, i === active && s.tabActive)}
              onClick={() => setActive(i)}
            >
              <span className={s.code}>{d.code}</span>
              <span className={s.tabName}>{d.name}</span>
              <Icon name="arrow-right" size={14} className={s.tabArrow} />
            </button>
          ))}
        </div>

        <div role="tabpanel" id={panelId} aria-labelledby={`${baseId}-tab-${current.id}`} className={s.panel}>
          <div key={current.id} className={s.media}>
            <Img name={current.image} alt={`${current.name}, study destination`} sizes="(min-width: 1024px) 55vw, 100vw" />
            <span className={s.mediaTag}>
              <span className={s.mediaCode}>{current.code}</span>
              {current.name}
            </span>
          </div>

          <div key={`${current.id}-body`} className={s.body}>
            <h3 className={s.name}>{current.name}</h3>
            <p className={s.description}>{current.description}</p>
            <ul role="list" className={s.benefits}>
              {current.benefits.map((b) => (
                <li key={b}>
                  <span className={s.check} aria-hidden="true">
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <dl className={s.facts}>
              <div>
                <dt>Popular courses</dt>
                <dd>{current.courses}</dd>
              </div>
              <div>
                <dt>Tuition range</dt>
                <dd>{current.tuition}</dd>
              </div>
            </dl>
            <Button to={current.to} label={current.cta} />
          </div>
        </div>
      </Reveal>

      <p className={s.footnote}>
        {destinations.footnote}.{' '}
        <SmartLink to="/contact-us" className="inline-link">
          Book free counselling
        </SmartLink>
      </p>
    </Section>
  );
}
