import type { ReactNode } from 'react';
import { PageHero } from '../../components/PageHero';
import { RichText } from '../../components/RichText';
import { Section } from '../../components/Section';
import { Seo } from '../../components/Seo';
import type { LegalDocument } from '../../data/legal/types';
import s from './LegalPage.module.css';

interface LegalPageProps {
  path: string;
  description: string;
  eyebrow: string;
  document?: LegalDocument;
  title?: string;
  noIndex?: boolean;
  children?: ReactNode;
}

export function LegalPage({ path, description, eyebrow, document, title, noIndex, children }: LegalPageProps) {
  const heading = title ?? document?.title ?? eyebrow;
  const showToc = (document?.sections.length ?? 0) > 3;

  return (
    <>
      <Seo title={heading} description={description} path={path} noIndex={noIndex} />
      <PageHero path={path} hero={{ eyebrow, title: heading }} />
      <Section>
        <div className={showToc ? s.withToc : s.single}>
          {showToc && document && (
            <nav aria-label="On this page" className={s.toc}>
              <p className="t-label">On this page</p>
              <ol role="list">
                {document.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a href={`#legal-${i}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className={s.body}>
            {document?.sections.map((section, i) => (
              <section key={section.heading} id={`legal-${i}`} className={s.section} aria-labelledby={`legal-${i}-h`}>
                <h2 id={`legal-${i}-h`} className={s.heading}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
              </section>
            ))}
            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
