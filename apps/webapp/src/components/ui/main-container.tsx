import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const mainContainerVariants = cva('mx-auto', {
  variants: {
    size: {
      small: 'max-w-screen-sm',
      large: 'max-w-screen-xl',
    },
  },
  defaultVariants: { size: 'small' },
});

export interface MainContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mainContainerVariants> {
  asChild?: boolean;
}

/**
 * Main container for the page, just a wrapper for setting max width of the page content
 */
export const MainContainer = React.forwardRef<
  HTMLDivElement,
  MainContainerProps
>(function MainContainer({ className, size, asChild, ...rest }, ref) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn(mainContainerVariants({ size, className }))}
      {...rest}
    />
  );
});
