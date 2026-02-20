import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetContentById, useGetUserProfile, useCreateCheckoutSession, useGetLicensingAgreement } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ShoppingCart, User, Loader2, Shield, Info } from 'lucide-react';
import { toast } from 'sonner';
import LicensingBadge from '../components/LicensingBadge';
import SEOHead from '../components/SEOHead';

export default function ContentDetailPage() {
  const { contentId } = useParams({ from: '/content/$contentId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const { data: content, isLoading } = useGetContentById(contentId);
  const { data: creatorProfile } = useGetUserProfile(content?.creator.toString());
  const { data: licensing } = useGetLicensingAgreement(contentId);
  const createCheckoutSession = useCreateCheckoutSession();

  const handlePurchase = async () => {
    if (!identity) {
      toast.error('Please login to purchase content');
      return;
    }

    if (!content) return;

    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const session = await createCheckoutSession.mutateAsync({
        items: [
          {
            productName: content.title,
            productDescription: content.description,
            priceInCents: content.price,
            quantity: BigInt(1),
            currency: 'usd',
          },
        ],
        successUrl: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&content_id=${content.id}`,
        cancelUrl: `${baseUrl}/payment-failure`,
      });

      window.location.href = session.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout session');
    }
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container py-12">
        <Card className="p-12 text-center">
          <p className="mb-4 text-lg text-muted-foreground">Content not found</p>
          <Button onClick={() => navigate({ to: '/marketplace' })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Card>
      </div>
    );
  }

  const price = Number(content.price) / 100;
  
  // Structured data for SEO
  const structuredData = {
    '@type': 'Product',
    name: content.title,
    description: content.description,
    category: content.category,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@type': 'Person',
      name: creatorProfile?.name || 'Anonymous Creator',
    },
  };

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.description}
        keywords={`${content.category}, digital content, creative work, ${content.title}`}
        ogType="product"
        structuredData={structuredData}
      />
      <div className="container py-12">
        <Button variant="ghost" onClick={() => navigate({ to: '/marketplace' })} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl">{content.title}</CardTitle>
                    <CardDescription className="mt-2">{content.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {content.category}
                  </Badge>
                </div>
                <LicensingBadge contentId={content.id} />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Preview</h3>
                  <p className="text-muted-foreground">{content.preview}</p>
                </div>

                <Separator />

                {licensing && (
                  <>
                    <div>
                      <h3 className="mb-3 font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Licensing Terms
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="font-medium min-w-[140px]">Commercial Use:</span>
                          <span className={licensing.commercialUse ? 'text-green-600' : 'text-muted-foreground'}>
                            {licensing.commercialUse ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium min-w-[140px]">Derivative Works:</span>
                          <span className="text-muted-foreground">
                            {licensing.derivativeWorks === 'none' && 'Not Allowed'}
                            {licensing.derivativeWorks === 'withAttribution' && 'Allowed with Attribution'}
                            {licensing.derivativeWorks === 'fullRemixRights' && 'Full Remix Rights'}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium min-w-[140px]">Redistribution:</span>
                          <span className="text-muted-foreground">
                            {licensing.redistributionRights.__kind__ === 'none' && 'Not Allowed'}
                            {licensing.redistributionRights.__kind__ === 'limited' && 'Limited (see terms)'}
                            {licensing.redistributionRights.__kind__ === 'full' && 'Full Rights'}
                          </span>
                        </div>
                        {licensing.royaltySplit.length > 1 && (
                          <Alert className="mt-4">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              This is a collaborative work. Your purchase supports {licensing.royaltySplit.length} creator(s) 
                              with automatic royalty distribution.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <div>
                  <h3 className="mb-2 font-semibold">About this Content</h3>
                  <p className="text-sm text-muted-foreground">
                    This digital content is available for purchase. Upon successful payment, you will receive immediate 
                    access to download the full content with the licensing rights specified above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-center">
                  <div className="text-4xl font-bold">${price.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
                <Button className="w-full" size="lg" onClick={handlePurchase} disabled={createCheckoutSession.isPending}>
                  {createCheckoutSession.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Purchase Now
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Secure payment via Stripe
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    {creatorProfile?.profileImage ? (
                      <AvatarImage src={creatorProfile.profileImage.getDirectURL()} alt={creatorProfile.name} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{creatorProfile?.name || 'Anonymous Creator'}</p>
                    {creatorProfile?.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{creatorProfile.bio}</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => navigate({ to: `/creator/${content.creator.toString()}` })}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
