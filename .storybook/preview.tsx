import type { Preview } from '@storybook/react-vite'
import { I18nProvider, DEFAULT_LOCALE, type Locale } from '../src/i18n'
import { installFocusPatchGuard, restoreNativeFocus } from './restoreNativeFocus'
import '../src/index.css'

// Must run before addon-docs / React Aria touch HTMLElement.prototype.focus
restoreNativeFocus()
installFocusPatchGuard()

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Idioma da interface / UI language',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'pt-BR', title: 'Português (Brasil)', right: '🇧🇷' },
          { value: 'en', title: 'English', right: '🇺🇸' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: DEFAULT_LOCALE,
  },
  decorators: [
    (Story, context) => {
      // Storybook re-patches focus in test loaders; restore before each render
      restoreNativeFocus()
      const locale = (context.globals.locale as Locale) || DEFAULT_LOCALE
      return (
        <I18nProvider locale={locale}>
          <Story />
        </I18nProvider>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#F4F7FB' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#111827' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Introdução',
          'Fundamentos',
          'Fundação',
          'Formulários',
          'Feedback',
          'Dados',
          'Navegação',
          'Layout',
          'Padrões',
          // English fallbacks (during migration / dual titles)
          'Introduction',
          'Foundations',
          'Foundation',
          'Forms',
          'Data Display',
          'Navigation',
          'Patterns',
        ],
      },
    },
  },
}

export default preview
