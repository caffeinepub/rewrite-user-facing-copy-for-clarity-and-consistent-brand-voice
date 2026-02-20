import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';
import { Mail, Heart, Sparkles, Users, BookOpen, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" alt="Righteous Truths Logo" className="h-32 w-32 object-contain mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Righteous Truths
          </h1>
          <p className="text-lg text-muted-foreground">
            A creative platform for artists, fathers, and visionaries
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Righteous Truths was founded on a vision: to build a platform where creativity, purpose, and community come together. We saw the need for a space that celebrates creators, supports meaningful expression, and provides professional tools for digital art.
            </p>
            <p>
              Through AI-powered technology and intuitive design, we've created an ecosystem where users can generate coloring pages, affirmations, memes, and DTF artwork—then share or sell their creations in a vibrant marketplace. Whether you're an experienced artist or exploring your creative side, Righteous Truths gives you the tools and community to thrive.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We empower creators with professional tools, transparent licensing, and a supportive marketplace. Our mission is to make digital art creation accessible while ensuring creators retain full ownership and control.
            </p>
            <p>
              We're building a community where creators can find inspiration, express themselves authentically, and connect with others who value purpose-driven work and creative excellence.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI-Powered Creation</CardTitle>
              <CardDescription>Generate coloring pages, affirmations, and memes with intelligent tools</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Creative Community</CardTitle>
              <CardDescription>Connect with creators and collaborate on inspiring projects</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Creator Marketplace</CardTitle>
              <CardDescription>Buy and sell digital art, DTF designs, and creative content</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Creator Rights & Licensing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Creators on Righteous Truths retain full copyright ownership. Our transparent licensing framework allows you to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Keep complete intellectual property rights to your work</li>
              <li>Define usage terms for buyers, including commercial and derivative rights</li>
              <li>Configure royalty splits for collaborative projects</li>
              <li>Track earnings and licensing agreements via your dashboard</li>
            </ul>
            <p>
              All licensing agreements are reviewed by admins to ensure platform standards and protect both creators and buyers.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Have questions, feedback, or partnership ideas? We'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="mailto:contact@righteous-truths.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect With Us</CardTitle>
            <CardDescription>Follow us for platform updates, creator spotlights, and community news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="mr-2 h-5 w-5" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <SiInstagram className="mr-2 h-5 w-5" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <SiTiktok className="mr-2 h-5 w-5" />
                  TikTok
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <SiYoutube className="mr-2 h-5 w-5" />
                  YouTube
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
