import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from 'lucide-react'
import { Link } from './Link'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('link'),
  },
  args: {
    children: 'View documentation',
    href: '#',
    variant: 'default',
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Muted: Story = {
  args: { variant: 'muted', children: 'Learn more about billing' },
}

export const Subtle: Story = {
  args: { variant: 'subtle', children: 'Show details' },
}

export const Nav: Story = {
  args: { variant: 'nav', children: 'Dashboard' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete account' },
}

export const External: Story = {
  args: {
    external: true,
    href: 'https://example.com',
    children: (
      <>
        Open docs
        <ExternalLink className="size-3.5" />
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link variant="default" href="#">
        Default link
      </Link>
      <Link variant="muted" href="#">
        Muted link
      </Link>
      <Link variant="subtle" href="#">
        Subtle link
      </Link>
      <Link variant="nav" href="#">
        Navigation link
      </Link>
      <Link variant="danger" href="#">
        Danger link
      </Link>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link size="sm" href="#">
        Small link
      </Link>
      <Link size="md" href="#">
        Medium link
      </Link>
      <Link size="lg" href="#">
        Large link
      </Link>
    </div>
  ),
}
