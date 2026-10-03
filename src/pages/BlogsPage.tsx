import { Button } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { PostCard } from '../components/PostCard';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { blogArchiveUrl, blogPosts } from '../data/posts';
import s from './ListingPage.module.css';

const path = '/blogs';

export default function BlogsPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <Seo
        title="Blogs – Study Abroad & Migration Insights"
        description="Study abroad and migration insights from UEMS Ventures: visa updates, university guides, IELTS requirements and affordable destinations for Indian students."
        path={path}
      />
      <PageHero
        path={path}
        hero={{
          eyebrow: 'Blogs',
          title: 'Study abroad & migration insights',
          lead: ['Navigate your journey overseas with the latest visa updates, university guides, and immigration tips.'],
          actions: [{ label: 'Seminars & events', to: '/news-and-events', variant: 'outline' }],
        }}
      />

      {featured && (
        <Section tight labelledBy="latest-title">
          <Reveal>
            <SectionHeading index={1} label="Latest" />
          </Reveal>
          <h2 id="latest-title" className="visually-hidden">
            Latest article
          </h2>
          <Reveal className={s.featured}>
            <PostCard post={featured} featured />
          </Reveal>
        </Section>
      )}

      <Section tone="muted" labelledBy="all-title">
        <Reveal>
          <SectionHeading index={2} label="All articles" title="More from the blog" id="all-title" />
        </Reveal>
        <ul role="list" className={s.grid}>
          {rest.map((post, i) => (
            <Reveal as="li" key={post.url} delay={(i % 3) * 70}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
        <div className={s.more}>
          <p>Full articles open on the UEMS Ventures blog.</p>
          <Button to={blogArchiveUrl} label="Older articles" variant="dark" />
        </div>
      </Section>
    </>
  );
}
