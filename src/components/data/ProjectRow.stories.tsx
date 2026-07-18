import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProjectRow } from './ProjectRow'
import { Table, Tbody, Th, Thead, Tr } from './Table'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/ProjectRow',
  component: ProjectRow,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('projectRow'), layout: 'padded' },
} satisfies Meta<typeof ProjectRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Mia Redesign',
    assignee: 'Sarah Chen',
    progress: 72,
    priority: 'High',
    budget: '$24,500',
  },
  render: () => (
    <Table>
      <Thead>
        <Tr className="hover:bg-transparent">
          <Th>Project</Th>
          <Th>Assignee</Th>
          <Th>Progress</Th>
          <Th>Priority</Th>
          <Th>Budget</Th>
        </Tr>
      </Thead>
      <Tbody>
        <ProjectRow
          avatar="https://i.pravatar.cc/80?img=32"
          title="Mia Redesign"
          assignee="Sarah Chen"
          progress={72}
          priority="High"
          budget="$24,500"
        />
        <ProjectRow
          title="Mobile Analytics"
          assignee="Alex Rivera"
          progress={45}
          priority="Medium"
          budget="$12,800"
        />
        <ProjectRow
          avatar="https://i.pravatar.cc/80?img=15"
          title="API Integration"
          assignee="Jordan Lee"
          progress={91}
          priority="Very High"
          budget="$8,200"
        />
      </Tbody>
    </Table>
  ),
}
