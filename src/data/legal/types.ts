export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDocument {
  readonly title: string;
  readonly sections: readonly LegalSection[];
}
