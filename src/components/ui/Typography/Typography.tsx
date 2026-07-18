import { cva, type VariantProps } from 'class-variance-authority'
import { createElement, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Escala alinhada a TypographyScale (mia-app) + Poppins */
const typographyVariants = cva('font-sans', {
  variants: {
    variant: {
      display: 'text-[length:var(--text-display)] font-semibold leading-tight tracking-tight text-text',
      h1: 'text-[length:var(--text-display)] font-bold leading-tight tracking-tight text-text',
      h2: 'text-[length:var(--text-headline)] font-bold leading-tight tracking-tight text-text',
      h3: 'text-[length:var(--text-title-lg)] font-semibold leading-snug text-text',
      h4: 'text-[length:var(--text-title-md)] font-semibold leading-snug text-text',
      h5: 'text-[length:var(--text-title-sm)] font-semibold text-text',
      h6: 'text-[length:var(--text-label)] font-semibold text-text',
      body: 'text-[length:var(--text-body-lg)] font-normal leading-relaxed text-text',
      bodySm: 'text-[length:var(--text-body-md)] font-normal leading-relaxed text-text',
      muted: 'text-[length:var(--text-body-md)] font-normal text-text-muted',
      caption: 'text-[length:var(--text-caption)] font-normal text-text-subtle',
      label: 'text-[length:var(--text-label)] font-medium text-text',
      overline:
        'text-[length:var(--text-overline)] font-semibold tracking-widest text-text-muted uppercase',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

const defaultElements = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodySm: 'p',
  muted: 'p',
  caption: 'span',
  label: 'label',
  overline: 'span',
} as const

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof HTMLElementTagNameMap
}

export function Typography({
  className,
  variant = 'body',
  as,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElements[variant ?? 'body']

  return createElement(
    Component,
    {
      className: cn(typographyVariants({ variant }), className),
      ...props,
    },
    children,
  )
}

export { typographyVariants }
