import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import { errorTextClasses, helperTextClasses } from '../shared'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  helperText?: string
  error?: string
  min?: number
  max?: number
  value?: number
  showValue?: boolean
  onValueChange?: (value: number) => void
}

export function Slider({
  className,
  label,
  helperText,
  error,
  min = 0,
  max = 100,
  value = 0,
  showValue = false,
  onValueChange,
  onChange,
  disabled,
  id: idProp,
  ...props
}: SliderProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onValueChange?.(Number(e.target.value))
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <Label htmlFor={id} className="mb-0">
              {label}
            </Label>
          )}
          {showValue && (
            <span className="text-sm font-medium text-primary-500" aria-live="polite">
              {value}
            </span>
          )}
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onChange={handleChange}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-border',
          'accent-primary-500',
          '[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-sm',
          '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-60',
        )}
        {...props}
      />
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
