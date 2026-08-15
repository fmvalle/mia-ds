import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, Send, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from './Card'
import { SwipeActions } from './SwipeActions'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/SwipeActions',
  component: SwipeActions,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('swipeActions'),
  },
} satisfies Meta<typeof SwipeActions>

export default meta
type Story = StoryObj<typeof meta>

const routineCard = (
  <Card>
    <CardContent className="py-4">
      <CardTitle>Chegada e acolhimento</CardTitle>
      <CardDescription>2 alunos · 100% concluída</CardDescription>
    </CardContent>
  </Card>
)

export const Enabled: Story = {
  args: {
    children: routineCard,
    actions: [
      {
        id: 'release',
        label: 'Liberar registros',
        icon: <Send size={20} />,
        onClick: () => undefined,
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    defaultOpen: true,
    children: routineCard,
    actions: [
      {
        id: 'release',
        label: 'Liberar registros',
        icon: <Check size={20} />,
        disabled: true,
        onClick: () => undefined,
      },
    ],
  },
}

export const CustomContent: Story = {
  args: {
    defaultOpen: true,
    children: routineCard,
    actions: [
      {
        id: 'family',
        label: 'Liberar para a família',
        content: (
          <>
            <input aria-label="Liberar para a família" type="checkbox" />
            <span>Família</span>
          </>
        ),
      },
    ],
  },
}

export const MultipleActions: Story = {
  args: {
    defaultOpen: true,
    children: routineCard,
    actions: [
      {
        id: 'release',
        label: 'Liberar',
        icon: <Send size={20} />,
        onClick: () => undefined,
      },
      {
        id: 'delete',
        label: 'Apagar',
        icon: <Trash2 size={20} />,
        tone: 'danger',
        onClick: () => undefined,
      },
    ],
  },
}
