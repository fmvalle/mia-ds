import type { InputHTMLAttributes } from 'react'
import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
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

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  helperText?: string
  error?: string
  size?: FieldSize
}

export function PasswordInput({
  className,
  label,
  helperText,
  error,
  size = 'md',
  disabled,
  id: idProp,
  ...props
}: PasswordInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const [visible, setVisible] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            controlBaseClasses,
            fieldSizeVariants({ size }),
            'pr-10',
            error && controlErrorClasses,
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-text-muted transition-colors hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
