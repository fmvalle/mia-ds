import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('container'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="rounded-xl bg-surface p-6 shadow-card">
        <p className="text-text-muted">Centered container content</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-muted py-8">
        <Story />
      </div>
    ),
  ],
}

export const Sizes: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-4 bg-surface-muted py-8">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-muted">
            max-width: {size}
          </div>
        </Container>
      ))}
    </div>
  ),
}
