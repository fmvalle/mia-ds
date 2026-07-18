import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
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

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: FieldSize
  fullWidth?: boolean
}

export function Input({
  className,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = true,
  disabled,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const inputElement = (
    <input
      id={id}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy || undefined}
      className={cn(
        controlBaseClasses,
        fieldSizeVariants({ size }),
        leftIcon && 'pl-10',
        rightIcon && 'pr-10',
        error && controlErrorClasses,
        className,
      )}
      {...props}
    />
  )

  return (
    <div className={cn(fullWidth && 'w-full')}>
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      {leftIcon || rightIcon ? (
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </span>
          )}
          {inputElement}
          {rightIcon && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </span>
          )}
        </div>
      ) : (
        inputElement
      )}
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
