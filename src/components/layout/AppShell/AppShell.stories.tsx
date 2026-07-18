import type { Meta, StoryObj } from '@storybook/react-vite'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'
import {
  FileText,
  Home,
  LayoutGrid,
  Mail,
  ShoppingBag,
} from 'lucide-react'
import { Bell, Settings } from 'lucide-react'
import { Header } from '@/components/navigation/Header'
import { NavItem } from '@/components/navigation/NavItem'
import { NavSection } from '@/components/navigation/NavSection'
import { Sidebar } from '@/components/navigation/Sidebar'
import { AppShell } from './AppShell'

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('appShell'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppShell>

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

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <AppShell
      sidebar={
        <Sidebar logo={<Logo />}>
          <NavSection title="Dashboards">
            <NavItem icon={Home} label="Modern" href="#" active />
            <NavItem icon={LayoutGrid} label="Analytics" href="#" />
            <NavItem icon={ShoppingBag} label="eCommerce" href="#" />
          </NavSection>
          <NavSection title="Front Pages">
            <NavItem icon={Mail} label="Landing" href="#" />
            <NavItem icon={FileText} label="Blog" href="#" />
          </NavSection>
        </Sidebar>
      }
      header={
        <Header
          title="Dashboard"
          actions={
            <>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
              </button>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted"
                aria-label="Settings"
              >
                <Settings className="size-5" />
              </button>
            </>
          }
          avatar={
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
              JD
            </div>
          }
        />
      }
    >
      <div className="rounded-xl bg-surface p-6 shadow-card">
        <p className="text-text-muted">Main content area</p>
      </div>
    </AppShell>
  ),
}
