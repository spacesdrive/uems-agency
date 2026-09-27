import { useRef } from 'react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { reviews } from '../../data/reviews';
import { site } from '../../data/site';
import s from './Reviews.module.css';

export function Reviews({ index }: { index: number }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('li');
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <Section id="reviews" tone="muted" labelledBy="reviews-title">
      <div className={s.head}>
        <Reveal>
          <SectionHeading
            index={index}
            label="Google reviews"
            title={`Rated ${site.reviews.rating} across ${site.reviews.count} Google reviews`}
            id="reviews-title"
            size="compact"
          />
        </Reveal>
        <div className={s.controls}>
          <button type="button" className={s.control} onClick={() => scroll(-1)} aria-label="Previous reviews">
            <Icon name="arrow-right" size={18} className={s.flip} />
          </button>
          <button type="button" className={s.control} onClick={() => scroll(1)} aria-label="Next reviews">
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>

      {/* Horizontally scrollable track must be keyboard-focusable (axe scrollable-region-focusable). */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <ul ref={trackRef} role="list" className={s.track} aria-label="Student reviews" tabIndex={0}>
        {reviews.map((review) => (
          <li key={review.name} className={s.card}>
            <figure className={s.figure}>
              <div className={s.stars} role="img" aria-label={`Rated ${review.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={16} className={i < review.rating ? s.starOn : s.starOff} />
                ))}
              </div>
              <blockquote className={s.text}>
                <p>{review.text}</p>
              </blockquote>
              <figcaption className={s.author}>
                <span className={s.avatar} aria-hidden="true">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  <span>Google review</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={s.actions}>
        <Button to={site.reviews.listUrl} label={`View all ${site.reviews.count} reviews on Google`} variant="dark" />
        <Button to={site.reviews.writeUrl} label="Write a review" variant="outline" />
      </div>
    </Section>
  );
}
