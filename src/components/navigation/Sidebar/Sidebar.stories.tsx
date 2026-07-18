import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'
import {
  FileText,
  Home,
  LayoutGrid,
  Mail,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { NavItem } from '../NavItem'
import { NavSection } from '../NavSection'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Navegação/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('sidebar'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="flex size-9 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
      M
    </div>
    <span className="text-lg font-bold text-text">Mia</span>
  </div>
)

const LogoIcon = () => (
  <div className="flex size-9 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
    M
  </div>
)

const navContent = (collapsed = false) => (
  <>
    <NavSection title="Dashboards" collapsed={collapsed}>
      <NavItem icon={Home} label="Modern" href="#" active collapsed={collapsed} />
      <NavItem icon={LayoutGrid} label="Analytics" href="#" collapsed={collapsed} />
      <NavItem icon={ShoppingBag} label="eCommerce" href="#" collapsed={collapsed} />
    </NavSection>
    <NavSection title="Front Pages" collapsed={collapsed}>
      <NavItem icon={Mail} label="Landing" href="#" collapsed={collapsed} />
      <NavItem icon={FileText} label="Blog" href="#" collapsed={collapsed} />
      <NavItem icon={Users} label="About" href="#" collapsed={collapsed} />
    </NavSection>
  </>
)

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="h-screen bg-surface-muted">
      <Sidebar logo={<Logo />}>{navContent()}</Sidebar>
    </div>
  ),
}

export const Collapsible: Story = {
  args: {
    children: null,
  },
  render: function Render() {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div className="h-screen bg-surface-muted">
        <Sidebar
          logo={collapsed ? <LogoIcon /> : <Logo />}
          collapsed={collapsed}
          collapsible
          onCollapsedChange={setCollapsed}
        >
          {navContent(collapsed)}
        </Sidebar>
      </div>
    )
  },
}
