/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional JSON endpoint that receives enquiry form submissions. */
  readonly VITE_ENQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
