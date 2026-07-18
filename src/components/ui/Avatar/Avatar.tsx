import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** DsAvatar: default 40px; fallback surfaceSubtle + primary initials */
const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-subtle font-semibold tracking-wide text-primary-500 ring-1 ring-neutral-900/8',
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-8 text-[length:var(--text-caption)]',
        md: 'size-10 text-[length:var(--text-label)]',
        lg: 'size-12 text-[length:var(--text-title-sm)]',
        xl: 'size-16 text-[length:var(--text-title-md)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const statusVariants = cva('absolute rounded-full border-2 border-surface', {
  variants: {
    status: {
      online: 'bg-success-500',
      offline: 'bg-text-disabled',
      busy: 'bg-danger-500',
      away: 'bg-warning-500',
    },
    size: {
      xs: 'right-0 bottom-0 size-1.5',
      sm: 'right-0 bottom-0 size-2',
      md: 'right-0 bottom-0 size-2.5',
      lg: 'right-0.5 bottom-0.5 size-3',
      xl: 'right-1 bottom-1 size-3.5',
    },
  },
  defaultVariants: {
    status: 'online',
    size: 'md',
  },
})

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string
  src?: string
  name?: string
  initials?: string
  alt?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
}

export function Avatar({
  className,
  size = 'md',
  src,
  name,
  initials,
  alt,
  status,
}: AvatarProps) {
  const label = initials ?? (name ? getInitials(name) : '?')
  const imageAlt = alt ?? name ?? 'Avatar'

  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src ? (
        <img src={src} alt={imageAlt} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{label}</span>
      )}
      {status ? (
        <span
          className={statusVariants({ status, size })}
          aria-label={`Status: ${status}`}
        />
      ) : null}
    </span>
  )
}

export { avatarVariants, statusVariants }
