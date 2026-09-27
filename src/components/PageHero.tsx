import type { PageHero as PageHeroData } from '../data/types';
import { cx } from '../lib/cx';
import { Breadcrumbs } from './Breadcrumbs';
import { Button } from './Button';
import { HeroBackdrop } from './HeroBackdrop';
import { Img } from './Img';
import { RichText } from './RichText';
import s from './PageHero.module.css';

interface PageHeroProps {
  hero: PageHeroData;
  path: string;
}

export function PageHero({ hero, path }: PageHeroProps) {
  const { eyebrow, title, lead, actions, image, facts } = hero;

  return (
    <section className={s.hero} aria-labelledby="page-title">
      <HeroBackdrop />
      <div className={cx('container', s.inner, image && s.withImage)}>
        <div className={s.copy}>
          <Breadcrumbs path={path} className={s.crumbs} />
          <p className={s.eyebrow}>{eyebrow}</p>
          <h1 id="page-title" className={cx('t-display', s.title)}>
            {title}
          </h1>
          {lead && (
            <div className={s.lead}>
              {lead.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          )}
          {actions && actions.length > 0 && (
            <div className={s.actions}>
              {actions.map((a, i) => (
                <Button key={a.to + a.label} to={a.to} label={a.label} variant={a.variant ?? (i === 0 ? 'accent' : 'outline')} />
              ))}
            </div>
          )}
        </div>
        {image && (
          <div className={s.media}>
            <Img name={image.name} alt={image.alt} priority sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
        )}
      </div>
      {facts && facts.length > 0 && (
        <div className="container">
          <dl className={s.facts}>
            {facts.map((f) => (
              <div key={f.label} className={s.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
