import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { newsGroups } from '../data/posts';
import s from './ListingPage.module.css';

const path = '/news-and-events';

export default function NewsEventsPage() {
  return (
    <>
      <Seo
        title="News & Events"
        description="News flashes, webinars, seminars and trending courses from UEMS Ventures, including career clarity webinars and school seminars across Mumbai."
        path={path}
      />
      <PageHero
        path={path}
        hero={{
          eyebrow: 'News & events',
          title: 'News, events and seminars',
          lead: ['News flashes, webinars, school seminars and trending courses from the UEMS Ventures team.'],
          actions: [{ label: 'Read the blog', to: '/blogs', variant: 'outline' }],
        }}
      />
      {newsGroups.map((group, gi) => {
        const headingId = `news-${gi + 1}`;
        return (
          <Section key={group.label} tone={gi % 2 === 0 ? 'light' : 'muted'} labelledBy={headingId}>
            <Reveal>
              <SectionHeading index={gi + 1} label={group.label} title={group.title} id={headingId} size="compact" />
            </Reveal>
            <ul role="list" className={s.list} style={{ marginTop: 'clamp(32px, 1.5rem + 2vw, 56px)' }}>
              {group.items.map((item, i) => (
                <Reveal as="li" key={item.url + item.title} className={s.row} delay={i * 50}>
                  <span className={s.date}>{item.date ?? group.label}</span>
                  <div>
                    <h3 className={s.rowTitle}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className={s.rowLink}>
                        {item.title}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </h3>
                    {item.excerpt && <p className={s.rowExcerpt}>{item.excerpt}</p>}
                  </div>
                  <span className={s.rowIcon} aria-hidden="true">
                    <Icon name="arrow-up-right" size={14} />
                  </span>
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
