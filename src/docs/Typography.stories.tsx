import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleDocs } from '@/i18n'
import { Typography } from '@/components/ui/Typography'

const meta = {
  title: 'Fundamentos/Tipografia',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { variant: 'display' as const, label: 'display / displaySmall', size: '28px', weight: '600–700' },
  { variant: 'h2' as const, label: 'headlineMedium', size: '24px', weight: '700' },
  { variant: 'h3' as const, label: 'titleLarge', size: '20px', weight: '600' },
  { variant: 'h4' as const, label: 'titleMedium', size: '18px', weight: '600' },
  { variant: 'h5' as const, label: 'titleSmall', size: '16px', weight: '600' },
  { variant: 'body' as const, label: 'bodyLarge', size: '16px', weight: '400' },
  { variant: 'bodySm' as const, label: 'bodyMedium', size: '14px', weight: '400' },
  { variant: 'caption' as const, label: 'caption / bodySmall', size: '12px', weight: '400' },
  { variant: 'label' as const, label: 'labelLarge', size: '14px', weight: '500' },
  { variant: 'overline' as const, label: 'overline', size: '11px', weight: '600' },
]

export const Docs: Story = {
  name: 'Documentação',
  render: () => (
    <div className="mx-auto max-w-3xl space-y-8 px-2 py-4 text-left">
      <LocaleDocs
        pt={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Tipografia</h1>
            <p className="text-text-muted">
              Família <strong>Poppins</strong> (igual ao Flutter). Escala ={' '}
              <code className="text-sm">TypographyScale</code> em{' '}
              <code className="text-sm">app_theme_tokens.dart</code>.
            </p>
          </header>
        }
        en={
          <header className="space-y-2">
            <h1 className="text-[length:var(--text-display)] font-bold text-text">Typography</h1>
            <p className="text-text-muted">
              Family <strong>Poppins</strong> (matches Flutter). Scale ={' '}
              <code className="text-sm">TypographyScale</code> in{' '}
              <code className="text-sm">app_theme_tokens.dart</code>.
            </p>
          </header>
        }
      />
      <div className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-card">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 border-b border-divider pb-4 last:border-0 last:pb-0">
            <Typography variant={row.variant}>Mia Educação — {row.label}</Typography>
            <p className="font-mono text-[11px] text-text-subtle">
              {row.size} · weight {row.weight}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
}
