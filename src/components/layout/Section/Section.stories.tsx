import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid } from '../Grid'
import { Section } from './Section'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('section'),
    layout: 'padded',
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Revenue Forecast',
    subtitle: 'Overview of Profit',
    children: (
      <div className="h-40 rounded-xl bg-surface shadow-card" />
    ),
  },
}

export const WithActions: Story = {
  args: {
    title: 'Recent Transactions',
    subtitle: 'Latest activity from your account',
    actions: (
      <button
        type="button"
        className="text-sm font-medium text-primary-500 hover:text-primary-600"
      >
        View all
      </button>
    ),
    children: (
      <Grid cols={1} md={3} gap={4}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-xl bg-surface p-4 shadow-card">
            <p className="text-sm text-text-muted">Transaction {n}</p>
          </div>
        ))}
      </Grid>
    ),
  },
}
