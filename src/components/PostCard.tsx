import type { BlogPost } from '../data/posts';
import { Icon } from './Icon';
import { Img } from './Img';
import s from './PostCard.module.css';

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const sizes = featured ? '(min-width: 900px) 55vw, 100vw' : '(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw';
  return (
    <article className={s.card}>
      <div className={featured ? `${s.media} ${s.natural}` : s.media}>
        <Img name={post.image} alt="" sizes={sizes} />
      </div>
      <p className={s.meta}>
        <span>Blog</span>
        {post.date && <span>{post.date}</span>}
      </p>
      <h3 className={s.title}>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className={s.link}>
          {post.title}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </h3>
      <p className={s.excerpt}>{post.excerpt}</p>
      <span className={s.read} aria-hidden="true">
        Read
        <span className={s.readIcon}>
          <Icon name="arrow-up-right" size={13} />
        </span>
      </span>
    </article>
  );
}
