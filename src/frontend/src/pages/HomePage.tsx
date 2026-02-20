import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpen, Users, Store, ArrowRight, Printer } from 'lucide-react';
import { useDailyAffirmation } from '../hooks/useQueries';
import SEOHead from '../components/SEOHead';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: dailyAffirmation } = useDailyAffirmation();

  return (
    <>
      <SEOHead
        title="Home - Righteous Truths Creative Platform"
        description="Righteous Truths empowers creators with AI tools, collaborative spaces, and a marketplace for digital art. Create, share, and monetize your work."
        keywords="creative platform, digital art, AI tools, coloring pages, affirmations, DTF designs, marketplace"
        ogType="website"
      />
      <div className="flex flex-col">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background">
          <div className="container relative z-10 flex min-h-[600px] flex-col items-center justify-center gap-8 py-20 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <img 
              src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" 
              alt="Righteous Truths Logo" 
              className="h-32 w-32 object-contain animate-in zoom-in-50 duration-700" 
              loading="eager"
            />
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in slide-in-from-bottom-6 duration-1000 delay-200">
              Righteous Truths
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              Create, share, and sell digital art with powerful AI tools. A platform built for creators who value purpose and community.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Button size="lg" onClick={() => navigate({ to: '/store' })} className="gap-2 transition-all hover:scale-105">
                <Store className="h-5 w-5" />
                Browse Store
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/marketplace' })} className="gap-2 transition-all hover:scale-105">
                Explore Marketplace
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/assets/generated/website-hero-banner.dim_1200x600.png')] bg-cover bg-center opacity-10" />
        </section>

        <section className="container py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Daily Affirmation</CardTitle>
              <CardDescription>Your daily dose of inspiration and encouragement</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl font-medium italic text-foreground">
                {dailyAffirmation || 'You are capable, resilient, and worthy of every success you pursue.'}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="container py-16">
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, collaborate, and monetize your digital art
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:border-primary hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100" 
              onClick={() => navigate({ to: '/creative-studio' })}
            >
              <CardHeader>
                <Sparkles className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <CardTitle>Creative Studio</CardTitle>
                <CardDescription>AI-powered tools for coloring pages, affirmations, and memes</CardDescription>
              </CardHeader>
            </Card>
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:border-primary hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200" 
              onClick={() => navigate({ to: '/coloring-book-builder' })}
            >
              <CardHeader>
                <BookOpen className="h-10 w-10 text-accent mb-2 transition-transform group-hover:scale-110" />
                <CardTitle>Book Builder</CardTitle>
                <CardDescription>Build custom coloring books with adjustable line thickness</CardDescription>
              </CardHeader>
            </Card>
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:border-primary hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300" 
              onClick={() => navigate({ to: '/community' })}
            >
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Explore affirmations, poetry, and creative works from fellow creators</CardDescription>
              </CardHeader>
            </Card>
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:border-primary hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-[400ms]" 
              onClick={() => navigate({ to: '/store' })}
            >
              <CardHeader>
                <Store className="h-10 w-10 text-accent mb-2 transition-transform group-hover:scale-110" />
                <CardTitle>Digital Store</CardTitle>
                <CardDescription>Premium digital art, DTF designs, and creative content</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">DTF Gallery</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional direct-to-film designs ready for print
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Card 
                className="cursor-pointer transition-all hover:shadow-xl hover:border-primary hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100" 
                onClick={() => navigate({ to: '/dtf-gallery' })}
              >
                <CardHeader className="text-center">
                  <Printer className="h-10 w-10 text-primary mb-2 mx-auto transition-transform group-hover:scale-110" />
                  <CardTitle>DTF Showcase</CardTitle>
                  <CardDescription>High-quality direct-to-film artwork for purchase and download</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Create?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join creators building, sharing, and monetizing their digital art on Righteous Truths
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/marketplace' })} className="gap-2 transition-all hover:scale-105">
              Visit Marketplace
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
