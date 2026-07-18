import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useId } from 'react'
import { Minus, Plus } from 'lucide-react'
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

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  helperText?: string
  error?: string
  size?: FieldSize
  min?: number
  max?: number
  step?: number
  value?: number
  onValueChange?: (value: number) => void
}

export function NumberInput({
  className,
  label,
  helperText,
  error,
  size = 'md',
  min,
  max,
  step = 1,
  value = 0,
  onValueChange,
  onChange,
  disabled,
  id: idProp,
  ...props
}: NumberInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const clamp = (next: number) => {
    let result = next
    if (min !== undefined) result = Math.max(min, result)
    if (max !== undefined) result = Math.min(max, result)
    return result
  }

  const updateValue = (next: number) => {
    const clamped = clamp(next)
    onValueChange?.(clamped)
    return clamped
  }

  const handleDecrement = () => {
    updateValue(value - step)
  }

  const handleIncrement = () => {
    updateValue(value + step)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    const parsed = Number(e.target.value)
    if (!Number.isNaN(parsed)) {
      updateValue(parsed)
    }
  }

  const isDecrementDisabled = disabled || (min !== undefined && value <= min)
  const isIncrementDisabled = disabled || (max !== undefined && value >= max)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          aria-label="Decrease value"
          className={cn(
            'flex items-center justify-center rounded-l-md border border-r-0 border-border bg-surface-muted px-3 text-text-muted transition-colors',
            'hover:bg-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <Minus className="size-4" />
        </button>
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          className={cn(
            controlBaseClasses,
            fieldSizeVariants({ size }),
            'rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            error && controlErrorClasses,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          aria-label="Increase value"
          className={cn(
            'flex items-center justify-center rounded-r-md border border-l-0 border-border bg-surface-muted px-3 text-text-muted transition-colors',
            'hover:bg-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <Plus className="size-4" />
        </button>
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
