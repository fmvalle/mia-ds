import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from './Timeline'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('timeline'), layout: 'padded' },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Project kickoff',
        description: 'Initial planning session with stakeholders.',
        time: '9:00 AM',
      },
      {
        id: '2',
        title: 'Design review',
        description: 'UI mockups approved for development.',
        time: '11:30 AM',
      },
      {
        id: '3',
        title: 'Sprint started',
        description: 'Development team began implementation.',
        time: '2:00 PM',
      },
    ],
  },
}
