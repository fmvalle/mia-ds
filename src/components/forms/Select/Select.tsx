import type { SelectHTMLAttributes } from 'react'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import {
  controlBaseClasses,
  controlErrorClasses,
  errorTextClasses,
  fieldSizeVariants,
  helperTextClasses,
  type FieldSize,
} from '../shared'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  size?: FieldSize
}

export function Select({
  className,
  label,
  helperText,
  error,
  options,
  placeholder,
  size = 'md',
  disabled,
  id: idProp,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            controlBaseClasses,
            fieldSizeVariants({ size }),
            'appearance-none pr-10',
            error && controlErrorClasses,
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
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
