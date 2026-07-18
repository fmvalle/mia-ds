import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
}

export function Radio({
  className,
  label,
  description,
  checked,
  onChange,
  disabled,
  id: idProp,
  ...props
}: RadioProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

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
          id={id}
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-full border border-border bg-surface transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/20',
            'peer-checked:border-primary-500',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              'size-2.5 rounded-full bg-primary-500 transition-transform',
              checked ? 'scale-100' : 'scale-0',
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
