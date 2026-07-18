import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from './Pagination'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('pagination'),
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { page: 1, totalPages: 10, onChange: () => undefined },
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination page={page} totalPages={10} onChange={setPage} />
  },
}

export const MiddlePage: Story = {
  args: { page: 5, totalPages: 12, onChange: () => undefined },
  render: () => {
    const [page, setPage] = useState(5)
    return <Pagination page={page} totalPages={12} onChange={setPage} />
  },
}
