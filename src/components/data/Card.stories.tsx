import type { Meta, StoryObj } from '@storybook/react-vite'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

const meta = {
  title: 'Dados/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('card'),
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>Compared to last month</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$48,290</p>
      </CardContent>
      <CardFooter>
        <button type="button" className="text-sm font-medium text-primary-500">
          View report
        </button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-full max-w-sm p-6">
      <p className="text-sm text-text-muted">Minimal card with padding only.</p>
    </Card>
  ),
}
