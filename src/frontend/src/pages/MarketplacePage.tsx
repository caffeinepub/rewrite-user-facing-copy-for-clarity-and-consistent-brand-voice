import { useState } from 'react';
import { useSearchContent, useGetPopularCreators, useGetCallerPurchases } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, TrendingUp } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import RecommendationEngine from '../components/RecommendationEngine';
import OnboardingTooltip from '../components/OnboardingTooltip';
import SEOHead from '../components/SEOHead';
import { ContentCategory } from '../backend';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);
  const navigate = useNavigate();

  const { data: contents = [], isLoading } = useSearchContent(searchTerm, selectedCategory);
  const { data: popularCreators = [] } = useGetPopularCreators();
  const { data: purchases = [] } = useGetCallerPurchases();

  const purchasedIds = purchases.map(p => p.contentId);

  return (
    <>
      <SEOHead
        title="Marketplace - Discover Creative Content"
        description="Explore unique stories, poems, artwork, and more from talented creators. Browse our marketplace of digital creative works and find inspiration."
        keywords="marketplace, digital art, creative content, stories, poems, artwork, coloring pages, buy digital art"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section
          className="relative overflow-hidden bg-cover bg-center py-20 animate-in fade-in-0 duration-1000"
          style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1200x600.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center animate-in slide-in-from-bottom-4 duration-700">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Discover Creative Content
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Explore unique stories, poems, artwork, and more from talented creators around the world.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row animate-in fade-in-0 slide-in-from-top-4 duration-500">
            <OnboardingTooltip
              id="marketplace-search"
              title="Search Content"
              description="Use the search bar to find specific content by title or description. Try searching for themes like 'nature', 'inspiration', or 'family'."
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            </OnboardingTooltip>
            <OnboardingTooltip
              id="marketplace-filter"
              title="Filter by Category"
              description="Narrow down your search by selecting a specific content category. This helps you find exactly what you're looking for."
            >
              <Select
                value={selectedCategory || 'all'}
                onValueChange={(value) => setSelectedCategory(value === 'all' ? null : (value as ContentCategory))}
              >
                <SelectTrigger className="w-full sm:w-[200px] transition-all focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value={ContentCategory.story}>Story</SelectItem>
                  <SelectItem value={ContentCategory.poem}>Poem</SelectItem>
                  <SelectItem value={ContentCategory.lyrics}>Lyrics</SelectItem>
                  <SelectItem value={ContentCategory.quote}>Quote</SelectItem>
                  <SelectItem value={ContentCategory.artwork}>Artwork</SelectItem>
                  <SelectItem value={ContentCategory.coloringPage}>Coloring Page</SelectItem>
                  <SelectItem value={ContentCategory.audio}>Audio</SelectItem>
                </SelectContent>
              </Select>
            </OnboardingTooltip>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-3 space-y-8">
              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="h-[300px] animate-pulse bg-muted" />
                  ))}
                </div>
              ) : contents.length === 0 ? (
                <Card className="p-12 text-center animate-in fade-in-0 zoom-in-95 duration-500">
                  <p className="text-muted-foreground">No content found. Try adjusting your search.</p>
                </Card>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contents.map((content, index) => (
                      <div 
                        key={content.id} 
                        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ContentCard content={content} />
                      </div>
                    ))}
                  </div>
                  
                  {contents.length > 0 && (
                    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
                      <RecommendationEngine 
                        allContent={contents} 
                        userPurchases={purchasedIds}
                        limit={3}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-y-6">
              <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Popular Creators
                  </CardTitle>
                  <CardDescription>Top creators on the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularCreators.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No creators yet</p>
                  ) : (
                    popularCreators.slice(0, 5).map((creator, index) => (
                      <button
                        key={creator.creator.toString()}
                        onClick={() => navigate({ to: '/creator/$creatorId', params: { creatorId: creator.creator.toString() } })}
                        className="flex w-full items-center gap-3 rounded-lg p-2 transition-all hover:bg-muted hover:scale-105 animate-in fade-in-0 slide-in-from-right-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Avatar>
                          <AvatarFallback>
                            {creator.creator.toString().slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">
                            {creator.creator.toString().slice(0, 8)}...
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Number(creator.totalSales)} sales
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
