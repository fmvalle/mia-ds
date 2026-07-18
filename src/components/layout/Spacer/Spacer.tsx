import { cn } from '@/lib/utils'

export type SpacerProps = {
  size?: number | 'grow'
  axis?: 'horizontal' | 'vertical'
  className?: string
}

export function Spacer({ size = 'grow', axis = 'vertical', className }: SpacerProps) {
  if (size === 'grow') {
    return (
      <span
        className={cn(axis === 'vertical' ? 'flex-1' : 'flex-1 self-stretch', className)}
        aria-hidden
      />
    )
  }

  return (
    <span
      className={cn(
        'shrink-0',
        axis === 'vertical' ? `h-${size}` : `w-${size}`,
        className,
      )}
      style={axis === 'vertical' ? { height: size } : { width: size }}
      aria-hidden
    />
  )
}
