import { AppointmentForm } from '../components/AppointmentForm';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { site } from '../data/site';
import s from '../sections/ContactSection.module.css';

const path = site.appointmentPath;

const steps = [
  { title: 'Choose a date and time', text: 'Tell us when suits you and how you would like to meet.' },
  { title: 'We confirm by email or phone', text: 'Your request is emailed to our team, who confirm the slot within 24 hours.' },
  { title: 'Meet your counsellor', text: 'In person at our Mumbai office, on a video call or over the phone.' },
];

export default function BookAppointmentPage() {
  return (
    <>
      <Seo
        title="Book an Appointment"
        description={`Request an appointment with UEMS Ventures for study abroad, migration or career counselling. Your request is emailed to ${site.email} and we confirm within 24 hours.`}
        path={path}
        noIndex
      />
      <PageHero
        path={path}
        hero={{
          eyebrow: 'Book appointment',
          title: 'Book an appointment with our experts',
          lead: [
            'Choose a preferred date and time for a session on study abroad, migration, career counselling or exam coaching. We will confirm your appointment by email or phone within 24 hours.',
          ],
          actions: [
            { label: `Call ${site.phones[0].display}`, to: site.phones[0].href },
            { label: 'Send a general enquiry', to: '/contact-us', variant: 'outline' },
          ],
        }}
      />
      <Section id="appointment" labelledBy="appointment-title">
        <div className={s.grid}>
          <div className={s.aside}>
            <Reveal>
              <SectionHeading index={1} label="How it works" title="Three simple steps" id="appointment-title" size="compact" />
            </Reveal>
            <Reveal className={s.details} delay={80}>
              {steps.map((step, i) => (
                <div key={step.title} className={s.detail}>
                  <span className={s.detailIcon} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="t-label">{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
              <div className={s.detail}>
                <span className={s.detailIcon}>
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <h3 className="t-label">Prefer to talk now?</h3>
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
          </div>

          <Reveal delay={100}>
            <AppointmentForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
