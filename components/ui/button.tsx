import React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  default:     'bg-primary text-on-primary hover:bg-primary-container',
  outline:     'border border-primary text-primary hover:bg-primary hover:text-on-primary',
  secondary:   'bg-surface-container text-on-surface hover:bg-surface-container-high',
  ghost:       'hover:bg-surface-container text-on-surface-variant',
  link:        'text-primary underline-offset-4 hover:underline p-0',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2 text-xs',
  sm:      'h-9 px-3 text-xs',
  lg:      'h-11 px-8 text-sm',
  icon:    'h-10 w-10',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-headline tracking-widest uppercase transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button }
