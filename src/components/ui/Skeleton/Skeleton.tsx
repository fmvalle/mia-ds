import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva('animate-pulse bg-surface-muted', {
  variants: {
    variant: {
      text: 'h-4 w-full rounded-sm',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  className?: string
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  )
}

export { skeletonVariants }
