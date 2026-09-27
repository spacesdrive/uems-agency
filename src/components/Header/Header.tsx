import { useCallback, useEffect, useId, useRef, useState, type PointerEvent, type SetStateAction } from 'react';
import { useLocation } from 'react-router';
import { primaryNav, site, type NavItem } from '../../data/site';
import { cx } from '../../lib/cx';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Img } from '../Img';
import { SmartLink } from '../SmartLink';
import { MobileMenu } from './MobileMenu';
import s from './Header.module.css';

function isSectionActive(item: NavItem, pathname: string): boolean {
  if (item.to === '/') return pathname === '/';
  const paths = [item.to, ...(item.children?.map((c) => c.to) ?? [])];
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Explicit opens/closes (click, Escape, outside click) cancel a pending hover change,
  // so a hover timer can never reopen a dropdown the user just closed.
  const chooseItem = useCallback((next: SetStateAction<string | null>) => {
    window.clearTimeout(hoverTimer.current);
    setOpenItem(next);
  }, []);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close menus whenever the route changes (adjusted during render, not in an effect).
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
    setOpenItem(null);
  }

  // Scroll state is written to a data attribute to avoid re-rendering on scroll.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const hide = y > lastY && y > 480 && el.dataset.locked !== 'true';
      el.dataset.scroll = y < 8 ? 'top' : hide ? 'hidden' : 'scrolled';
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) headerRef.current.dataset.locked = String(menuOpen || openItem !== null);
  }, [menuOpen, openItem]);

  useEffect(() => {
    if (!menuOpen && openItem === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      chooseItem(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) chooseItem(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen, openItem, chooseItem]);

  const hoverOpen = useCallback((label: string | null, e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenItem(label), label ? 60 : 140);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header ref={headerRef} className={s.header} data-scroll="top">
      <div className={s.inner}>
        <nav aria-label="Main" className={s.bar}>
          <SmartLink to="/" className={s.brand} aria-label={`${site.name} home`}>
            <span className={s.brandMark}>
              <Img name="brand-mark" alt="" priority className={s.brandImg} />
            </span>
            <span className={s.brandName} aria-hidden="true">
              UEMS <span>Ventures</span>
            </span>
          </SmartLink>

          <ul className={s.links} role="list">
            {primaryNav
              .filter((item) => item.to !== '/')
              .map((item) =>
                item.children ? (
                  <DropdownItem
                    key={item.label}
                    item={item}
                    active={isSectionActive(item, pathname)}
                    open={openItem === item.label}
                    onToggle={() => chooseItem((cur) => (cur === item.label ? null : item.label))}
                    onClose={() => chooseItem(null)}
                    onHover={hoverOpen}
                  />
                ) : (
                  <li key={item.label}>
                    <SmartLink nav end to={item.to} className={({ isActive }) => cx(s.link, isActive && s.active)}>
                      {item.label}
                    </SmartLink>
                  </li>
                ),
              )}
          </ul>

          <div className={s.actions}>
            <SmartLink to="/career-clarity-tests" className={s.clarity}>
              Get career clarity
            </SmartLink>
            <Button to={site.appointmentUrl} label="Book appointment" variant="dark" size="sm" className={s.cta} />
            <button
              ref={menuButtonRef}
              type="button"
              className={s.menuButton}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </nav>
      </div>
      <MobileMenu id="mobile-menu" open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </header>
  );
}

interface DropdownItemProps {
  item: NavItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onHover: (label: string | null, e: PointerEvent) => void;
}

function DropdownItem({ item, active, open, onToggle, onClose, onHover }: DropdownItemProps) {
  const panelId = useId();
  const children = item.children ?? [];
  const [overview, ...rest] = children;

  return (
    // Hover only opens the panel early for pointer users; the button below is the keyboard control.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={s.dropdown}
      onPointerEnter={(e) => onHover(item.label, e)}
      onPointerLeave={(e) => onHover(null, e)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        className={cx(s.link, active && s.active)}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {item.label}
        <Icon name="chevron-down" size={14} className={s.chevron} />
      </button>
      <div id={panelId} className={s.panel} data-open={open}>
        <div className={s.panelCard}>
          {overview && (
            <SmartLink to={overview.to} className={s.panelOverview}>
              <span>
                <span className={s.panelKicker}>{item.label}</span>
                <span className={s.panelTitle}>{overview.label}</span>
              </span>
              <span className={s.panelArrow}>
                <Icon name="arrow-right" size={14} />
              </span>
            </SmartLink>
          )}
          <ul role="list" className={cx(s.panelList, rest.length > 5 && s.panelListWide)}>
            {rest.map((child) => (
              <li key={child.to}>
                <SmartLink nav end to={child.to} className={({ isActive }) => cx(s.panelLink, isActive && s.panelLinkActive)}>
                  {child.label}
                  <Icon name="arrow-up-right" size={13} className={s.panelLinkIcon} />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
