import type { ReactNode } from 'react';
import type { SectionTone } from '../data/types';
import { cx } from '../lib/cx';
import s from './Section.module.css';

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  labelledBy?: string;
  className?: string;
  /** Reduce vertical padding for tightly grouped sections. */
  tight?: boolean;
  children: ReactNode;
}

export function Section({ id, tone = 'light', labelledBy, className, tight = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(s.section, s[tone], tight && s.tight, className)}>
      <div className="container">{children}</div>
    </section>
  );
}
