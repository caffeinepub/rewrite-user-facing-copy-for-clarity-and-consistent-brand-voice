import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetUserProfile, useGetCreatorSummary, useSearchContent } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Package, ShoppingCart, DollarSign } from 'lucide-react';
import ContentCard from '../components/ContentCard';

export default function CreatorProfilePage() {
  const { creatorId } = useParams({ from: '/creator/$creatorId' });
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useGetUserProfile(creatorId);
  const { data: summary } = useGetCreatorSummary(creatorId);
  const { data: allContent = [] } = useSearchContent('', null);

  const creatorContent = allContent.filter((content) => content.creator.toString() === creatorId);

  if (profileLoading) {
    return (
      <div className="container py-12">
        <Card className="h-[400px] animate-pulse bg-muted" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {profile?.name?.slice(0, 2).toUpperCase() || creatorId.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="mb-2 text-2xl">
                {profile?.name || `Creator ${creatorId.slice(0, 8)}...`}
              </CardTitle>
              {profile?.bio && <CardDescription>{profile.bio}</CardDescription>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
              <Package className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{summary ? Number(summary.itemCount) : 0}</p>
                <p className="text-sm text-muted-foreground">Items</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{summary ? Number(summary.totalSales) : 0}</p>
                <p className="text-sm text-muted-foreground">Sales</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">
                  ${summary ? (Number(summary.totalRevenue) / 100).toFixed(2) : '0.00'}
                </p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content by this Creator</CardTitle>
          <CardDescription>Browse all available works</CardDescription>
        </CardHeader>
        <CardContent>
          {creatorContent.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">This creator hasn't uploaded any content yet</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creatorContent.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
