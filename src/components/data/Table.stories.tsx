import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable, Table, Tbody, Td, Th, Thead, Tr } from './Table'
import { PriorityBadge } from './PriorityBadge'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Table',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('table'), layout: 'padded' },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

type ProjectRow = {
  id: string
  name: string
  status: string
  priority: 'Low' | 'Medium' | 'High'
}

const sampleData: ProjectRow[] = [
  { id: '1', name: 'Mia UI', status: 'Ativo', priority: 'High' },
  { id: '2', name: 'Analytics', status: 'Pausado', priority: 'Medium' },
  { id: '3', name: 'Mobile App', status: 'Ativo', priority: 'Low' },
  { id: '4', name: 'Diário escolar', status: 'Ativo', priority: 'High' },
  { id: '5', name: 'Relatórios', status: 'Ativo', priority: 'Medium' },
  { id: '6', name: 'Suporte', status: 'Pausado', priority: 'Low' },
]

export const Basic: Story = {
  args: {
    columns: [],
    data: [],
    getRowId: () => '',
  },
  render: () => (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <Table>
        <Thead>
          <Tr className="hover:bg-transparent">
            <Th>Projeto</Th>
            <Th>Status</Th>
            <Th>Prioridade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sampleData.slice(0, 3).map((row) => (
            <Tr key={row.id}>
              <Td className="font-medium">{row.name}</Td>
              <Td>{row.status}</Td>
              <Td>
                <PriorityBadge priority={row.priority} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  ),
}

export const SearchAndSort: Story = {
  args: {
    columns: [],
    data: [],
    getRowId: () => '',
  },
  render: function Render() {
    const [query, setQuery] = useState('')

    return (
      <DataTable
        data={sampleData}
        getRowId={(row) => row.id}
        searchable
        searchQuery={query}
        onSearchChange={setQuery}
        searchPlaceholder="Pesquisar projetos..."
        defaultSort={{ columnId: 'name', direction: 'asc' }}
        emptyMessage={
          query.trim()
            ? `Nenhum projeto encontrado para "${query.trim()}".`
            : 'Nenhum projeto cadastrado.'
        }
        columns={[
          {
            id: 'name',
            header: 'Projeto',
            sortable: true,
            sortValue: (row) => row.name,
            searchValue: (row) => row.name,
            cell: (row) => <span className="font-medium">{row.name}</span>,
          },
          {
            id: 'status',
            header: 'Status',
            sortable: true,
            sortValue: (row) => row.status,
            searchValue: (row) => row.status,
            accessorKey: 'status',
          },
          {
            id: 'priority',
            header: 'Prioridade',
            sortable: true,
            sortValue: (row) => row.priority,
            searchValue: (row) => row.priority,
            cell: (row) => <PriorityBadge priority={row.priority} />,
          },
        ]}
      />
    )
  },
}

export const WithPagination: Story = {
  args: {
    columns: [],
    data: [],
    getRowId: () => '',
  },
  render: () => (
    <DataTable
      data={sampleData}
      getRowId={(row) => row.id}
      searchable
      pageSize={3}
      defaultSort={{ columnId: 'name', direction: 'asc' }}
      columns={[
        {
          id: 'name',
          header: 'Projeto',
          sortable: true,
          sortValue: (row) => row.name,
          searchValue: (row) => `${row.name} ${row.status}`,
          cell: (row) => <span className="font-medium">{row.name}</span>,
        },
        {
          id: 'status',
          header: 'Status',
          accessorKey: 'status',
        },
        {
          id: 'priority',
          header: 'Prioridade',
          cell: (row) => <PriorityBadge priority={row.priority} />,
        },
      ]}
    />
  ),
}
