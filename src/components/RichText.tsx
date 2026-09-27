import { Fragment, type ReactNode } from 'react';
import { SmartLink } from './SmartLink';

const token = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders `**bold**` and `[label](href)` inline markup from content data. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(token)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, bold, label, href] = match;
    if (bold !== undefined) {
      parts.push(<strong key={key++}>{bold}</strong>);
    } else if (label !== undefined && href !== undefined) {
      parts.push(
        <SmartLink key={key++} to={href} className="inline-link">
          {label}
        </SmartLink>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <Fragment>{parts}</Fragment>;
}
