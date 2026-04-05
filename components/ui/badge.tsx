import React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  id?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default:     'border-transparent bg-primary text-on-primary',
  secondary:   'border-transparent bg-surface-container-high text-on-surface-variant',
  outline:     'text-on-surface border-outline-variant',
  destructive: 'border-transparent bg-red-600 text-white',
}

function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Badge }
