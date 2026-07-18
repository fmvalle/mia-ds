import { cva, type VariantProps } from 'class-variance-authority'

/** InputDecoration Flutter: fill n100, pad H16 V12, radius 8, focus primary */
export const fieldSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'h-9 px-3 text-[length:var(--text-body-md)]',
      md: 'h-11 px-4 text-[length:var(--text-body-lg)]',
      lg: 'h-12 px-4 text-[length:var(--text-title-sm)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type FieldSize = NonNullable<VariantProps<typeof fieldSizeVariants>['size']>

export const controlBaseClasses =
  'w-full rounded-sm border border-border bg-surface-subtle text-text transition-colors placeholder:text-text-disabled focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-400/45 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-[0.38]'

export const controlErrorClasses =
  'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'

export const helperTextClasses = 'mt-1.5 text-[length:var(--text-body-md)] text-text-muted'

export const errorTextClasses = 'mt-1.5 text-[length:var(--text-body-md)] text-danger-600'
