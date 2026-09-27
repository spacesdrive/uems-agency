import { BlockRenderer } from '../blocks/BlockRenderer';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import type { ContentPageData, PageSection, SectionTone } from '../data/types';
import { cx } from '../lib/cx';
import { sectionTones } from '../lib/sectionTones';
import s from './ContentPage.module.css';

export function ContentPage({ page }: { page: ContentPageData }) {
  const tones = sectionTones(page.sections);
  return (
    <>
      <Seo title={page.meta.title} description={page.meta.description} path={page.path} />
      <PageHero hero={page.hero} path={page.path} />
      {page.sections.map((section, i) => (
        <ContentSection key={section.label + i} section={section} index={i + 1} tone={tones[i] ?? 'light'} />
      ))}
    </>
  );
}

interface ContentSectionProps {
  section: PageSection;
  index: number;
  tone: SectionTone;
}

export function ContentSection({ section, index, tone }: ContentSectionProps) {
  const headingId = section.title ? `section-${index}` : undefined;
  const aside = section.layout === 'aside';

  return (
    <Section id={section.id} tone={tone} labelledBy={headingId}>
      <div className={cx(s.layout, aside && s.aside)}>
        <Reveal className={s.head}>
          <SectionHeading
            index={index}
            label={section.label}
            title={section.title}
            intro={section.intro}
            id={headingId}
            size={aside ? 'compact' : 'large'}
            tone={tone === 'dark' ? 'dark' : 'light'}
          />
        </Reveal>
        <div className={s.blocks}>
          {section.blocks.map((block, i) =>
            block.type === 'cards' || block.type === 'people' ? (
              <BlockRenderer key={i} block={block} />
            ) : (
              <Reveal key={i}>
                <BlockRenderer block={block} />
              </Reveal>
            ),
          )}
        </div>
      </div>
    </Section>
  );
}
