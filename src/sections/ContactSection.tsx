import { EnquiryForm } from '../components/EnquiryForm';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { socialCards } from '../data/home';
import { site } from '../data/site';
import s from './ContactSection.module.css';

/** Contact details, social cards and the enquiry form. */
export function ContactSection({ index }: { index?: number }) {
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className={s.grid}>
        <div className={s.aside}>
          <Reveal>
            <SectionHeading
              index={index}
              label="Get in touch"
              title="Let’s connect & guide you forward"
              intro="Send us a message and we’ll respond within 24 hours."
              id="contact-title"
              size="compact"
            />
          </Reveal>

          <Reveal className={s.details} delay={80}>
            {site.offices.map((office) => (
              <div key={office.label} className={s.detail}>
                <span className={s.detailIcon}>
                  <Icon name="map-pin" size={18} />
                </span>
                <div>
                  <h3 className="t-label">{office.label}</h3>
                  <address>
                    {office.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
                    Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            ))}
            <div className={s.detail}>
              <span className={s.detailIcon}>
                <Icon name="phone" size={18} />
              </span>
              <div>
                <h3 className="t-label">Contact</h3>
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className={s.value}>
                    {p.display}
                  </a>
                ))}
                <a href={`mailto:${site.email}`} className={s.value}>
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className={s.socials} delay={140}>
            <a href={socialCards.facebook.href} target="_blank" rel="noopener noreferrer" className={s.social}>
              <span className={s.socialIcon}>
                <Icon name="facebook" size={18} />
              </span>
              <span className={s.socialBody}>
                <span className="t-label">Facebook</span>
                <strong>{socialCards.facebook.title}</strong>
                <span className={s.socialCta}>
                  {socialCards.facebook.cta} <Icon name="arrow-up-right" size={13} />
                </span>
              </span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={socialCards.linkedin.href} target="_blank" rel="noopener noreferrer" className={s.social}>
              <span className={s.socialIcon}>
                <Icon name="linkedin" size={18} />
              </span>
              <span className={s.socialBody}>
                <span className="t-label">LinkedIn · {socialCards.linkedin.subtitle}</span>
                <strong>{socialCards.linkedin.title}</strong>
                <span className={s.socialText}>{socialCards.linkedin.text}</span>
                <span className={s.socialStats}>
                  {socialCards.linkedin.stats.map((st) => (
                    <span key={st.label}>
                      <b>{st.value}</b> {st.label}
                    </span>
                  ))}
                </span>
                <span className={s.socialCta}>
                  {socialCards.linkedin.cta} <Icon name="arrow-up-right" size={13} />
                </span>
              </span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <EnquiryForm />
        </Reveal>
      </div>
    </Section>
  );
}
