import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md border border-[rgb(var(--store-border-rgb)/0.9)] bg-[rgb(var(--store-surface-rgb)/0.84)] px-3 py-1 text-base text-foreground shadow-[0_10px_24px_rgb(15_23_42/0.06)] transition-[color,box-shadow,background-color,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-[rgb(var(--store-accent-rgb)/0.4)] focus-visible:bg-[rgb(var(--store-surface-strong-rgb)/0.98)] focus-visible:shadow-[0_0_20px_rgb(var(--store-accent-rgb)/0.12)]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }

