import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSearchContent, useDtfGallery } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, Loader2 } from 'lucide-react';
import { DtfContentType } from '../backend';

export default function StorePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: contentItems = [], isLoading: contentLoading } = useSearchContent(searchTerm, null);
  const { data: dtfDesigns = [], isLoading: dtfLoading } = useDtfGallery();

  const purchasableContent = contentItems.filter(item => item.price > 0);
  const purchasableDtf = dtfDesigns.filter(design => design.contentType === DtfContentType.purchase);

  const isLoading = contentLoading || dtfLoading;

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Digital Store</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of digital art, DTF materials, customizable coloring books, and creative assets
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="digital-art">Digital Art</TabsTrigger>
            <TabsTrigger value="dtf">DTF Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {[...purchasableContent, ...purchasableDtf].length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products available at this time.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...purchasableContent, ...purchasableDtf].map((item) => {
                  const isDtf = 'artist' in item;
                  const price = item.price ? Number(item.price) : 0;
                  return (
                    <Card key={item.id} className="flex flex-col transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="aspect-square overflow-hidden rounded-md bg-muted mb-4">
                          <img
                            src={isDtf ? item.previewThumbnail.getDirectURL() : '/assets/generated/content-placeholder.dim_400x300.jpg'}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {isDtf ? `By ${item.artist}` : item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <Badge variant="secondary">{isDtf ? 'DTF Design' : 'Digital Art'}</Badge>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-lg font-bold">${(price / 100).toFixed(2)}</span>
                        <Button size="sm" onClick={() => navigate({ to: isDtf ? '/dtf-gallery' : `/content/${item.id}` })}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="digital-art" className="mt-8">
            {purchasableContent.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No digital art available at this time.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {purchasableContent.map((item) => {
                  const price = Number(item.price);
                  return (
                    <Card key={item.id} className="flex flex-col transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="aspect-square overflow-hidden rounded-md bg-muted mb-4">
                          <img
                            src="/assets/generated/content-placeholder.dim_400x300.jpg"
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <Badge variant="secondary">{item.category}</Badge>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-lg font-bold">${(price / 100).toFixed(2)}</span>
                        <Button size="sm" onClick={() => navigate({ to: `/content/${item.id}` })}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="dtf" className="mt-8">
            {purchasableDtf.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No DTF materials available at this time.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {purchasableDtf.map((design) => {
                  const price = design.price ? Number(design.price) : 0;
                  return (
                    <Card key={design.id} className="flex flex-col transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="aspect-square overflow-hidden rounded-md bg-muted mb-4">
                          <img
                            src={design.previewThumbnail.getDirectURL()}
                            alt={design.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardTitle className="line-clamp-1">{design.title}</CardTitle>
                        <CardDescription className="line-clamp-2">By {design.artist}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex flex-wrap gap-1">
                          {design.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-lg font-bold">${(price / 100).toFixed(2)}</span>
                        <Button size="sm" onClick={() => navigate({ to: '/dtf-gallery' })}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
