import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { primaryNav, site } from '../../data/site';
import { cx } from '../../lib/cx';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SmartLink } from '../SmartLink';
import s from './MobileMenu.module.css';

interface MobileMenuProps {
  id: string;
  open: boolean;
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ id, open, pathname, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock page scroll and make the page behind the menu inert while open.
  useEffect(() => {
    const root = document.documentElement;
    const behind = [document.getElementById('main'), document.getElementById('site-footer')];
    if (open) {
      root.style.overflow = 'hidden';
      behind.forEach((el) => el?.setAttribute('inert', ''));
      panelRef.current?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true });
    }
    return () => {
      root.style.overflow = '';
      behind.forEach((el) => el?.removeAttribute('inert'));
    };
  }, [open]);

  return (
    <div id={id} ref={panelRef} className={s.menu} data-open={open} inert={!open}>
      <div className={s.scroller}>
        <ul role="list" className={s.list}>
          {primaryNav.map((item, i) => {
            const isOpen = expanded === item.label;
            const active = pathname === item.to;
            return (
              <li key={item.label} className={s.item} style={{ '--i': i } as CSSProperties}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={s.row}
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <span className={cx(s.toggle, isOpen && s.toggleOpen)}>
                        <Icon name="plus" size={16} />
                      </span>
                    </button>
                    <div className={s.sub} data-open={isOpen}>
                      <ul role="list" className={s.subList}>
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <SmartLink
                              to={child.to}
                              className={cx(s.subLink, pathname === child.to && s.current)}
                              aria-current={pathname === child.to ? 'page' : undefined}
                              onClick={onClose}
                            >
                              {child.label}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <SmartLink
                    to={item.to}
                    className={cx(s.row, active && s.current)}
                    aria-current={active ? 'page' : undefined}
                    onClick={onClose}
                  >
                    {item.label}
                    <Icon name="arrow-right" size={18} className={s.rowArrow} />
                  </SmartLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className={s.footer}>
          <div className={s.actions}>
            <Button to={site.appointmentUrl} label="Book appointment" variant="dark" block />
            <Button to="/career-clarity-tests" label="Get career clarity" variant="outline" block />
          </div>
          <div className={s.contact}>
            {site.phones.map((p) => (
              <a key={p.href} href={p.href}>
                <Icon name="phone" size={15} />
                {p.display}
              </a>
            ))}
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={15} />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
