import type { Person } from '../data/types';
import { Icon } from '../components/Icon';
import { Img } from '../components/Img';
import { Reveal } from '../components/Reveal';
import s from './blocks.module.css';

function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export function People({ items }: { items: readonly Person[] }) {
  return (
    <ul role="list" className={s.people}>
      {items.map((person, i) => (
        <Reveal as="li" key={person.name} delay={(i % 4) * 60} className={s.person}>
          <div className={s.personPhoto}>
            {person.image ? (
              <Img name={person.image} alt={`Portrait of ${person.name}`} sizes="160px" />
            ) : (
              <span className={s.personInitials} aria-hidden="true">
                {initials(person.name)}
              </span>
            )}
          </div>
          <div className={s.personBody}>
            <h3 className={s.personName}>{person.name}</h3>
            {person.role && <p className={s.personRole}>{person.role}</p>}
            {person.credentials && <p className={s.personCreds}>{person.credentials}</p>}
            {person.bio && (
              <details className={s.personBio}>
                <summary>
                  Read profile <Icon name="chevron-down" size={14} />
                </summary>
                {person.bio.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </details>
            )}
            {(person.phone || person.email) && (
              <div className={s.personContact}>
                {person.phone && (
                  <a href={`tel:${person.phone.replace(/\s/g, '')}`}>
                    <Icon name="phone" size={13} /> {person.phone}
                  </a>
                )}
                {person.email && (
                  <a href={`mailto:${person.email}`}>
                    <Icon name="mail" size={13} /> {person.email}
                  </a>
                )}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
