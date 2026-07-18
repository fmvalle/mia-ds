import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '../Avatar'

/** EmotionChip / Chip Flutter: pill, soft primary selected */
const chipVariants = cva(
  'inline-flex max-w-full items-center gap-1.5 rounded-full font-medium transition-colors duration-[var(--duration-interaction)]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-50 text-primary-700',
        secondary: 'bg-secondary-50 text-secondary-700',
        success: 'bg-success-50 text-success-700',
        warning: 'bg-warning-50 text-warning-700',
        danger: 'bg-danger-50 text-danger-700',
        neutral: 'bg-surface-subtle text-text',
        outline: 'border border-border bg-surface text-text',
        selected:
          'bg-gradient-to-br from-primary-500/14 to-primary-500/26 text-primary-700 ring-1 ring-primary-500/22 font-semibold',
      },
      size: {
        sm: 'h-8 px-2.5 text-[length:var(--text-caption)] [&_svg]:size-3',
        md: 'h-10 px-4 text-[length:var(--text-body-md)] [&_svg]:size-3.5',
        lg: 'h-11 px-4 text-[length:var(--text-label)] [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ChipProps extends VariantProps<typeof chipVariants> {
  className?: string
  children: ReactNode
  icon?: ReactNode
  avatar?: {
    src?: string
    name?: string
    initials?: string
  }
  dismissible?: boolean
  onDismiss?: () => void
  dismissLabel?: string
}

export function Chip({
  className,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  avatar,
  dismissible = false,
  onDismiss,
  dismissLabel = 'Remove',
}: ChipProps) {
  const avatarSize = size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : 'xs'

  return (
    <span className={cn(chipVariants({ variant, size }), className)}>
      {avatar ? (
        <Avatar
          size={avatarSize}
          src={avatar.src}
          name={avatar.name}
          initials={avatar.initials}
          className="ring-2 ring-surface"
        />
      ) : null}
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="truncate">{children}</span>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="inline-flex shrink-0 rounded-full p-0.5 opacity-70 transition-opacity hover:bg-black/5 hover:opacity-100"
        >
          <X />
        </button>
      ) : null}
    </span>
  )
}

export { chipVariants }
