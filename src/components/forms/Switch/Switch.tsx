import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { FieldSize } from '../shared'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  size?: FieldSize
}

const trackSizes = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-[3.25rem]',
} as const

const thumbSizes = {
  sm: 'size-4 peer-checked:translate-x-4',
  md: 'size-5 peer-checked:translate-x-5',
  lg: 'size-6 peer-checked:translate-x-[1.375rem]',
} as const

export function Switch({
  className,
  label,
  description,
  size = 'md',
  checked,
  onChange,
  disabled,
  id: idProp,
  ...props
}: SwitchProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex cursor-pointer items-center gap-3',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            'block rounded-full bg-border transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/20',
            'peer-checked:bg-primary-500',
            'peer-disabled:cursor-not-allowed',
            trackSizes[size],
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'absolute left-0.5 top-0.5 rounded-full bg-white shadow-sm transition-transform',
            thumbSizes[size],
            checked && (size === 'sm' ? 'translate-x-4' : size === 'lg' ? 'translate-x-[1.375rem]' : 'translate-x-5'),
          )}
          aria-hidden="true"
        />
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
