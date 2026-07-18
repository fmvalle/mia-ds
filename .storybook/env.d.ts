/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STORYBOOK_API_BASE_URL?: string
  readonly STORYBOOK_DISABLE_AUTH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
