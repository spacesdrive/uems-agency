import { createElement, useCallback, type CSSProperties, type ReactNode } from 'react';
import { observeReveal } from '../lib/reveal';

type RevealTag = 'div' | 'li' | 'article' | 'figure' | 'header';

interface RevealProps {
  as?: RevealTag;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ as = 'div', delay = 0, className, children }: RevealProps) {
  // React 19 callback ref: observe on attach, and the returned cleanup unobserves on detach.
  const ref = useCallback((el: HTMLElement | null) => (el ? observeReveal(el) : undefined), []);

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;
  return createElement(as, { ref, className, style }, children);
}
