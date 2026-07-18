import { useContext, useEffect, useState } from 'react'
import {
  Controls,
  Description,
  DocsContext,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { DEFAULT_LOCALE, type Locale } from '@/i18n'
import {
  componentDocsEn,
  componentDocsPt,
  docsSharedEn,
  docsSharedPt,
  type ComponentDocId,
} from './componentDocsCatalog'

export type ComponentDocsPageProps = {
  id: ComponentDocId
}

/**
 * The docs page renders outside the preview decorators (no I18nProvider) and
 * Storybook preview hooks (useGlobals) are not allowed here either. We read the
 * toolbar locale from the DocsContext (primary story globals) and stay reactive
 * by listening to the `globalsUpdated` channel event.
 */
function useDocsLocale(): Locale {
  const docsContext = useContext(DocsContext)

  const readLocale = (): Locale => {
    try {
      const stories = docsContext.componentStories()
      const primary = stories[0]
      if (!primary) return DEFAULT_LOCALE
      const ctx = docsContext.getStoryContext(primary)
      return (ctx.globals?.locale as Locale) || DEFAULT_LOCALE
    } catch {
      return DEFAULT_LOCALE
    }
  }

  const [locale, setLocale] = useState<Locale>(readLocale)

  useEffect(() => {
    const channel = docsContext.channel
    if (!channel) return
    const handler = (payload?: { globals?: Record<string, unknown> }) => {
      const next = payload?.globals?.locale as Locale | undefined
      setLocale(next ?? readLocale())
    }
    channel.on('globalsUpdated', handler)
    return () => {
      channel.off('globalsUpdated', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docsContext])

  return locale
}

/** Autodocs page with bilingual narrative (toolbar locale) + controls/stories. */
export function ComponentDocsPage({ id }: ComponentDocsPageProps) {
  const locale = useDocsLocale()
  const shared = locale === 'en' ? docsSharedEn : docsSharedPt
  const doc = (locale === 'en' ? componentDocsEn : componentDocsPt)[id]

  return (
    <>
      <Title />
      <Subtitle />
      <Description />

      <div className="sb-unstyled mb-10 mt-2 max-w-3xl space-y-6 text-left text-text">
        <p className="text-base leading-relaxed text-text-muted">{doc.lead}</p>

        <section className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
            {shared.whenToUse}
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">{doc.when}</p>
        </section>

        <section className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
            {shared.guidelines}
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">{doc.guidelines}</p>
        </section>

        <section className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
            {shared.accessibility}
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">{doc.a11y}</p>
        </section>
      </div>

      <Primary />
      <Controls />
      <Stories />
    </>
  )
}

/** Storybook parameters.docs.page factory for component metas. */
export function componentDocsParameters(id: ComponentDocId) {
  return {
    docs: {
      page: () => <ComponentDocsPage id={id} />,
    },
  }
}
