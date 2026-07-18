import type { ClipboardEvent, KeyboardEvent } from 'react'
import { useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import { errorTextClasses, helperTextClasses } from '../shared'

export interface PinInputProps {
  length?: number
  label?: string
  helperText?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  id?: string
  className?: string
}

export function PinInput({
  length = 6,
  label,
  helperText,
  error,
  value: valueProp,
  onChange,
  disabled,
  id: idProp,
  className,
}: PinInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [internalValue, setInternalValue] = useState('')
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const updateValue = (newValue: string) => {
    const sanitized = newValue.replace(/\D/g, '').slice(0, length)
    if (!isControlled) {
      setInternalValue(sanitized)
    }
    onChange?.(sanitized)
    return sanitized
  }

  const handleChange = (index: number, digit: string) => {
    const sanitized = digit.replace(/\D/g, '').slice(-1)
    const next = digits.slice()
    next[index] = sanitized
    const newValue = updateValue(next.join(''))

    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    return newValue
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const sanitized = updateValue(pasted)
    const focusIndex = Math.min(sanitized.length, length - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label id={`${id}-label`} className="mb-2">
          {label}
        </Label>
      )}
      <div
        role="group"
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className="flex gap-2"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              'size-11 rounded-md border border-border bg-surface text-center text-lg font-semibold text-text transition-colors',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60',
              error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            )}
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
