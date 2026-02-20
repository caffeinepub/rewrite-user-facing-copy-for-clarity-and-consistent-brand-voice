import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSearchDtfDesigns, useGetDtfDesignsByType } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Printer, Download, ExternalLink, ShoppingCart, ArrowLeft, Upload, Share2, Trash2 } from 'lucide-react';
import { DtfContentType } from '../backend';
import UploadDtfModal from '../components/UploadDtfModal';
import AnimatedButton from '../components/AnimatedButton';
import { toast } from 'sonner';

export default function DtfGalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<DtfContentType | null>(null);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const { data: searchResults = [], isLoading: searchLoading } = useSearchDtfDesigns(searchTerm);
  const { data: typeResults = [], isLoading: typeLoading } = useGetDtfDesignsByType(selectedType);

  const designs = searchTerm ? searchResults : typeResults;
  const isLoading = searchLoading || typeLoading;

  const getContentTypeLabel = (type: DtfContentType) => {
    switch (type) {
      case DtfContentType.purchase:
        return 'Purchase';
      case DtfContentType.freeDownload:
        return 'Free Download';
      case DtfContentType.externalRedirect:
        return 'External Link';
      default:
        return 'Unknown';
    }
  };

  const getContentTypeVariant = (type: DtfContentType): 'default' | 'secondary' | 'outline' => {
    switch (type) {
      case DtfContentType.purchase:
        return 'default';
      case DtfContentType.freeDownload:
        return 'secondary';
      case DtfContentType.externalRedirect:
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleDownload = async (design: any) => {
    try {
      const bytes = await design.previewThumbnail.getBytes();
      const blob = new Blob([bytes], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${design.title.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download design');
    }
  };

  const handleShare = (design: any) => {
    const url = `${window.location.origin}/dtf-gallery?design=${design.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section
        className="relative overflow-hidden bg-cover bg-center py-16"
        style={{ backgroundImage: 'url(/assets/generated/dtf-printer-showcase.dim_400x300.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
        <div className="container relative z-10">
          <AnimatedButton
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="mb-4"
            tooltip="Back to Marketplace"
            animationType="scale"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </AnimatedButton>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Printer className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                DTF Showcase Gallery
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Explore direct-to-film artwork designs. Download, color interactively, or purchase premium designs.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search DTF designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedType || 'all'}
              onValueChange={(value) => setSelectedType(value === 'all' ? null : (value as DtfContentType))}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={DtfContentType.purchase}>Purchase</SelectItem>
                <SelectItem value={DtfContentType.freeDownload}>Free Download</SelectItem>
                <SelectItem value={DtfContentType.externalRedirect}>External Link</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {identity && <UploadDtfModal />}
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="h-[400px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : designs.length === 0 ? (
          <Card className="p-12 text-center">
            <img
              src="/assets/generated/dtf-icon-transparent.dim_64x64.png"
              alt="No designs"
              className="mx-auto mb-4 h-16 w-16 opacity-50"
            />
            <p className="mb-2 text-lg font-semibold">No DTF designs found</p>
            <p className="text-muted-foreground">
              {identity ? 'Be the first to upload a DTF design!' : 'Check back later for new designs.'}
            </p>
            {identity && (
              <div className="mt-4">
                <UploadDtfModal />
              </div>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {designs.map((design) => (
              <Card key={design.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={design.previewThumbnail.getDirectURL()}
                      alt={design.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-lg">{design.title}</CardTitle>
                    <Badge variant={getContentTypeVariant(design.contentType)} className="shrink-0">
                      {getContentTypeLabel(design.contentType)}
                    </Badge>
                  </div>
                  <CardDescription className="mb-2">by {design.artist}</CardDescription>
                  {design.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {design.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2 p-4 pt-0">
                  {design.contentType === DtfContentType.purchase && design.price && (
                    <div className="w-full text-center">
                      <span className="text-lg font-bold text-primary">
                        ${(Number(design.price) / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex w-full gap-2">
                    {design.contentType === DtfContentType.freeDownload && (
                      <AnimatedButton
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(design)}
                        tooltip="Download Image"
                        animationType="lift"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </AnimatedButton>
                    )}
                    {design.contentType === DtfContentType.purchase && (
                      <AnimatedButton 
                        size="sm" 
                        className="flex-1"
                        tooltip="Purchase Now"
                        animationType="glow"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Purchase
                      </AnimatedButton>
                    )}
                    {design.contentType === DtfContentType.externalRedirect && design.externalLink && (
                      <AnimatedButton
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(design.externalLink, '_blank')}
                        tooltip="Visit External Link"
                        animationType="scale"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </AnimatedButton>
                    )}
                    <AnimatedButton
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare(design)}
                      tooltip="Share Design"
                      animationType="scale"
                    >
                      <Share2 className="h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
