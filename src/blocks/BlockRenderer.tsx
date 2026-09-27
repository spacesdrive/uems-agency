import type { Block } from '../data/types';
import { Button } from '../components/Button';
import { EnquiryForm } from '../components/EnquiryForm';
import { Icon } from '../components/Icon';
import { Img } from '../components/Img';
import { RegistrationForm } from '../components/RegistrationForm';
import { RichText } from '../components/RichText';
import { cx } from '../lib/cx';
import { CardGrid } from './CardGrid';
import { People } from './People';
import s from './blocks.module.css';

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'prose':
      return (
        <div className={cx(s.prose, block.size === 'lead' && s.proseLead)}>
          {block.paragraphs.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      );

    case 'cards':
      return <CardGrid items={block.items} columns={block.columns} numbered={block.numbered} />;

    case 'checklist':
      return (
        <div>
          {block.title && <h3 className={s.blockTitle}>{block.title}</h3>}
          <ul role="list" className={cx(s.checklist, block.columns && s[`cols${block.columns}`])}>
            {block.items.map((item) => (
              <li key={item}>
                <span className={s.check} aria-hidden="true">
                  <Icon name="check" size={12} strokeWidth={3} />
                </span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'table':
      return (
        <figure className={s.tableFigure}>
          {block.caption && <figcaption className={s.blockTitle}>{block.caption}</figcaption>}
          {/* Scrollable region must be keyboard-focusable (axe scrollable-region-focusable). */}
          {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div className={s.tableScroll} role="region" aria-label={block.caption ?? 'Table'} tabIndex={0}>
            <table className={s.table}>
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          <RichText text={cell} />
                        </th>
                      ) : (
                        <td key={i}>
                          {cell.split('\n').map((line) => (
                            <span key={line} className={s.cellLine}>
                              <RichText text={line} />
                            </span>
                          ))}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className={s.tableNote}>
              <RichText text={block.note} />
            </p>
          )}
        </figure>
      );

    case 'steps':
      return (
        <ol role="list" className={s.steps}>
          {block.items.map((step, i) => (
            <li key={step.title} className={s.step}>
              <span className={s.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.stepTitle}>{step.title}</h3>
              {step.text && (
                <p className={s.stepText}>
                  <RichText text={step.text} />
                </p>
              )}
            </li>
          ))}
        </ol>
      );

    case 'stats':
      return (
        <dl className={s.stats}>
          {block.items.map((stat) => (
            <div key={stat.label} className={s.stat}>
              <dt className={s.statLabel}>{stat.label}</dt>
              <dd className={s.statValue}>{stat.value}</dd>
              {stat.note && <dd className={s.statNote}>{stat.note}</dd>}
            </div>
          ))}
        </dl>
      );

    case 'split':
      return (
        <div className={cx(s.split, block.imageSide === 'left' && s.splitLeft)}>
          <div className={s.splitMedia}>
            <Img name={block.image.name} alt={block.image.alt} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className={s.splitBody}>
            {block.title && <h3 className="t-h3">{block.title}</h3>}
            {block.paragraphs?.map((p) => (
              <p key={p} className={s.splitText}>
                <RichText text={p} />
              </p>
            ))}
            {block.bullets && (
              <ul role="list" className={s.checklist}>
                {block.bullets.map((b) => (
                  <li key={b}>
                    <span className={s.check} aria-hidden="true">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    <span>
                      <RichText text={b} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {block.actions && (
              <div className={s.actions}>
                {block.actions.map((a) => (
                  <Button key={a.label} to={a.to} label={a.label} variant={a.variant ?? 'accent'} />
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className={s.faq}>
          {block.items.map((item) => (
            <details key={item.question} className={s.faqItem}>
              <summary>
                <span>{item.question}</span>
                <span className={s.faqIcon} aria-hidden="true">
                  <Icon name="plus" size={16} />
                </span>
              </summary>
              <p>
                <RichText text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      );

    case 'people':
      return <People items={block.items} />;

    case 'quote':
      return (
        <figure className={s.quote}>
          <Icon name="quote" size={36} className={s.quoteMark} />
          <blockquote>
            <p>{block.text}</p>
          </blockquote>
          {block.cite && <figcaption>{block.cite}</figcaption>}
        </figure>
      );

    case 'actions':
      return (
        <div className={s.actions}>
          {block.items.map((a, i) => (
            <Button key={a.label} to={a.to} label={a.label} variant={a.variant ?? (i === 0 ? 'accent' : 'outline')} />
          ))}
        </div>
      );

    case 'gallery':
      return (
        <div className={s.gallery}>
          {block.items.map((img) => (
            <div key={img.name} className={s.galleryItem}>
              <Img name={img.name} alt={img.alt} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}
        </div>
      );

    case 'tags':
      return (
        <div>
          {block.title && <h3 className={s.blockTitle}>{block.title}</h3>}
          <ul role="list" className={cx(s.tags, s.tagsLarge)}>
            {block.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      );

    case 'callout':
      return (
        <div className={s.callout}>
          <div>
            <h3 className={s.calloutTitle}>{block.title}</h3>
            {block.text && (
              <p className={s.calloutText}>
                <RichText text={block.text} />
              </p>
            )}
          </div>
          <div className={s.actions}>
            {block.actions.map((a, i) => (
              <Button key={a.label} to={a.to} label={a.label} variant={a.variant ?? (i === 0 ? 'accent' : 'light')} />
            ))}
          </div>
        </div>
      );

    case 'enquiry':
      return <EnquiryForm preset={block.preset} />;

    case 'registration':
      return <RegistrationForm />;
  }
}
