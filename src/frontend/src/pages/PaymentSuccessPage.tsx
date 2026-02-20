import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePurchaseContent, useGetContentById, useGetLicensingAgreement } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Loader2, ShoppingBag, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const purchaseContent = usePurchaseContent();
  const [isProcessing, setIsProcessing] = useState(true);
  const [contentId, setContentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: content } = useGetContentById(contentId || undefined);
  const { data: licensing } = useGetLicensingAgreement(contentId || undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const purchaseContentId = params.get('content_id');

    if (sessionId && purchaseContentId && !purchaseContent.isSuccess) {
      setContentId(purchaseContentId);
      
      purchaseContent.mutate(
        { contentId: purchaseContentId, sessionId },
        {
          onSuccess: () => {
            toast.success('Purchase completed successfully! Royalty splits have been recorded.');
            setIsProcessing(false);
          },
          onError: (error) => {
            console.error('Error recording purchase:', error);
            setError('Payment successful, but there was an error recording your purchase. Please contact support with your session ID.');
            toast.error('Error recording purchase');
            setIsProcessing(false);
          },
        }
      );
    } else if (!sessionId || !purchaseContentId) {
      setError('Invalid payment session. Please contact support if you completed a payment.');
      setIsProcessing(false);
    }
  }, []);

  if (isProcessing) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
            <CardTitle className="text-2xl">Processing Your Purchase</CardTitle>
            <CardDescription>
              Please wait while we confirm your payment and set up royalty tracking...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-center">Payment Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate({ to: '/purchases' })}>
                View My Purchases
              </Button>
              <Button variant="outline" onClick={() => navigate({ to: '/marketplace' })}>
                Return to Marketplace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Your purchase has been completed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content && (
            <div className="rounded-lg bg-muted p-4 text-left">
              <p className="text-sm font-medium mb-1">Purchased Content:</p>
              <p className="text-lg font-bold">{content.title}</p>
              <p className="text-sm text-muted-foreground mt-2">
                ${(Number(content.price) / 100).toFixed(2)}
              </p>
            </div>
          )}
          
          {licensing && licensing.royaltySplit.length > 1 && (
            <Alert>
              <AlertDescription className="text-left">
                <p className="font-medium mb-1">Royalty Distribution:</p>
                <p className="text-xs text-muted-foreground">
                  Your purchase supports {licensing.royaltySplit.length} creator(s). 
                  Royalties have been automatically distributed according to the licensing agreement.
                </p>
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground">
            Thank you for your purchase! You can now download your content from your purchases page.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate({ to: '/purchases' })}>
              <Download className="mr-2 h-4 w-4" />
              View My Purchases
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/marketplace' })}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
