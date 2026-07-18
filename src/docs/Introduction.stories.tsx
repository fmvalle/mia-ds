import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleDocs } from '@/i18n'

const meta = {
  title: 'Introdução/Começando',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function DocShell({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-2 py-4 text-left text-text [&_code]:rounded [&_code]:bg-surface-subtle [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:text-[length:var(--text-display)] [&_h1]:font-bold [&_h2]:text-[length:var(--text-title-lg)] [&_h2]:font-semibold [&_li]:text-text-muted [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-text-muted [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-surface-subtle [&_pre]:p-4 [&_pre]:text-sm [&_table]:w-full [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border-b [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
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
          <h1>Mia Design System</h1>
          <p>
            Design system React do ecossistema MIA. Tokens e aparência alinhados ao Flutter SaaS DS
            (<code>mia-app</code>), para depois migrar o <code>mia-school-admin</code>.
          </p>
          <h2>Idioma</h2>
          <p>
            Use o <strong>globo</strong> na toolbar do Storybook para alternar entre{' '}
            <strong>Português (Brasil)</strong> e <strong>English</strong>. O padrão é pt-BR.
          </p>
          <h2>Stack</h2>
          <ul>
            <li>React 19 + TypeScript</li>
            <li>Tailwind CSS v4 (tokens via @theme — paridade Flutter)</li>
            <li>Storybook 10 (docs, a11y, controls)</li>
            <li>i18n próprio (src/i18n) — pt-BR + en</li>
            <li>lucide-react, CVA, clsx, tailwind-merge</li>
          </ul>
          <h2>Tokens principais</h2>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Valor</th>
                <th>Uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primary</td>
                <td>
                  <code>#8E3FF5</code>
                </td>
                <td>CTAs, links, FAB, marca Mia</td>
              </tr>
              <tr>
                <td>Surface muted</td>
                <td>
                  <code>#F9FAFB</code>
                </td>
                <td>Fundo de página (NeutralLight.n50)</td>
              </tr>
              <tr>
                <td>Font</td>
                <td>Poppins</td>
                <td>Tipografia global (igual Flutter)</td>
              </tr>
            </tbody>
          </table>
          <h2>Categorias</h2>
          <ol>
            <li>Fundação — Button, Avatar, Badge, Typography…</li>
            <li>Formulários — Input, Select, Switch, FileUpload…</li>
            <li>Feedback — Alert, Modal, Drawer, Toast…</li>
            <li>Dados — Card, StatCard, WelcomeBanner, Table…</li>
            <li>Navegação — Sidebar, Header, Breadcrumb, FAB…</li>
            <li>Layout — AppShell, Grid, Stack, Section…</li>
            <li>Padrões — composições de dashboard</li>
          </ol>
          <h2>Uso</h2>
          <pre>{`import { Button } from '@/components'
import { I18nProvider, useI18n } from '@/i18n'

function Example() {
  const { t } = useI18n()
  return <Button>{t('common.save')}</Button>
}`}</pre>
          <h2>Scripts</h2>
          <pre>{`make storybook   # http://localhost:6006
make build       # Storybook estático
make deploy      # preview Vercel`}</pre>
        </DocShell>
      }
      en={
        <DocShell>
          <h1>Mia Design System</h1>
          <p>
            React design system for the MIA ecosystem. Tokens and visuals aligned with the Flutter
            SaaS DS (<code>mia-app</code>), preparing migration of <code>mia-school-admin</code>.
          </p>
          <h2>Language</h2>
          <p>
            Use the <strong>globe</strong> in the Storybook toolbar to switch between{' '}
            <strong>Português (Brasil)</strong> and <strong>English</strong>. Default is pt-BR.
          </p>
          <h2>Stack</h2>
          <ul>
            <li>React 19 + TypeScript</li>
            <li>Tailwind CSS v4 (tokens via @theme — Flutter parity)</li>
            <li>Storybook 10 (docs, a11y, controls)</li>
            <li>Built-in i18n (src/i18n) — pt-BR + en</li>
            <li>lucide-react, CVA, clsx, tailwind-merge</li>
          </ul>
          <h2>Main tokens</h2>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Value</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primary</td>
                <td>
                  <code>#8E3FF5</code>
                </td>
                <td>CTAs, links, FAB, Mia brand</td>
              </tr>
              <tr>
                <td>Surface muted</td>
                <td>
                  <code>#F9FAFB</code>
                </td>
                <td>Page background (NeutralLight.n50)</td>
              </tr>
              <tr>
                <td>Font</td>
                <td>Poppins</td>
                <td>Global typography (matches Flutter)</td>
              </tr>
            </tbody>
          </table>
          <h2>Categories</h2>
          <ol>
            <li>Foundation — Button, Avatar, Badge, Typography…</li>
            <li>Forms — Input, Select, Switch, FileUpload…</li>
            <li>Feedback — Alert, Modal, Drawer, Toast…</li>
            <li>Data — Card, StatCard, WelcomeBanner, Table…</li>
            <li>Navigation — Sidebar, Header, Breadcrumb, FAB…</li>
            <li>Layout — AppShell, Grid, Stack, Section…</li>
            <li>Patterns — dashboard compositions</li>
          </ol>
          <h2>Usage</h2>
          <pre>{`import { Button } from '@/components'
import { I18nProvider, useI18n } from '@/i18n'

function Example() {
  const { t } = useI18n()
  return <Button>{t('common.save')}</Button>
}`}</pre>
          <h2>Scripts</h2>
          <pre>{`make storybook   # http://localhost:6006
make build       # static Storybook
make deploy      # Vercel preview`}</pre>
        </DocShell>
      }
    />
  ),
}
