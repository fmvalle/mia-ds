import type { Locale, Messages } from './types'
import { en } from './messages/en'
import { ptBR } from './messages/pt-BR'

export const DEFAULT_LOCALE: Locale = 'pt-BR'

export const catalogs: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  en,
}

export const localeLabels: Record<Locale, string> = {
  'pt-BR': 'Português (Brasil)',
  en: 'English',
}

function getByPath(obj: Messages, path: string): string | undefined {
  const parts = path.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === 'string' ? current : undefined
}

export type TranslateParams = Record<string, string | number>

export function translate(
  locale: Locale,
  key: string,
  params?: TranslateParams,
): string {
  const raw =
    getByPath(catalogs[locale], key) ??
    getByPath(catalogs[DEFAULT_LOCALE], key) ??
    key

  if (!params) return raw

  return Object.entries(params).reduce(
    (acc, [name, value]) => acc.replaceAll(`{{${name}}}`, String(value)),
    raw,
  )
}
