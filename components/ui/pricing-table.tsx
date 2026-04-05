import React from 'react'
import { cn } from '@/lib/utils'
import { CheckIcon, LucideIcon, MinusIcon } from 'lucide-react'
import { Badge } from './badge'

function PricingTable({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn('w-full text-sm', className)} {...props} />
    </div>
  )
}

function PricingTableHeader({ ...props }: React.ComponentProps<'thead'>) {
  return <thead {...props} />
}

function PricingTableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      className={cn('[&_tr]:divide-x [&_tr]:border-b [&_tr]:border-outline-variant/20 [&_tr]:divide-outline-variant/20', className)}
      {...props}
    />
  )
}

function PricingTableRow({ ...props }: React.ComponentProps<'tr'>) {
  return <tr {...props} />
}

function PricingTableCell({
  className,
  children,
  ...props
}: React.ComponentProps<'td'> & { children: boolean | string }) {
  return (
    <td
      className={cn('p-4 align-middle whitespace-nowrap text-on-surface-variant', className)}
      {...props}
    >
      {children === true ? (
        <CheckIcon aria-hidden="true" className="size-4 text-primary" />
      ) : children === false ? (
        <MinusIcon aria-hidden="true" className="size-4 text-outline-variant" />
      ) : (
        children
      )}
    </td>
  )
}

function PricingTableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={cn('p-2 text-left align-middle font-headline font-normal text-xs uppercase tracking-widest text-on-surface-variant whitespace-nowrap', className)}
      {...props}
    />
  )
}

type PricingPlanType = {
  name: string
  icon: LucideIcon
  badge: string
  price: string
  compareAt?: string
}

function PricingTablePlan({
  name,
  badge,
  price,
  compareAt,
  icon: Icon,
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & PricingPlanType) {
  return (
    <div
      className={cn(
        'relative h-full overflow-hidden border border-outline-variant/30 p-3 font-normal bg-surface-container',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full border border-outline-variant/40 p-1.5">
          {Icon && <Icon className="h-3 w-3 text-primary" />}
        </div>
        <h3 className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">{name}</h3>
        <Badge
          variant="secondary"
          className="ml-auto rounded-full border border-outline-variant/20 px-2 py-0.5 text-[10px] font-normal"
        >
          {badge}
        </Badge>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-headline text-primary">{price}</span>
        {compareAt && (
          <span className="text-on-surface-variant/50 text-sm line-through">{compareAt}</span>
        )}
      </div>
      <div className="relative z-10 mt-4">{children}</div>
    </div>
  )
}

type FeatureValue = boolean | string
type FeatureItem = { label: string; values: FeatureValue[] }

export {
  type PricingPlanType,
  type FeatureValue,
  type FeatureItem,
  PricingTable,
  PricingTableHeader,
  PricingTableBody,
  PricingTableRow,
  PricingTableHead,
  PricingTableCell,
  PricingTablePlan,
}
