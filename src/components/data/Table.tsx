import type {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react'
import { useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Pagination } from './Pagination'
import {
  useDataTable,
  type DataTableColumnDef,
  type DataTableSortState,
  type SortDirection,
} from './useDataTable'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full caption-bottom border-collapse text-sm" {...props} />
    </div>
  )
}

export function Thead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        'border-b border-border bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-text-muted',
        className,
      )}
      {...props}
    />
  )
}

export function Tbody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-border', className)} {...props} />
}

export function Tr({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('transition-colors hover:bg-surface-muted/50', className)}
      {...props}
    />
  )
}

export function Th({
  className,
  align = 'left',
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' }) {
  return (
    <th
      className={cn(
        'h-11 px-4 align-middle text-xs font-semibold uppercase tracking-wide text-text-muted',
        align === 'right' ? 'text-right' : 'text-left',
        className,
      )}
      {...props}
    />
  )
}

export function Td({
  className,
  align = 'left',
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' }) {
  return (
    <td
      className={cn(
        'px-4 py-3 align-middle text-text',
        align === 'right' ? 'text-right' : 'text-left',
        className,
      )}
      {...props}
    />
  )
}

export type SortableThProps = {
  label: ReactNode
  columnId: string
  activeColumnId: string
  direction: SortDirection
  onSort: (columnId: string) => void
  sortable?: boolean
  align?: 'left' | 'right'
  className?: string
}

export function SortableTh({
  label,
  columnId,
  activeColumnId,
  direction,
  onSort,
  sortable = true,
  align = 'left',
  className,
}: SortableThProps) {
  const isActive = sortable && activeColumnId === columnId

  if (!sortable) {
    return (
      <Th align={align} className={className}>
        {label}
      </Th>
    )
  }

  return (
    <Th align={align} className={className} aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button
        type="button"
        onClick={() => onSort(columnId)}
        className={cn(
          'inline-flex items-center gap-1 uppercase tracking-wide transition-colors',
          isActive ? 'text-primary-500' : 'text-text-muted hover:text-text',
          align === 'right' && 'ml-auto',
        )}
      >
        {label}
        {isActive ? (
          direction === 'asc' ? (
            <ArrowUp className="size-3.5" aria-hidden />
          ) : (
            <ArrowDown className="size-3.5" aria-hidden />
          )
        ) : (
          <ArrowUpDown className="size-3.5 opacity-50" aria-hidden />
        )}
      </button>
    </Th>
  )
}

export type DataTableSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = 'Pesquisar...',
  className,
}: DataTableSearchProps) {
  return (
    <div className={cn('border-b border-border px-4 py-3', className)}>
      <label className="relative block max-w-md">
        <span className="sr-only">Pesquisar</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-subtle"
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 pl-9 text-sm text-text outline-none transition placeholder:text-text-subtle focus:border-primary-300 focus:bg-surface focus:ring-2 focus:ring-primary-500/20"
        />
      </label>
    </div>
  )
}

/** @deprecated Prefer DataTableColumnDef — kept for story compatibility. */
export type DataTableColumn<T> = {
  key: string
  header: string
  render?: (row: T) => ReactNode
  className?: string
}

export type DataTableProps<T> = {
  columns: DataTableColumnDef<T>[]
  data: T[]
  getRowId: (row: T) => string
  className?: string
  /** Show search toolbar. Controlled via searchQuery/onSearchChange or uncontrolled. */
  searchable?: boolean
  searchPlaceholder?: string
  searchQuery?: string
  onSearchChange?: (value: string) => void
  defaultSort?: DataTableSortState
  /** Optional client pagination. Omit or set false to show all rows. */
  pageSize?: number | false
  emptyMessage?: ReactNode
  toolbar?: ReactNode
  onRowClick?: (row: T) => void
}

function defaultCellValue<T>(row: T, column: DataTableColumnDef<T>): ReactNode {
  if (column.cell) return column.cell(row)
  if (column.accessorKey) {
    const value = row[column.accessorKey]
    if (value === null || value === undefined || value === '') return '—'
    return String(value)
  }
  return '—'
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  className,
  searchable = false,
  searchPlaceholder = 'Pesquisar...',
  searchQuery: controlledSearch,
  onSearchChange,
  defaultSort,
  pageSize = false,
  emptyMessage = 'Nenhum registro encontrado.',
  toolbar,
  onRowClick,
}: DataTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState('')
  const searchQuery = controlledSearch ?? internalSearch
  const setSearchQuery = (value: string) => {
    onSearchChange?.(value)
    if (controlledSearch === undefined) setInternalSearch(value)
  }

  const resolvedPageSize = pageSize === false || pageSize === undefined ? undefined : pageSize

  const {
    rows,
    filteredCount,
    sortColumnId,
    sortDirection,
    toggleSort,
    page,
    totalPages,
    setPage,
    paginationEnabled,
  } = useDataTable({
    data,
    columns,
    searchQuery: searchable ? searchQuery : '',
    defaultSort,
    pageSize: resolvedPageSize,
  })

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-surface shadow-card',
        className,
      )}
    >
      {toolbar}
      {searchable ? (
        <DataTableSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={searchPlaceholder}
        />
      ) : null}

      {filteredCount === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-text-muted">{emptyMessage}</p>
      ) : (
        <Table>
          <Thead>
            <Tr className="hover:bg-transparent">
              {columns.map((column) => (
                <SortableTh
                  key={column.id}
                  label={column.header}
                  columnId={column.id}
                  activeColumnId={sortColumnId}
                  direction={sortDirection}
                  onSort={toggleSort}
                  sortable={Boolean(column.sortable && column.sortValue)}
                  align={column.align}
                  className={column.className}
                />
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row) => (
              <Tr
                key={getRowId(row)}
                className={onRowClick ? 'cursor-pointer' : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column) => (
                  <Td key={column.id} align={column.align} className={column.className}>
                    {defaultCellValue(row, column)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {paginationEnabled && filteredCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
          <p className="text-xs text-text-muted">
            {filteredCount} {filteredCount === 1 ? 'registro' : 'registros'}
          </p>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      ) : null}
    </div>
  )
}

export type { DataTableColumnDef, DataTableSortState, SortDirection }
export { useDataTable }
