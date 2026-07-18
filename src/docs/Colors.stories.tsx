import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleDocs } from '@/i18n'

const meta = {
  title: 'Fundamentos/Cores',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Valores espelhados de BrandColors / NeutralLight / SemanticColors (Flutter) */
const swatches = {
  Primary: {
    50: '#f5eeff',
    100: '#eadbff',
    200: '#d4b8ff',
    300: '#b685ff',
    400: '#9b5bff',
    500: '#8e3ff5',
    600: '#7b31d9',
    700: '#6826b8',
    800: '#551e96',
    900: '#3f176e',
    950: '#2a0f4a',
  },
  Secondary: {
    50: '#eff8ff',
    100: '#d1e9ff',
    500: '#2e90fa',
    600: '#1570ef',
    700: '#175cd3',
  },
  Semantic: {
    Success: '#12b76a',
    Warning: '#f79009',
    Danger: '#f04438',
    Info: '#2e90fa',
  },
  Accents: {
    Teal: '#15b79e',
    Indigo: '#444ce7',
    Rose: '#f63d68',
  },
  Neutrals: {
    'n0 Surface': '#ffffff',
    'n50 Page': '#f9fafb',
    'n100 Subtle': '#f2f4f7',
    'n200 Border': '#e4e7ec',
    'n500 Muted': '#667085',
    'n600 Text muted': '#475467',
    'n900 Text': '#101828',
  },
} as const

function SwatchGroup({
  title,
  colors,
}: {
  title: string
  colors: Record<string, string>
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-[length:var(--text-title-md)] font-bold text-text">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {Object.entries(colors).map(([name, value]) => (
          <div key={name} className="overflow-hidden rounded-md border border-border bg-surface shadow-card">
            <div className="h-16" style={{ backgroundColor: value }} />
            <div className="space-y-0.5 p-2">
              <p className="text-[length:var(--text-caption)] font-semibold text-text">{name}</p>
              <p className="font-mono text-[11px] text-text-muted">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const Docs: Story = {
  name: 'Documentação',
  render: () => (
    <div className="mx-auto max-w-4xl space-y-8 px-2 py-4 text-left">
      <LocaleDocs
        pt={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Cores</h1>
            <p className="text-text-muted">
              Paleta alinhada ao Flutter SaaS DS (`BrandColors`) — primary{' '}
              <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-sm">#8E3FF5</code>.
              Fonte: <code className="text-sm">mia-app/lib/core/design_system/app_theme_tokens.dart</code>.
            </p>
          </header>
        }
        en={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Colors</h1>
            <p className="text-text-muted">
              Palette aligned with Flutter SaaS DS (`BrandColors`) — primary{' '}
              <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-sm">#8E3FF5</code>.
              Source: <code className="text-sm">mia-app/lib/core/design_system/app_theme_tokens.dart</code>.
            </p>
          </header>
        }
      />
      <SwatchGroup title="Primary" colors={swatches.Primary} />
      <SwatchGroup title="Secondary (info)" colors={swatches.Secondary} />
      <SwatchGroup title="Semantic" colors={swatches.Semantic} />
      <SwatchGroup title="Accents" colors={swatches.Accents} />
      <SwatchGroup title="Neutrals (light)" colors={swatches.Neutrals} />
    </div>
  ),
}
