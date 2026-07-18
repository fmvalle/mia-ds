import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useId, useState } from 'react'
import { Search, X } from 'lucide-react'
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

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  helperText?: string
  error?: string
  size?: FieldSize
  onClear?: () => void
}

export function SearchInput({
  className,
  label,
  helperText,
  error,
  size = 'md',
  value: valueProp,
  defaultValue,
  onChange,
  onClear,
  disabled,
  placeholder = 'Search...',
  id: idProp,
  ...props
}: SearchInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp?.toString() ?? '' : internalValue
  const hasValue = value.length > 0

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('')
    }
    onClear?.()
  }

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          role="searchbox"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          className={cn(
            controlBaseClasses,
            fieldSizeVariants({ size }),
            'pl-10',
            hasValue && 'pr-10',
            error && controlErrorClasses,
            className,
          )}
          {...props}
        />
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-text-muted transition-colors hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
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
