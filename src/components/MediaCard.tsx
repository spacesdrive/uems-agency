import type { ImageRef } from '../data/types';
import { cx } from '../lib/cx';
import { Icon } from './Icon';
import { Img } from './Img';
import { SmartLink } from './SmartLink';
import s from './MediaCard.module.css';

interface MediaCardProps {
  title: string;
  text?: string;
  image: ImageRef;
  to: string;
  /** Label revealed in the expanding pill on hover. */
  cta: string;
  eyebrow?: string;
  tone?: 'light' | 'dark';
  aspect?: 'landscape' | 'square' | 'wide';
  sizes?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Project-style card: rounded media with an expanding pill, caption below. */
export function MediaCard({
  title,
  text,
  image,
  to,
  cta,
  eyebrow,
  tone = 'light',
  aspect = 'landscape',
  sizes = '(min-width: 768px) 50vw, 100vw',
  headingLevel: Heading = 'h3',
}: MediaCardProps) {
  return (
    <article className={s.card}>
      <div className={cx(s.media, s[aspect])}>
        <Img name={image.name} alt={image.alt} sizes={sizes} className={s.img} />
        <span className={cx(s.pill, tone === 'dark' && s.pillDark)} aria-hidden="true">
          <span className={s.pillIcon}>
            <Icon name="arrow-up-right" size={15} />
          </span>
          <span className={s.pillLabel}>{cta}</span>
        </span>
      </div>
      <div className={s.body}>
        <Heading className={s.title}>
          <SmartLink to={to} className={s.link}>
            {title}
          </SmartLink>
        </Heading>
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        {text && <p className={s.text}>{text}</p>}
      </div>
    </article>
  );
}
