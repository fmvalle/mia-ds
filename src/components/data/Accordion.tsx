import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  value: string
  title: string
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  className?: string
}

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultValue === undefined) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggle = (value: string) => {
    setOpenItems((current) => {
      const isOpen = current.includes(value)
      if (type === 'single') return isOpen ? [] : [value]
      return isOpen ? current.filter((item) => item !== value) : [...current, value]
    })
  }

  return (
    <div className={cn('divide-y divide-border rounded-xl bg-surface shadow-card', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.value)
        return (
          <div key={item.value}>
            <button
              type="button"
              onClick={() => toggle(item.value)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text">{item.title}</span>
              <ChevronDown
                className={cn('size-5 text-text-muted transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-border px-5 pb-4 text-sm text-text-muted">
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
