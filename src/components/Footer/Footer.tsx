import type { ReactNode } from 'react';
import { footerNav, site } from '../../data/site';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Img } from '../Img';
import { SectionHeading } from '../SectionHeading';
import { SmartLink } from '../SmartLink';
import s from './Footer.module.css';

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <SmartLink to={to} className={s.link}>
      <Icon name="arrow-up-right" size={13} className={s.linkIcon} />
      {children}
    </SmartLink>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className={s.footer}>
      <div className="container">
        <div className={s.cta}>
          <SectionHeading
            label="Free counselling"
            tone="dark"
            title={
              <>
                Not sure which destination
                <br className={s.br} /> is right for you?
              </>
            }
            className={s.ctaHeading}
          />
          <div className={s.ctaSide}>
            <p className={s.ctaText}>Let our experts map out the perfect country and course based on your profile.</p>
            <Button to="/contact-us" label="Book free counselling" />
            <a href={`mailto:${site.email}`} className={s.ctaMail}>
              {site.email}
            </a>
          </div>
        </div>

        <div className={s.grid}>
          <div className={s.brandCol}>
            <SmartLink to="/" className={s.brand} aria-label={`${site.name} home`}>
              <span className={s.brandMark}>
                <Img name="brand-mark" alt="" eager className={s.brandImg} />
              </span>
              <span aria-hidden="true">{site.name}</span>
            </SmartLink>
            <p className={s.summary}>{site.summary}</p>
            <span className={s.status}>
              <span className={s.dot} aria-hidden="true" />
              Free consultation · responds within 24 hrs
            </span>
          </div>

          <nav aria-labelledby="footer-menu" className={s.col}>
            <h3 id="footer-menu" className="t-label">
              Menu
            </h3>
            <ul role="list">
              {footerNav.menu.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services" className={s.col}>
            <h3 id="footer-services" className="t-label">
              Services
            </h3>
            <ul role="list">
              {footerNav.services.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.col}>
            <h3 className="t-label">Contact</h3>
            <address className={s.address}>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className={s.link}>
                {site.address.join(', ')}
                <span className="visually-hidden"> (opens map in a new tab)</span>
              </a>
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className={s.link}>
                  {p.display}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className={s.link}>
                {site.email}
              </a>
            </address>
            <ul role="list" className={s.socials} aria-label="Social media">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={s.social} aria-label={`${social.label} (opens in a new tab)`}>
                    <Icon name={social.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={s.watermark} aria-hidden="true" />

      <div className="container">
        <div className={s.bottom}>
          <p>Copyright 2020 {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
