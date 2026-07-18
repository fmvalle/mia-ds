import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Plus } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button } from './Button'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('button'),
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  name: 'Primário',
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.primaryButton')}</Button>
  },
}

export const Secondary: Story = {
  name: 'Secundário',
  args: { variant: 'secondary' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.secondary')}</Button>
  },
}

export const Outline: Story = {
  name: 'Contorno',
  args: { variant: 'outline' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.outline')}</Button>
  },
}

export const Ghost: Story = {
  name: 'Fantasma',
  args: { variant: 'ghost' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.ghost')}</Button>
  },
}

export const Danger: Story = {
  name: 'Perigo',
  args: { variant: 'danger' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.delete')}</Button>
  },
}

export const Success: Story = {
  name: 'Sucesso',
  args: { variant: 'success' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.confirm')}</Button>
  },
}

export const Soft: Story = {
  name: 'Suave',
  args: { variant: 'soft' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.soft')}</Button>
  },
}

export const Link: Story = {
  name: 'Link',
  args: { variant: 'link' },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.learnMore')}</Button>
  },
}

export const Loading: Story = {
  name: 'Carregando',
  args: { loading: true },
  render: (args) => {
    const { t } = useI18n()
    return <Button {...args}>{t('common.loading')}</Button>
  },
}

export const WithIcon: Story = {
  name: 'Com ícone',
  render: (args) => {
    const { t } = useI18n()
    return (
      <Button {...args}>
        <Plus className="size-4" />
        {t('common.save')}
      </Button>
    )
  },
}

export const IconOnly: Story = {
  name: 'Somente ícone',
  args: { size: 'icon', variant: 'soft', 'aria-label': 'Download' },
  render: (args) => (
    <Button {...args}>
      <Download className="size-4" />
    </Button>
  ),
}

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => {
    const { t } = useI18n()
    return (
      <div className="flex flex-wrap items-center gap-3">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button key={s} size={s}>
            {t('common.save')} ({s})
          </Button>
        ))}
      </div>
    )
  },
}
