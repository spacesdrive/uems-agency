import { Button } from '../../components/Button';
import { HeroBackdrop } from '../../components/HeroBackdrop';
import { Icon } from '../../components/Icon';
import { Img } from '../../components/Img';
import { hero } from '../../data/home';
import { site } from '../../data/site';
import { cx } from '../../lib/cx';
import s from './HomeHero.module.css';

export function HomeHero() {
  return (
    <section className={s.hero} aria-labelledby="home-title">
      <HeroBackdrop />
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
          <p className={s.eyebrow}>{hero.eyebrow}</p>
          <h1 id="home-title" className={s.title}>
            {hero.title}
          </h1>
          <p className={s.lead}>{hero.lead}</p>
          <div className={s.actions}>
            <Button to="/contact-us" label="Contact us now" />
            <a href={site.reviews.listUrl} target="_blank" rel="noopener noreferrer" className={s.badge}>
              <Icon name="star" size={18} className={s.star} />
              <span className={s.badgeText}>{site.reviews.rating} on Google</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className={s.meta}>
          <div className={s.photo}>
            <Img
              name={hero.image.name}
              alt={hero.image.alt}
              priority
              sizes="(min-width: 1100px) 500px, (min-width: 640px) 480px, 90vw"
              className={s.photoImg}
            />
          </div>
          <dl className={s.facts}>
            {hero.facts.map((f) => (
              <div key={f.label} className={s.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className={s.destinations}>
            <span className="t-label">Top destinations</span>
            <ul role="list">
              {hero.destinations.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
