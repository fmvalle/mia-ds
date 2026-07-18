import type { Meta, StoryObj } from '@storybook/react-vite'
import { useI18n } from '@/i18n'
import { WelcomeBanner } from './WelcomeBanner'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/WelcomeBanner',
  component: WelcomeBanner,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('welcomeBanner'), layout: 'padded' },
  args: {
    greeting: 'Welcome',
  },
} satisfies Meta<typeof WelcomeBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Padrão',
  render: () => {
    const { t } = useI18n()
    return (
      <WelcomeBanner
        greeting={t('dashboard.welcomeBack', { name: 'Felipe' })}
        subtitle={t('dashboard.welcomeSubtitleAlt')}
        metrics={[
          { label: t('dashboard.projects'), value: '24' },
          { label: t('dashboard.sales'), value: '8' },
          { label: t('dashboard.customers'), value: '12' },
        ]}
      />
    )
  },
}

export const WithIllustration: Story = {
  name: 'Com ilustração',
  render: () => {
    const { t } = useI18n()
    return (
      <WelcomeBanner
        greeting={t('dashboard.welcomeBack', { name: 'Team' })}
        subtitle={t('dashboard.welcomeSubtitleAlt')}
        metrics={[
          { label: t('dashboard.totalRevenue'), value: '$12.4k' },
          { label: t('dashboard.monthlyGrowth'), value: '+18%' },
        ]}
        illustration={
          <div className="flex size-28 items-center justify-center rounded-2xl bg-white/15 text-sm font-bold tracking-wide text-white">
            DS
          </div>
        }
      />
    )
  },
}
