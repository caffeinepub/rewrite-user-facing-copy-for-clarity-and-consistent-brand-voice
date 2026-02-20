import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

interface AnimatedButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  tooltip?: string;
  animationType?: 'lift' | 'glow' | 'scale' | 'pulse' | 'none';
}

const AnimatedButton = forwardRef<ElementRef<typeof Button>, AnimatedButtonProps>(
  ({ className, tooltip, animationType = 'lift', children, ...props }, ref) => {
    const animationClass = {
      lift: 'btn-hover-lift',
      glow: 'btn-hover-glow',
      scale: 'btn-hover-scale',
      pulse: 'hover:animate-pulse',
      none: '',
    }[animationType];

    const button = (
      <Button
        ref={ref}
        className={cn('btn-animated', animationClass, className)}
        {...props}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
