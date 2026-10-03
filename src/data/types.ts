import type { ImageName } from './images';
import type { EnquiryPreset } from './site';

export type ActionVariant = 'accent' | 'dark' | 'light' | 'outline';

export interface LinkAction {
  readonly label: string;
  /** Internal path, absolute URL, `tel:` or `mailto:` link. */
  readonly to: string;
  readonly variant?: ActionVariant;
}

export interface ImageRef {
  readonly name: ImageName;
  readonly alt: string;
}

export interface CardItem {
  readonly title: string;
  readonly eyebrow?: string;
  readonly text?: string;
  readonly bullets?: readonly string[];
  readonly tags?: readonly string[];
  readonly image?: ImageRef;
  readonly facts?: readonly Fact[];
  readonly action?: LinkAction;
}

export interface Fact {
  readonly value: string;
  readonly label: string;
}

export interface Person {
  readonly name: string;
  readonly role?: string;
  readonly credentials?: string;
  readonly bio?: readonly string[];
  readonly image?: ImageName;
  readonly phone?: string;
  readonly email?: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
  readonly note?: string;
}

/** Text fields support `**bold**` and `[label](href)` inline markup. */
export type Block =
  | { readonly type: 'prose'; readonly paragraphs: readonly string[]; readonly size?: 'body' | 'lead' }
  | {
      readonly type: 'cards';
      readonly items: readonly CardItem[];
      readonly columns?: 2 | 3 | 4;
      readonly numbered?: boolean;
    }
  | { readonly type: 'checklist'; readonly title?: string; readonly items: readonly string[]; readonly columns?: 1 | 2 | 3 }
  | {
      readonly type: 'table';
      readonly caption?: string;
      readonly columns: readonly string[];
      readonly rows: readonly (readonly string[])[];
      readonly note?: string;
    }
  | { readonly type: 'steps'; readonly items: readonly { readonly title: string; readonly text?: string }[] }
  | { readonly type: 'stats'; readonly items: readonly Stat[] }
  | {
      readonly type: 'split';
      readonly image: ImageRef;
      readonly imageSide?: 'left' | 'right';
      readonly title?: string;
      readonly paragraphs?: readonly string[];
      readonly bullets?: readonly string[];
      readonly actions?: readonly LinkAction[];
    }
  | { readonly type: 'faq'; readonly items: readonly { readonly question: string; readonly answer: string }[] }
  | { readonly type: 'people'; readonly items: readonly Person[] }
  | { readonly type: 'quote'; readonly text: string; readonly cite?: string }
  | { readonly type: 'actions'; readonly items: readonly LinkAction[] }
  | { readonly type: 'gallery'; readonly items: readonly ImageRef[] }
  | { readonly type: 'tags'; readonly title?: string; readonly items: readonly string[] }
  | {
      readonly type: 'callout';
      readonly title: string;
      readonly text?: string;
      readonly actions: readonly LinkAction[];
    }
  | { readonly type: 'enquiry'; readonly preset?: EnquiryPreset }
  | { readonly type: 'registration' }
  /** IB and ICSE curriculum quizzes that run on the page (src/data/quizzes.ts). */
  | { readonly type: 'quizzes' };

export type SectionTone = 'light' | 'muted' | 'dark';

export interface PageSection {
  readonly id?: string;
  readonly label: string;
  readonly title?: string;
  readonly intro?: string;
  readonly tone?: SectionTone;
  /** `aside` places the heading in a sticky left column on wide screens. */
  readonly layout?: 'stack' | 'aside';
  readonly blocks: readonly Block[];
}

export interface PageHero {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead?: readonly string[];
  readonly actions?: readonly LinkAction[];
  readonly image?: ImageRef;
  readonly facts?: readonly Fact[];
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface ContentPageData {
  readonly path: string;
  readonly meta: PageMeta;
  readonly hero: PageHero;
  readonly sections: readonly PageSection[];
}
