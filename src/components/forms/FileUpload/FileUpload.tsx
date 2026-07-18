import type { ChangeEvent, DragEvent, InputHTMLAttributes } from 'react'
import { useId, useRef, useState } from 'react'
import { File, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '../Label'
import { errorTextClasses, helperTextClasses } from '../shared'

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  label?: string
  helperText?: string
  error?: string
  accept?: string
  multiple?: boolean
  onChange?: (files: FileList | null) => void
}

export function FileUpload({
  className,
  label,
  helperText,
  error,
  accept,
  multiple,
  onChange,
  disabled,
  id: idProp,
  ...props
}: FileUploadProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ')

  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(
        multiple
          ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
          : files[0].name,
      )
    } else {
      setFileName(null)
    }
    onChange?.(files)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const files = e.dataTransfer.files
    if (inputRef.current) {
      const dataTransfer = new DataTransfer()
      Array.from(files).forEach((file) => dataTransfer.items.add(file))
      inputRef.current.files = dataTransfer.files
    }
    handleFiles(files)
  }

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label htmlFor={id} required={props.required}>
          {label}
        </Label>
      )}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFilePicker()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-disabled={disabled || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors',
          'border-border bg-surface-muted hover:border-primary-500/50 hover:bg-primary-50/30',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20',
          isDragging && 'border-primary-500 bg-primary-50/50',
          error && 'border-danger-500',
          disabled ? 'cursor-not-allowed opacity-60' : undefined,
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={handleInputChange}
          {...props}
        />
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-500">
          <Upload className="size-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-text">
          <span className="text-primary-500">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-sm text-text-muted">
          {accept ? `Accepted: ${accept}` : 'Any file type'}
        </p>
        {fileName && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-text">
            <File className="size-4 text-primary-500" aria-hidden="true" />
            {fileName}
          </p>
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
