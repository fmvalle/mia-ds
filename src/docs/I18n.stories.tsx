import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleDocs } from '@/i18n'

const meta = {
  title: 'Introdução/i18n',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function DocShell({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-2 py-4 text-left text-text [&_code]:rounded [&_code]:bg-surface-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:text-3xl [&_h1]:font-extrabold [&_h2]:text-xl [&_h2]:font-bold [&_li]:text-text-muted [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-text-muted [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-muted [&_pre]:p-4 [&_pre]:text-sm [&_table]:w-full [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border-b [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      {children}
    </article>
  )
}

export const Docs: Story = {
  name: 'Documentação',
  render: () => (
    <LocaleDocs
      pt={
        <DocShell>
          <h1>Internacionalização (i18n)</h1>
          <p>
            O projeto inclui um i18n leve em <code>src/i18n</code> com catálogos{' '}
            <strong>pt-BR</strong> (padrão) e <strong>en</strong>.
          </p>
          <h2>No Storybook</h2>
          <ol>
            <li>Abra a toolbar</li>
            <li>
              Clique no ícone do <strong>globo</strong>
            </li>
            <li>
              Escolha <strong>Português (Brasil)</strong> ou <strong>English</strong>
            </li>
          </ol>
          <p>
            Stories e docs que usam <code>useI18n()</code> / <code>&lt;LocaleDocs /&gt;</code>{' '}
            atualizam o texto imediatamente.
          </p>
          <p>
            Na aba <strong>Docs</strong> de cada componente, o texto (quando usar, diretrizes,
            acessibilidade) também troca de idioma com o globo — via{' '}
            <code>ComponentDocsPage</code> e o catálogo em <code>docs/componentDocsCatalog.ts</code>.
          </p>
          <h2>Em aplicações</h2>
          <pre>{`import { I18nProvider, useI18n } from '@/i18n'

function Toolbar() {
  const { t, locale } = useI18n()
  return <p>{t('common.search')} — {locale}</p>
}

export function Root() {
  return (
    <I18nProvider locale="pt-BR">
      <Toolbar />
    </I18nProvider>
  )
}`}</pre>
          <h2>Interpolação</h2>
          <pre>{`t('dashboard.welcomeBack', { name: 'David' })
// → "Bem-vindo de volta, David!"`}</pre>
          <h2>Arquivos</h2>
          <table>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Função</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>messages/pt-BR.ts</code>
                </td>
                <td>Textos em português</td>
              </tr>
              <tr>
                <td>
                  <code>messages/en.ts</code>
                </td>
                <td>Textos em inglês</td>
              </tr>
              <tr>
                <td>
                  <code>I18nProvider.tsx</code>
                </td>
                <td>Context + hook</td>
              </tr>
              <tr>
                <td>
                  <code>LocaleDocs.tsx</code>
                </td>
                <td>Blocos bilíngues</td>
              </tr>
            </tbody>
          </table>
          <p>
            Para novas strings: adicione a chave nos <strong>dois</strong> catálogos e use{' '}
            <code>t(&apos;grupo.chave&apos;)</code>.
          </p>
        </DocShell>
      }
      en={
        <DocShell>
          <h1>Internationalization (i18n)</h1>
          <p>
            The project ships a lightweight i18n layer under <code>src/i18n</code> with{' '}
            <strong>pt-BR</strong> (default) and <strong>en</strong> catalogs.
          </p>
          <h2>In Storybook</h2>
          <ol>
            <li>Open the toolbar</li>
            <li>
              Click the <strong>globe</strong> icon
            </li>
            <li>
              Pick <strong>Português (Brasil)</strong> or <strong>English</strong>
            </li>
          </ol>
          <p>
            Stories and docs using <code>useI18n()</code> / <code>&lt;LocaleDocs /&gt;</code> update
            immediately.
          </p>
          <p>
            On each component&apos;s <strong>Docs</strong> tab, the copy (when to use, guidelines,
            accessibility) also switches language with the globe — via{' '}
            <code>ComponentDocsPage</code> and the catalog in{' '}
            <code>docs/componentDocsCatalog.ts</code>.
          </p>
          <h2>In consumer apps</h2>
          <pre>{`import { I18nProvider, useI18n } from '@/i18n'

function Toolbar() {
  const { t, locale } = useI18n()
  return <p>{t('common.search')} — {locale}</p>
}

export function Root() {
  return (
    <I18nProvider locale="en">
      <Toolbar />
    </I18nProvider>
  )
}`}</pre>
          <h2>Interpolation</h2>
          <pre>{`t('dashboard.welcomeBack', { name: 'David' })
// → "Welcome back, David!"`}</pre>
          <h2>Files</h2>
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>messages/pt-BR.ts</code>
                </td>
                <td>Portuguese copy</td>
              </tr>
              <tr>
                <td>
                  <code>messages/en.ts</code>
                </td>
                <td>English copy</td>
              </tr>
              <tr>
                <td>
                  <code>I18nProvider.tsx</code>
                </td>
                <td>Context + hook</td>
              </tr>
              <tr>
                <td>
                  <code>LocaleDocs.tsx</code>
                </td>
                <td>Bilingual blocks</td>
              </tr>
            </tbody>
          </table>
          <p>
            For new strings: add the key to <strong>both</strong> catalogs and call{' '}
            <code>t(&apos;group.key&apos;)</code>.
          </p>
        </DocShell>
      }
    />
  ),
}
