import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerCreativeStudioContent } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Share2, Palette, Heart, Laugh, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { SiFacebook, SiX, SiInstagram, SiPinterest } from 'react-icons/si';

export default function MyCreationsPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: creations, isLoading } = useGetCallerCreativeStudioContent();

  if (!identity) {
    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-md p-12 text-center">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">
            Please login to view your creations.
          </p>
        </Card>
      </div>
    );
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  const handleShare = (platform: string, url: string, text: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
        break;
      case 'instagram':
        toast.info('Copy the link and share on Instagram!');
        navigator.clipboard.writeText(url);
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="border-b bg-background/95 py-8">
        <div className="container">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/creative-studio' })}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creative Studio
          </Button>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Creations</h1>
          <p className="mt-2 text-muted-foreground">
            View, download, and share all your AI-generated creations.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-[400px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="coloring" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="coloring">
                <Palette className="mr-2 h-4 w-4" />
                Coloring
              </TabsTrigger>
              <TabsTrigger value="affirmations">
                <Heart className="mr-2 h-4 w-4" />
                Affirmations
              </TabsTrigger>
              <TabsTrigger value="memes">
                <Laugh className="mr-2 h-4 w-4" />
                Memes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="coloring" className="mt-6">
              {!creations?.coloringPages.length ? (
                <Card className="p-12 text-center">
                  <Palette className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No coloring pages yet. Create your first one in the Creative Studio!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate({ to: '/creative-studio' })}
                  >
                    Create Coloring Page
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {creations.coloringPages.map((page) => (
                    <Card key={page.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={page.image.getDirectURL()}
                          alt={`${page.theme} coloring page`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg capitalize">{page.theme}</CardTitle>
                        <CardDescription className="capitalize">
                          Difficulty: {page.difficulty}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleDownload(page.image.getDirectURL(), `coloring-${page.theme}-${page.id}.png`)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('facebook', page.image.getDirectURL(), `Check out my ${page.theme} coloring page!`)}
                          >
                            <SiFacebook className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('twitter', page.image.getDirectURL(), `Check out my ${page.theme} coloring page!`)}
                          >
                            <SiX className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('pinterest', page.image.getDirectURL(), `Check out my ${page.theme} coloring page!`)}
                          >
                            <SiPinterest className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyLink(page.image.getDirectURL())}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="affirmations" className="mt-6">
              {!creations?.affirmations.length ? (
                <Card className="p-12 text-center">
                  <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No affirmations yet. Create your first one in the Creative Studio!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate({ to: '/creative-studio' })}
                  >
                    Create Affirmation
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {creations.affirmations.map((affirmation) => (
                    <Card key={affirmation.id}>
                      <CardHeader>
                        <CardTitle className="text-lg capitalize">{affirmation.mood}</CardTitle>
                        <CardDescription>
                          {new Date(Number(affirmation.timestamp) / 1000000).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-center text-lg font-medium italic">
                          "{affirmation.text}"
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('facebook', window.location.href, affirmation.text)}
                          >
                            <SiFacebook className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('twitter', window.location.href, affirmation.text)}
                          >
                            <SiX className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('instagram', window.location.href, affirmation.text)}
                          >
                            <SiInstagram className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              navigator.clipboard.writeText(affirmation.text);
                              toast.success('Affirmation copied!');
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="memes" className="mt-6">
              {!creations?.memes.length ? (
                <Card className="p-12 text-center">
                  <Laugh className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No memes yet. Create your first one in the Creative Studio!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate({ to: '/creative-studio' })}
                  >
                    Create Meme
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {creations.memes.map((meme) => (
                    <Card key={meme.id} className="overflow-hidden">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={meme.backgroundImage.getDirectURL()}
                          alt="Meme background"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                          {meme.topCaption && (
                            <p className="text-center text-2xl font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: meme.font }}>
                              {meme.topCaption}
                            </p>
                          )}
                          {meme.bottomCaption && (
                            <p className="text-center text-2xl font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: meme.font }}>
                              {meme.bottomCaption}
                            </p>
                          )}
                        </div>
                      </div>
                      <CardContent className="space-y-2 pt-4">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleDownload(meme.backgroundImage.getDirectURL(), `meme-${meme.id}.png`)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('facebook', meme.backgroundImage.getDirectURL(), `${meme.topCaption} ${meme.bottomCaption}`)}
                          >
                            <SiFacebook className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('twitter', meme.backgroundImage.getDirectURL(), `${meme.topCaption} ${meme.bottomCaption}`)}
                          >
                            <SiX className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare('instagram', meme.backgroundImage.getDirectURL(), `${meme.topCaption} ${meme.bottomCaption}`)}
                          >
                            <SiInstagram className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyLink(meme.backgroundImage.getDirectURL())}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </section>
    </div>
  );
}
