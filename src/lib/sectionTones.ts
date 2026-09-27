import type { PageSection, SectionTone } from '../data/types';

/** Alternates light/muted backgrounds, starting light, unless a section sets its own tone. */
export function sectionTones(sections: readonly Pick<PageSection, 'tone'>[]): SectionTone[] {
  const tones: SectionTone[] = [];
  for (const section of sections) {
    const previous = tones.at(-1) ?? 'muted';
    tones.push(section.tone ?? (previous === 'light' ? 'muted' : 'light'));
  }
  return tones;
}
