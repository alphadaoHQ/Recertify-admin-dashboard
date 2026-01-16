import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground hover:from-purple-600 hover:to-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95',
        destructive:
          'bg-gradient-to-r from-destructive to-red-600 text-white hover:from-red-600 hover:to-destructive shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-border/50 bg-background/50 backdrop-blur-sm shadow-xs hover:bg-accent/50 hover:text-accent-foreground hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-95 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-gradient-to-r from-secondary to-muted text-secondary-foreground hover:from-muted hover:to-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95',
        ghost:
          'hover:bg-accent/50 hover:text-accent-foreground hover:shadow-md hover:-translate-y-0.5 active:scale-95 dark:hover:bg-accent/30',
        link: 'text-primary underline-offset-4 hover:underline hover:text-purple-600 transition-colors',
        gradient: 'bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_100%] text-primary-foreground hover:bg-[position:100%_0] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-500',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
