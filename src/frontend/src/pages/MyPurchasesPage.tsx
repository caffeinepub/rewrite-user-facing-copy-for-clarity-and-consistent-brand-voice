import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerPurchases, useGetContentById, useGetLicensingAgreement } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, ShoppingBag, Info, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

function PurchaseItem({ contentId, purchaseTime }: { contentId: string; purchaseTime: bigint }) {
  const { data: content } = useGetContentById(contentId);
  const { data: licensing } = useGetLicensingAgreement(contentId);

  const handleDownload = async () => {
    if (!content) return;

    try {
      const bytes = await content.contentBlob.getBytes();
      const blob = new Blob([bytes]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${content.title}.file`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Download started!');
    } catch (error) {
      console.error('Error downloading content:', error);
      toast.error('Failed to download content. Please try again or contact support.');
    }
  };

  if (!content) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-3/4 rounded bg-muted" />
        </CardHeader>
      </Card>
    );
  }

  const purchaseDate = new Date(Number(purchaseTime) / 1000000);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2">{content.title}</CardTitle>
            <CardDescription className="line-clamp-2">{content.description}</CardDescription>
            <p className="text-xs text-muted-foreground mt-2">
              Purchased: {purchaseDate.toLocaleDateString()}
            </p>
          </div>
          <Badge variant="secondary">
            {content.category.replace(/([A-Z])/g, ' $1').trim()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${(Number(content.price) / 100).toFixed(2)}
          </span>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        
        {licensing && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {licensing.commercialUse && (
                <p className="mb-1">✓ Commercial use allowed</p>
              )}
              {licensing.derivativeWorks !== 'none' && (
                <p className="mb-1">✓ Derivative works permitted</p>
              )}
              {licensing.royaltySplit.length > 1 && (
                <p className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Supports {licensing.royaltySplit.length} creator(s)
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default function MyPurchasesPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: purchases = [], isLoading } = useGetCallerPurchases();

  if (!identity) {
    return (
      <div className="container py-12">
        <Card className="p-12 text-center">
          <p className="mb-4 text-lg text-muted-foreground">Please login to view your purchases</p>
          <Button onClick={() => navigate({ to: '/' })}>Go to Marketplace</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Purchases</h1>
        <p className="text-muted-foreground">Download and access your purchased content with full licensing rights</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[250px] animate-pulse bg-muted" />
          ))}
        </div>
      ) : purchases.length === 0 ? (
        <Card className="p-12 text-center">
          <img
            src="/assets/generated/cart-icon-transparent.dim_64x64.png"
            alt="Cart"
            className="mx-auto mb-4 h-16 w-16 opacity-50"
          />
          <p className="mb-4 text-lg text-muted-foreground">You haven't purchased any content yet</p>
          <Button onClick={() => navigate({ to: '/marketplace' })}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse Marketplace
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {purchases.map((purchase) => (
            <PurchaseItem 
              key={purchase.contentId} 
              contentId={purchase.contentId}
              purchaseTime={purchase.purchaseTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
