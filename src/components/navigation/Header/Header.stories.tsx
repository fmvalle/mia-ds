import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { Bell, Settings } from 'lucide-react'
import { Breadcrumb } from '../Breadcrumb'
import { Header } from './Header'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('header'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const IconButton = ({ label, children }: { label: string; children: ReactNode }) => (
  <button
    type="button"
    className="inline-flex size-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
    aria-label={label}
  >
    {children}
  </button>
)

const Avatar = () => (
  <button
    type="button"
    className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600"
    aria-label="User menu"
  >
    JD
  </button>
)

export const Default: Story = {
  args: {
    title: 'Dashboard',
    actions: (
      <>
        <IconButton label="Notifications">
          <Bell className="size-5" />
        </IconButton>
        <IconButton label="Settings">
          <Settings className="size-5" />
        </IconButton>
      </>
    ),
    avatar: <Avatar />,
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-muted">
        <Story />
      </div>
    ),
  ],
}

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Dashboards', href: '#' },
          { label: 'Modern' },
        ]}
      />
    ),
    actions: (
      <IconButton label="Notifications">
        <Bell className="size-5" />
      </IconButton>
    ),
    avatar: <Avatar />,
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-muted">
        <Story />
      </div>
    ),
  ],
}
