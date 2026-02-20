import { useState, useEffect } from 'react';
import { useIsCallerAdmin, useIsStripeConfigured, useSetStripeConfiguration } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StripeSetupModal() {
  const { data: isAdmin } = useIsCallerAdmin();
  const { data: isConfigured, isLoading: configLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();
  const [open, setOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('US,CA,GB');
  const [isLiveKey, setIsLiveKey] = useState(false);

  useEffect(() => {
    if (isAdmin && !configLoading && isConfigured === false) {
      setOpen(true);
    }
  }, [isAdmin, isConfigured, configLoading]);

  useEffect(() => {
    // Detect if using live or test Stripe keys
    if (secretKey.startsWith('sk_live_')) {
      setIsLiveKey(true);
    } else if (secretKey.startsWith('sk_test_')) {
      setIsLiveKey(false);
    }
  }, [secretKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!secretKey.trim()) {
      toast.error('Please enter your Stripe secret key');
      return;
    }

    if (!secretKey.startsWith('sk_live_') && !secretKey.startsWith('sk_test_')) {
      toast.error('Invalid Stripe secret key format');
      return;
    }

    const countryList = countries.split(',').map(c => c.trim()).filter(c => c.length > 0);
    if (countryList.length === 0) {
      toast.error('Please enter at least one country code');
      return;
    }

    // Warn if using test keys
    if (!isLiveKey) {
      const confirmed = window.confirm(
        'Warning: You are using test Stripe keys. These should only be used in development. ' +
        'For production, use live keys (sk_live_...). Continue anyway?'
      );
      if (!confirmed) return;
    }

    try {
      await setConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countryList,
      });
      toast.success(
        isLiveKey 
          ? 'Stripe configured successfully with live keys!' 
          : 'Stripe configured with test keys - remember to switch to live keys for production'
      );
      setOpen(false);
    } catch (error) {
      console.error('Error configuring Stripe:', error);
      toast.error('Failed to configure Stripe. Please try again.');
    }
  };

  if (!isAdmin || configLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Configure Stripe Payment</DialogTitle>
          <DialogDescription>
            Set up Stripe to enable payment processing on your platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {secretKey && !isLiveKey && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Test keys detected (sk_test_...). Use live keys (sk_live_...) for production transactions.
              </AlertDescription>
            </Alert>
          )}

          {secretKey && isLiveKey && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Live keys detected - ready for production transactions.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="secretKey">Stripe Secret Key *</Label>
            <Input
              id="secretKey"
              type="password"
              placeholder="sk_live_... or sk_test_..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              disabled={setConfig.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Use live keys (sk_live_...) for production, test keys (sk_test_...) for development
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="countries">Allowed Countries (comma-separated) *</Label>
            <Input
              id="countries"
              placeholder="US,CA,GB,AU,DE,FR"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              disabled={setConfig.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Enter ISO country codes separated by commas (e.g., US, CA, GB)
            </p>
          </div>

          <div className="pt-2 space-y-2 text-xs text-muted-foreground">
            <p>📝 Production Checklist:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use live Stripe API keys (sk_live_...)</li>
              <li>Configure webhook endpoints for payment confirmations</li>
              <li>Enable fraud detection in Stripe Dashboard</li>
              <li>Set up tax calculation for international payments</li>
              <li>Configure Stripe Connect for creator payouts</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={setConfig.isPending}>
            {setConfig.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLiveKey ? 'Configure Production Stripe' : 'Configure Test Stripe'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
