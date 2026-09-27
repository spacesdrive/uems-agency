import { primaryNav, footerNav, type NavLinkItem } from '../data/site';
import { cx } from '../lib/cx';
import { SmartLink } from './SmartLink';
import s from './Breadcrumbs.module.css';

function findTrail(path: string): NavLinkItem[] {
  for (const item of primaryNav) {
    if (item.to === path) return [item];
    const child = item.children?.find((c) => c.to === path);
    if (child) return child.to === item.to ? [item] : [item, child];
  }
  const loose = [...footerNav.menu, ...footerNav.services].find((l) => l.to === path);
  return loose ? [loose] : [];
}

export function Breadcrumbs({ path, className }: { path: string; className?: string }) {
  const trail = findTrail(path);
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cx(s.crumbs, className)}>
      <ol role="list">
        <li>
          <SmartLink to="/">Home</SmartLink>
        </li>
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.to}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <SmartLink to={item.to}>{item.label}</SmartLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
