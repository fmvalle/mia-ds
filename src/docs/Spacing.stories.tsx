import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleDocs } from '@/i18n'

const meta = {
  title: 'Fundamentos/Espaçamento e Raio',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const spaces = [
  { token: 's4', px: 4 },
  { token: 's8', px: 8 },
  { token: 's12', px: 12 },
  { token: 's16', px: 16 },
  { token: 's20', px: 20 },
  { token: 's24', px: 24 },
  { token: 's32', px: 32 },
  { token: 's40', px: 40 },
  { token: 's48', px: 48 },
  { token: 's64', px: 64 },
]

const radii = [
  { token: 'xs', px: 4 },
  { token: 'sm', px: 8 },
  { token: 'md', px: 12 },
  { token: 'lg', px: 16 },
  { token: 'xl', px: 20 },
  { token: '2xl', px: 24 },
  { token: 'pill', px: 999 },
]

export const Docs: Story = {
  name: 'Documentação',
  render: () => (
    <div className="mx-auto max-w-3xl space-y-10 px-2 py-4 text-left">
      <LocaleDocs
        pt={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Espaçamento e raio</h1>
            <p className="text-text-muted">
              Escala 4px (`SpacingTokens`) e raios (`RadiusTokens`) do Flutter SaaS DS.
            </p>
          </header>
        }
        en={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Spacing & radius</h1>
            <p className="text-text-muted">
              4px scale (`SpacingTokens`) and radii (`RadiusTokens`) from Flutter SaaS DS.
            </p>
          </header>
        }
      />

      <section className="space-y-4">
        <h2 className="text-[length:var(--text-title-md)] font-semibold">Spacing</h2>
        <div className="space-y-3">
          {spaces.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <span className="w-16 font-mono text-[length:var(--text-caption)] text-text-muted">
                {s.token}
              </span>
              <div className="h-4 rounded-xs bg-primary-500" style={{ width: s.px }} />
              <span className="text-[length:var(--text-caption)] text-text-subtle">{s.px}px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[length:var(--text-title-md)] font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-2">
              <div
                className="size-16 border-2 border-primary-500 bg-primary-50"
                style={{ borderRadius: r.px === 999 ? 9999 : r.px }}
              />
              <span className="font-mono text-[11px] text-text-muted">
                {r.token} · {r.px === 999 ? 'pill' : `${r.px}px`}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
