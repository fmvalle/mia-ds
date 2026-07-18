import { useMemo, useState, type ReactNode } from 'react'

export type SortDirection = 'asc' | 'desc'

export type DataTableColumnDef<T> = {
  id: string
  header: ReactNode
  sortable?: boolean
  sortValue?: (row: T) => string | number | boolean | null | undefined
  searchValue?: (row: T) => string
  align?: 'left' | 'right'
  className?: string
  /** Custom cell render. Falls back to `accessorKey` or empty. */
  cell?: (row: T) => ReactNode
  accessorKey?: keyof T & string
}

export type DataTableSortState = {
  columnId: string
  direction: SortDirection
}

export type UseDataTableOptions<T> = {
  data: T[]
  columns: DataTableColumnDef<T>[]
  searchQuery?: string
  defaultSort?: DataTableSortState
  /** When set, enables client-side pagination. */
  pageSize?: number
  page?: number
  onPageChange?: (page: number) => void
}

function compareValues(
  a: string | number | boolean | null | undefined,
  b: string | number | boolean | null | undefined,
): number {
  const aEmpty = a === null || a === undefined || a === ''
  const bEmpty = b === null || b === undefined || b === ''
  if (aEmpty && bEmpty) return 0
  if (aEmpty) return 1
  if (bEmpty) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)
  return String(a).localeCompare(String(b), 'pt-BR', { numeric: true, sensitivity: 'base' })
}

export function useDataTable<T>({
  data,
  columns,
  searchQuery = '',
  defaultSort,
  pageSize,
  page: controlledPage,
  onPageChange,
}: UseDataTableOptions<T>) {
  const [sortColumnId, setSortColumnId] = useState(
    defaultSort?.columnId ?? columns.find((c) => c.sortable)?.id ?? columns[0]?.id ?? '',
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction ?? 'asc')
  const [internalPage, setInternalPage] = useState(1)

  const page = controlledPage ?? internalPage
  const setPage = (next: number) => {
    onPageChange?.(next)
    if (controlledPage === undefined) setInternalPage(next)
  }

  const toggleSort = (columnId: string) => {
    const column = columns.find((item) => item.id === columnId)
    if (!column?.sortable) return

    if (sortColumnId === columnId) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortColumnId(columnId)
    setSortDirection('asc')
  }

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return data

    return data.filter((row) => {
      const searchable = columns
        .map((column) => column.searchValue?.(row) ?? '')
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(query)
    })
  }, [columns, data, searchQuery])

  const sortedRows = useMemo(() => {
    const column = columns.find((item) => item.id === sortColumnId)
    if (!column?.sortable || !column.sortValue) return filteredRows

    return [...filteredRows].sort((left, right) => {
      const result = compareValues(column.sortValue!(left), column.sortValue!(right))
      return sortDirection === 'asc' ? result : -result
    })
  }, [columns, filteredRows, sortColumnId, sortDirection])

  const totalItems = sortedRows.length
  const totalPages = pageSize && pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1

  const rows = useMemo(() => {
    if (!pageSize || pageSize <= 0) return sortedRows
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [page, pageSize, sortedRows, totalPages])

  return {
    rows,
    filteredCount: totalItems,
    sortColumnId,
    sortDirection,
    toggleSort,
    page: Math.min(Math.max(1, page), totalPages),
    pageSize,
    totalPages,
    setPage,
    paginationEnabled: Boolean(pageSize && pageSize > 0),
  }
}
