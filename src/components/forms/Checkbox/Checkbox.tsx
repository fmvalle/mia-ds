import type { InputHTMLAttributes } from 'react'
import { useEffect, useId, useRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  indeterminate?: boolean
}

export function Checkbox({
  className,
  label,
  description,
  indeterminate,
  checked,
  onChange,
  disabled,
  id: idProp,
  ...props
}: CheckboxProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-start gap-3',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="relative mt-0.5 flex shrink-0">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded border border-border bg-surface transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/20',
            'peer-checked:border-primary-500 peer-checked:bg-primary-500',
            'peer-indeterminate:border-primary-500 peer-indeterminate:bg-primary-500',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
            (checked || indeterminate) && 'border-primary-500 bg-primary-500',
          )}
          aria-hidden="true"
        >
          <Check
            className={cn(
              'size-3.5 text-white transition-opacity',
              checked || indeterminate ? 'opacity-100' : 'opacity-0',
            )}
          />
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-sm font-medium text-text">{label}</span>}
          {description && <span className="text-sm text-text-muted">{description}</span>}
        </span>
      )}
    </label>
  )
}
