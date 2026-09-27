import { Img } from '../../components/Img';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { SectionHeading } from '../../components/SectionHeading';
import { affiliations, team } from '../../data/home';
import s from './TeamAffiliations.module.css';

export function TeamAffiliations({ index }: { index: number }) {
  return (
    <Section tone="muted" labelledBy="team-title">
      <Reveal>
        <SectionHeading index={index} label={team.label} title={team.title} id="team-title" />
      </Reveal>
      <div className={s.gallery}>
        {team.photos.map((photo, i) => (
          <Reveal key={photo.name} className={s.photo} delay={i * 90}>
            <Img name={photo.name} alt={photo.alt} sizes={i === 1 ? '(min-width: 768px) 28vw, 100vw' : '(min-width: 768px) 36vw, 100vw'} />
          </Reveal>
        ))}
      </div>

      <div className={s.affiliations}>
        <h3 className="t-label">Our affiliations</h3>
        <ul role="list" className={s.logos}>
          {affiliations.map((a, i) => (
            <Reveal as="li" key={a.name} className={s.logo} delay={(i % 4) * 50}>
              <Img name={a.image} alt={a.name} sizes="160px" />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
