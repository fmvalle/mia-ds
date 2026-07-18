import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid } from './Grid'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('grid'),
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Card = ({ label }: { label: string }) => (
  <div className="rounded-xl bg-surface p-4 text-sm font-medium text-text shadow-card">{label}</div>
)

export const Responsive: Story = {
  args: {
    cols: 1,
    md: 2,
    lg: 3,
    gap: 4,
    children: (
      <>
        <Card label="Card 1" />
        <Card label="Card 2" />
        <Card label="Card 3" />
        <Card label="Card 4" />
        <Card label="Card 5" />
        <Card label="Card 6" />
      </>
    ),
  },
}

export const TwelveColumn: Story = {
  args: {
    cols: 12,
    gap: 3,
    children: (
      <>
        <div className="col-span-12 rounded-lg bg-primary-500 p-3 text-center text-sm text-white md:col-span-8">
          Main (8)
        </div>
        <div className="col-span-12 rounded-lg bg-secondary-500 p-3 text-center text-sm text-white md:col-span-4">
          Side (4)
        </div>
      </>
    ),
  },
}
