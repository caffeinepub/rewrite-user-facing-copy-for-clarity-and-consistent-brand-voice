import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Heart, Laugh, ArrowLeft, Printer } from 'lucide-react';
import ColoringPageGenerator from '../components/ColoringPageGenerator';
import AffirmationCreator from '../components/AffirmationCreator';
import MemeCreator from '../components/MemeCreator';
import SEOHead from '../components/SEOHead';

export default function CreativeStudioPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('coloring');

  if (!identity) {
    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-md p-12 text-center">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">
            Please login to access the Creative Studio and start creating amazing content.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Creative Studio - Righteous Truths"
        description="Unleash your creativity with AI-powered tools. Generate coloring pages, create affirmations, design memes, and explore DTF artwork."
        keywords="creative studio, AI tools, coloring pages, affirmations, memes, DTF designs"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section
          className="relative overflow-hidden bg-cover bg-center py-16"
          style={{ backgroundImage: 'url(/assets/generated/creative-studio-banner.dim_1200x400.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
          <div className="container relative z-10">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Creative Studio
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Unleash your creativity with AI-powered tools. Generate coloring pages, create affirmations, design memes, and explore DTF artwork.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-6xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="coloring" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Coloring</span>
              </TabsTrigger>
              <TabsTrigger value="affirmation" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Affirm</span>
              </TabsTrigger>
              <TabsTrigger value="meme" className="flex items-center gap-2">
                <Laugh className="h-4 w-4" />
                <span className="hidden sm:inline">Memes</span>
              </TabsTrigger>
              <TabsTrigger value="dtf" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">DTF</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="coloring" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Coloring Page Generator
                  </CardTitle>
                  <CardDescription>
                    Create beautiful coloring pages with AI. Choose a theme and difficulty level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColoringPageGenerator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affirmation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Affirmation Creator
                  </CardTitle>
                  <CardDescription>
                    Generate personalized affirmations based on your mood and intentions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AffirmationCreator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meme" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laugh className="h-5 w-5" />
                    Meme Creator
                  </CardTitle>
                  <CardDescription>
                    Design hilarious memes with AI-generated backgrounds and custom text.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MemeCreator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dtf" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Printer className="h-5 w-5" />
                    DTF Gallery
                  </CardTitle>
                  <CardDescription>
                    Explore direct-to-film artwork designs. View, download, and interact with DTF creations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <img
                    src="/assets/generated/dtf-icon-transparent.dim_64x64.png"
                    alt="DTF Gallery"
                    className="mx-auto mb-4 h-16 w-16"
                  />
                  <p className="mb-4 text-muted-foreground">
                    Visit the DTF Gallery to explore and manage DTF designs
                  </p>
                  <Button onClick={() => navigate({ to: '/dtf-gallery' })}>
                    <Printer className="mr-2 h-4 w-4" />
                    Go to DTF Gallery
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mx-auto mt-8 max-w-6xl text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: '/my-creations' })}
            >
              View My Creations
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
