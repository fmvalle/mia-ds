import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '../Spinner'

/** Paridade Flutter: ElevatedButton radius 8, pad H24 V12; primary BrandColors */
const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 font-medium transition-all duration-[var(--duration-interaction)] ease-[var(--ease-saas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/45 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[0.38] rounded-sm',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white shadow-sm hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 active:bg-secondary-700',
        outline:
          'border border-border bg-surface text-text shadow-card hover:bg-surface-subtle hover:border-border-strong',
        ghost: 'text-text hover:bg-surface-subtle active:bg-neutral-200',
        danger: 'bg-danger-500 text-white shadow-sm hover:bg-danger-600 active:bg-danger-700',
        success: 'bg-success-500 text-white shadow-sm hover:bg-success-600 active:bg-success-700',
        soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200',
        link: 'h-auto p-0 text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 px-2.5 text-[length:var(--text-body-sm)]',
        sm: 'h-8 px-3 text-[length:var(--text-body-md)]',
        md: 'h-10 px-6 text-[length:var(--text-body-md)]',
        lg: 'h-11 px-6 text-[length:var(--text-body-lg)]',
        xl: 'h-[52px] px-6 text-[length:var(--text-title-sm)] font-semibold rounded-[18px]',
        icon: 'size-10 p-0',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
        className: 'h-auto px-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

function getSpinnerColor(variant: ButtonProps['variant']): 'primary' | 'white' | 'muted' {
  if (variant === 'outline' || variant === 'ghost' || variant === 'soft' || variant === 'link') {
    return 'primary'
  }
  return 'white'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size="sm" color={getSpinnerColor(variant)} label="Loading" /> : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { buttonVariants }
