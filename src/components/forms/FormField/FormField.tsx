import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import { errorTextClasses, helperTextClasses } from '../shared'

export interface FormFieldProps {
  id?: string
  label?: string
  required?: boolean
  helperText?: string
  error?: string
  className?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  required,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  const helperId = id ? `${id}-helper` : undefined
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
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

export function getFieldDescribedBy(
  id: string | undefined,
  helperText?: string,
  error?: string,
): string | undefined {
  const ids = [error && id ? `${id}-error` : undefined, helperText && id ? `${id}-helper` : undefined]
    .filter(Boolean)
    .join(' ')

  return ids || undefined
}
