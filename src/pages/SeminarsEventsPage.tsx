import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { SmartLink } from '../components/SmartLink';
import { pastEvents, upcomingEvents, type EventItem } from '../data/events';
import { site } from '../data/site';
import s from './ListingPage.module.css';

const path = '/news-and-events';

function EventList({ items }: { items: readonly EventItem[] }) {
  return (
    <ul role="list" className={s.list} style={{ marginTop: 'clamp(32px, 1.5rem + 2vw, 56px)' }}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.url + item.title} className={s.row} delay={(i % 6) * 50}>
          <span className={s.date}>{item.date}</span>
          <div>
            <h3 className={s.rowTitle}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={s.rowLink}>
                {item.title}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </h3>
            {item.video && (
              <a href={item.video} target="_blank" rel="noopener noreferrer" className={s.rowVideo}>
                <Icon name="play" size={15} /> Watch on YouTube
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <span className={s.rowIcon} aria-hidden="true">
            <Icon name="arrow-up-right" size={14} />
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

export default function SeminarsEventsPage() {
  return (
    <>
      <Seo
        title="Seminars & Events"
        description="Career clarity seminars, webinars and education fairs by UEMS Ventures for schools, colleges and community groups, with event videos on the UEMS Ventures YouTube channel."
        path={path}
      />
      <PageHero
        path={path}
        hero={{
          eyebrow: 'Seminars & events',
          title: 'Seminars, webinars and events',
          lead: [
            'UEMS Ventures runs career clarity seminars and webinars for schools, colleges and community groups. Watch our event videos on YouTube, and read about each event on the UEMS blog.',
          ],
          actions: [
            { label: 'Watch on YouTube', to: site.youtubeUrl },
            { label: 'Host a career talk', to: '/career-talk', variant: 'outline' },
          ],
        }}
      />

      <Section tone="light" labelledBy="events-upcoming">
        <Reveal>
          <SectionHeading index={1} label="Current seminars" title="Upcoming seminars & events" id="events-upcoming" size="compact" />
        </Reveal>
        {upcomingEvents.length > 0 ? (
          <EventList items={upcomingEvents} />
        ) : (
          <Reveal>
            <p className={s.empty}>
              New seminars and events will be listed here, with videos on the{' '}
              <SmartLink to={site.youtubeUrl} className="inline-link">
                UEMS Ventures YouTube channel
              </SmartLink>
              . To bring a career seminar to your school, college or organisation, see our{' '}
              <SmartLink to="/career-talk" className="inline-link">
                career talks
              </SmartLink>{' '}
              or <SmartLink to="/contact-us" className="inline-link">contact us</SmartLink>.
            </p>
          </Reveal>
        )}
      </Section>

      <Section tone="muted" labelledBy="events-past">
        <Reveal>
          <SectionHeading index={2} label="Past events" title="Past seminars & events" id="events-past" size="compact" />
        </Reveal>
        <EventList items={pastEvents} />
      </Section>
    </>
  );
}
