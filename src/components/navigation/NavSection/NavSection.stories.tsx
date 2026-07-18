import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, LayoutGrid, Mail } from 'lucide-react'
import { NavItem } from '../NavItem'
import { NavSection } from './NavSection'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/NavSection',
  component: NavSection,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('navSection'),
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <nav className="w-64 rounded-xl bg-surface p-2 shadow-card">
        <Story />
      </nav>
    ),
  ],
} satisfies Meta<typeof NavSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboards',
    children: (
      <>
        <NavItem icon={Home} label="Modern" href="#" active />
        <NavItem icon={LayoutGrid} label="Analytics" href="#" />
      </>
    ),
  },
}

export const MultipleSections: Story = {
  args: {
    children: null,
  },
  render: () => (
    <>
      <NavSection title="Dashboards">
        <NavItem icon={Home} label="Modern" href="#" active />
        <NavItem icon={LayoutGrid} label="Analytics" href="#" />
      </NavSection>
      <NavSection title="Front Pages">
        <NavItem icon={Mail} label="Landing" href="#" />
      </NavSection>
    </>
  ),
}
