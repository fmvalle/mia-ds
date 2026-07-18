import type { TextareaHTMLAttributes } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import {
  controlBaseClasses,
  controlErrorClasses,
  errorTextClasses,
  helperTextClasses,
} from '../shared'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const

export function Textarea({
  className,
  label,
  helperText,
  error,
  resize = 'vertical',
  rows = 4,
  disabled,
  id: idProp,
  ...props
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          controlBaseClasses,
          'min-h-[100px] px-4 py-3 text-base',
          resizeClasses[resize],
          error && controlErrorClasses,
          className,
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
