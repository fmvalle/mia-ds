import type { ReactNode } from 'react'
import { useI18nOptional } from './I18nProvider'
import { DEFAULT_LOCALE, translate } from './translate'
import type { Locale } from './types'

type LocaleDocsProps = {
  /** Conteúdo em pt-BR (padrão). */
  pt: ReactNode
  /** Conteúdo em inglês. */
  en: ReactNode
}

/**
 * Renderiza blocos bilíngues conforme o locale do I18nProvider
 * (sincronizado com a toolbar do Storybook via decorator em preview.tsx).
 */
export function LocaleDocs({ pt, en }: LocaleDocsProps) {
  const i18n = useI18nOptional()
  const locale: Locale = i18n?.locale ?? DEFAULT_LOCALE
  return <>{locale === 'en' ? en : pt}</>
}

type TProps = {
  k: string
  params?: Record<string, string | number>
}

/** String traduzida inline para docs/stories. */
export function T({ k, params }: TProps) {
  const i18n = useI18nOptional()
  const locale: Locale = i18n?.locale ?? DEFAULT_LOCALE
  return <>{translate(locale, k, params)}</>
}
