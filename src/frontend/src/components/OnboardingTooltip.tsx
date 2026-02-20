import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X, ChevronRight } from 'lucide-react';

interface OnboardingTooltipProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function OnboardingTooltip({ 
  id, 
  title, 
  description, 
  children, 
  position = 'bottom' 
}: OnboardingTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = `onboarding-${id}`;

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem(storageKey);
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        side={position} 
        className="w-80 animate-in fade-in-0 zoom-in-95"
        sideOffset={8}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-sm">{title}</h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Button
            size="sm"
            onClick={handleDismiss}
            className="w-full gap-2"
          >
            Got it
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
