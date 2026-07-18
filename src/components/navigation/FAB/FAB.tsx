import type { LucideIcon } from 'lucide-react'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FABProps = {
  icon?: LucideIcon
  label?: string
  onClick?: () => void
  href?: string
  className?: string
}

export function FAB({
  icon: Icon = Settings,
  label = 'Settings',
  onClick,
  href,
  className,
}: FABProps) {
  const classes = cn(
    'fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-fab transition-transform hover:scale-105 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/30 active:scale-95',
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} aria-label={label}>
        <Icon className="size-6" aria-hidden />
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={label}>
      <Icon className="size-6" aria-hidden />
    </button>
  )
}
