import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './Typography'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('typography'),
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body',
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Mia Dashboard' },
}

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Analytics Overview' },
}

export const Body: Story = {}

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Secondary descriptive text for supporting content.',
  },
}

export const Label: Story = {
  args: { variant: 'label', children: 'Email address' },
}

export const Overline: Story = {
  args: { variant: 'overline', children: 'Recent activity' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body">Body text for paragraphs and general content.</Typography>
      <Typography variant="bodySm">Small body text for compact layouts.</Typography>
      <Typography variant="muted">Muted text for secondary information.</Typography>
      <Typography variant="caption">Caption text for fine print.</Typography>
      <Typography variant="label">Form label</Typography>
      <Typography variant="overline">Section overline</Typography>
    </div>
  ),
}

export const CustomElement: Story = {
  args: {
    as: 'span',
    variant: 'h3',
    children: 'Rendered as span with h3 styles',
  },
}
