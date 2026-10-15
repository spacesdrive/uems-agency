import type { BlogPost } from '../data/posts';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './PostCard.module.css';

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={s.card}>
      <div className={featured ? `${s.media} ${s.natural}` : s.media}>
        <img src={post.image} alt="" loading="lazy" decoding="async" />
      </div>
      <p className={s.meta}>
        <span>Blog</span>
        {post.date && <span>{post.date}</span>}
      </p>
      <h3 className={s.title}>
        <SmartLink to={post.url} className={s.link}>
          {post.title}
        </SmartLink>
      </h3>
      <p className={s.excerpt}>{post.excerpt}</p>
      <span className={s.read} aria-hidden="true">
        Read
        <span className={s.readIcon}>
          <Icon name="arrow-right" size={13} />
        </span>
      </span>
    </article>
  );
}
