import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import {
  DEFAULT_LOCALE,
  localeLabels,
  translate,
  type TranslateParams,
} from './translate'
import type { Locale } from './types'

type I18nContextValue = {
  locale: Locale
  t: (key: string, params?: TranslateParams) => string
  localeLabel: string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export type I18nProviderProps = {
  locale?: Locale
  children: ReactNode
}

export function I18nProvider({ locale = DEFAULT_LOCALE, children }: I18nProviderProps) {
  const t = useCallback(
    (key: string, params?: TranslateParams) => translate(locale, key, params),
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      t,
      localeLabel: localeLabels[locale],
    }),
    [locale, t],
  )

  return (
    <I18nContext.Provider value={value}>
      <div lang={locale} data-locale={locale}>
        {children}
      </div>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

/** Safe for stories that may render outside the provider during docs build. */
export function useI18nOptional() {
  return useContext(I18nContext)
}
