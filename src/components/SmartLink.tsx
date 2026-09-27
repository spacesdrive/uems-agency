import type { AnchorHTMLAttributes, FocusEvent, MouseEvent, ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { linkKind } from '../lib/links';
import { preloadRoute } from '../routes';

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  to: string;
  className?: string | ((state: { isActive: boolean }) => string);
  /** Use NavLink semantics (aria-current) for internal links. */
  nav?: boolean;
  end?: boolean;
  children: ReactNode;
}

/**
 * Renders a router link for internal paths (preloading the route chunk on intent)
 * and a plain anchor for everything else. External links open in a new tab.
 */
export function SmartLink({ to, className, nav = false, end, children, onMouseEnter, onFocus, ...rest }: SmartLinkProps) {
  const kind = linkKind(to);

  if (kind === 'internal') {
    const intent = () => preloadRoute(to);
    const handlers = {
      onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => {
        intent();
        onMouseEnter?.(e);
      },
      onFocus: (e: FocusEvent<HTMLAnchorElement>) => {
        intent();
        onFocus?.(e);
      },
      onTouchStart: intent,
    };
    if (nav) {
      return (
        <NavLink to={to} end={end} className={className} {...handlers} {...rest}>
          {children}
        </NavLink>
      );
    }
    const staticClass = typeof className === 'function' ? className({ isActive: false }) : className;
    return (
      <Link to={to} className={staticClass} {...handlers} {...rest}>
        {children}
      </Link>
    );
  }

  const staticClass = typeof className === 'function' ? className({ isActive: false }) : className;
  const external = kind === 'external';
  return (
    <a
      href={to}
      className={staticClass}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      {...rest}
    >
      {children}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
