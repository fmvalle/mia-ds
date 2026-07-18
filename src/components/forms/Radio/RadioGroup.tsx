import type { HTMLAttributes } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import { errorTextClasses, helperTextClasses } from '../shared'
import { Radio } from './Radio'

export interface RadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string
  label?: string
  helperText?: string
  error?: string
  options: RadioGroupOption[]
  value?: string
  onChange?: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
}

export function RadioGroup({
  className,
  name: nameProp,
  label,
  helperText,
  error,
  options,
  value,
  onChange,
  orientation = 'vertical',
  id: idProp,
  ...props
}: RadioGroupProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const name = nameProp ?? id
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cn('w-full', className)} role="radiogroup" aria-labelledby={label ? `${id}-label` : undefined} aria-describedby={describedBy || undefined} aria-invalid={error ? true : undefined} {...props}>
      {label && (
        <Label id={`${id}-label`} className="mb-2">
          {label}
        </Label>
      )}
      <div
        className={cn(
          'flex gap-4',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
      {error ? (
        <p id={errorId} className={errorTextClasses} role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={helperTextClasses}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
