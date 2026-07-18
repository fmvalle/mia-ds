import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export function Tabs({ items, value, defaultValue, onChange, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '')
  const activeValue = value ?? internalValue

  const handleChange = (next: string) => {
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
  }

  const activeItem = items.find((item) => item.value === activeValue)

  return (
    <div className={cn('w-full', className)}>
      <div className="inline-flex rounded-lg bg-surface-muted p-1" role="tablist">
        {items.map((item) => {
          const isActive = item.value === activeValue
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleChange(item.value)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-surface text-text shadow-card'
                  : 'text-text-muted hover:text-text',
                item.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" className="mt-4 rounded-xl bg-surface p-5 shadow-card">
        {activeItem?.content}
      </div>
    </div>
  )
}
