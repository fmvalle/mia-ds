import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2 rounded-sm',
  {
    variants: {
      variant: {
        default: 'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline',
        muted: 'text-text-muted hover:text-text underline-offset-4 hover:underline',
        subtle: 'text-text-subtle hover:text-primary-500 no-underline hover:underline',
        nav: 'text-text no-underline hover:text-primary-500',
        danger: 'text-danger-500 hover:text-danger-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, external, children, href, ...props }, ref) => {
    const externalProps = external
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {}

    return (
      <a
        ref={ref}
        href={href ?? '#'}
        className={cn(linkVariants({ variant, size }), className)}
        {...externalProps}
        {...props}
      >
        {children}
        {external ? <span className="sr-only">(opens in new tab)</span> : null}
      </a>
    )
  },
)

Link.displayName = 'Link'

export { linkVariants }
