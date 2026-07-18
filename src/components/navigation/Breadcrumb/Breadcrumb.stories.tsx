import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('breadcrumb'),
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Dashboards', href: '#' },
      { label: 'Modern' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Settings', href: '#' }, { label: 'Profile' }],
  },
}
