import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Img } from './Img';
import s from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** Section number shown in the dark chip; the brand mark is used when omitted. */
  index?: number;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  id?: string;
  size?: 'large' | 'compact';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
  size = 'large',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx(s.heading, tone === 'dark' && s.dark, className)}>
      <div className={s.meta}>
        <span className={s.index} aria-hidden="true">
          {index !== undefined ? index : <Img name="brand-mark" alt="" eager className={s.mark} />}
        </span>
        <span className={s.label}>{label}</span>
      </div>
      {title && (
        <h2 id={id} className={size === 'large' ? 't-h2' : 't-h2-compact'}>
          {title}
        </h2>
      )}
      {intro && <p className={s.intro}>{intro}</p>}
    </div>
  );
}
