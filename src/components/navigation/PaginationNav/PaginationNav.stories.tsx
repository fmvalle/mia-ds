import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PaginationNav } from './PaginationNav'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/PaginationNav',
  component: PaginationNav,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('paginationNav'),
  },
} satisfies Meta<typeof PaginationNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  render: function Render() {
    const [page, setPage] = useState(1)
    return <PaginationNav currentPage={page} totalPages={10} onPageChange={setPage} />
  },
}

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
  },
  render: function Render() {
    const [page, setPage] = useState(5)
    return <PaginationNav currentPage={page} totalPages={20} onPageChange={setPage} />
  },
}

export const PrevNextOnly: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    showPages: false,
  },
}
