import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { PostCard } from '../../components/PostCard';
import { blogPosts } from '../../data/posts';
import s from './Insights.module.css';

export function Insights({ index }: { index: number }) {
  return (
    <Section labelledBy="insights-title">
      <div className={s.head}>
        <Reveal>
          <SectionHeading
            index={index}
            label="Blogs updated"
            title="Study abroad & migration insights"
            intro="Navigate your journey overseas with the latest visa updates, university guides, and immigration tips."
            id="insights-title"
            size="compact"
          />
        </Reveal>
        <Button to="/blogs" label="View all blogs" variant="outline" />
      </div>
      <ul role="list" className={s.grid}>
        {blogPosts.slice(0, 4).map((post, i) => (
          <Reveal as="li" key={post.url} delay={i * 70}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
