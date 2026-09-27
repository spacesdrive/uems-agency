import type { CardItem } from '../data/types';
import { Icon } from '../components/Icon';
import { Img } from '../components/Img';
import { Reveal } from '../components/Reveal';
import { RichText } from '../components/RichText';
import { SmartLink } from '../components/SmartLink';
import { cx } from '../lib/cx';
import s from './blocks.module.css';

interface CardGridProps {
  items: readonly CardItem[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}

export function CardGrid({ items, columns = 3, numbered = false }: CardGridProps) {
  return (
    <ul role="list" className={cx(s.cards, s[`grid${columns}`])}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % columns) * 70} className={s.card}>
          {item.image && (
            <div className={s.cardMedia}>
              <Img name={item.image.name} alt={item.image.alt} sizes={`(min-width: 1024px) ${Math.round(100 / columns)}vw, 100vw`} />
            </div>
          )}
          <div className={s.cardBody}>
            {(numbered || item.eyebrow) && (
              <p className={s.cardEyebrow}>
                {numbered && <span className={s.cardIndex}>{String(i + 1).padStart(2, '0')}</span>}
                {item.eyebrow}
              </p>
            )}
            <h3 className={s.cardTitle}>{item.title}</h3>
            {item.text && (
              <p className={s.cardText}>
                <RichText text={item.text} />
              </p>
            )}
            {item.bullets && (
              <ul role="list" className={s.cardBullets}>
                {item.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" size={14} strokeWidth={2.5} />
                    <span>
                      <RichText text={b} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {item.tags && (
              <ul role="list" className={s.tags}>
                {item.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            {item.facts && (
              <dl className={s.cardFacts}>
                {item.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {item.action && (
              <SmartLink to={item.action.to} className={s.cardAction}>
                {item.action.label}
                <span className={s.cardActionIcon}>
                  <Icon name="arrow-right" size={14} />
                </span>
              </SmartLink>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
