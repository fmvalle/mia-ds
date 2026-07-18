import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('accordion'), layout: 'padded' },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    value: 'billing',
    title: 'How does billing work?',
    content: 'You are billed monthly based on your selected plan and active seats.',
  },
  {
    value: 'support',
    title: 'Where can I get support?',
    content: 'Reach our team via in-app chat or email support@miaedu.tech.',
  },
  {
    value: 'cancel',
    title: 'Can I cancel anytime?',
    content: 'Yes, you can cancel your subscription from account settings.',
  },
]

export const Single: Story = {
  args: { items, type: 'single', defaultValue: 'billing' },
}

export const Multiple: Story = {
  args: { items, type: 'multiple', defaultValue: ['billing', 'support'] },
}
