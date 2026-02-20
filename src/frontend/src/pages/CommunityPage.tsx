import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, Heart, BookOpen, Music, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function CommunityPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample community content for display
  const sampleAffirmations = [
    {
      id: '1',
      title: 'Strength in Fatherhood',
      content: 'I am a strong and capable father, providing love and guidance to my family.',
    },
    {
      id: '2',
      title: 'Daily Courage',
      content: 'My presence makes a positive difference in the lives of those around me.',
    },
    {
      id: '3',
      title: 'Growth Mindset',
      content: 'I embrace challenges as opportunities for growth and learning.',
    },
  ];

  const samplePoems = [
    {
      id: '1',
      title: 'A Father\'s Journey',
      content: 'Through trials and triumphs, I stand tall,\nGuiding my children through it all.\nWith love and wisdom, day by day,\nI light their path along the way.',
    },
    {
      id: '2',
      title: 'Resilience',
      content: 'In the face of storms, I remain strong,\nMy spirit unbroken, my will lifelong.\nFor those I love, I persevere,\nFacing each challenge without fear.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Community - Righteous Truths"
        description="Discover affirmations, poems, and creative content from the Righteous Truths community of creators."
        keywords="community, affirmations, poems, inspiration, creative content"
      />
      <div className="container py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Community</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore inspiring affirmations, poetry, and creative works from our community
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search community content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="affirmations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
            <TabsTrigger value="poems">Poems</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
          </TabsList>

          <TabsContent value="affirmations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sampleAffirmations.map((affirmation) => (
                <Card key={affirmation.id} className="transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      {affirmation.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">{affirmation.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button onClick={() => navigate({ to: '/creative-studio' })} className="gap-2">
                Create Your Own Affirmation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="poems" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {samplePoems.map((poem) => (
                <Card key={poem.id} className="transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      {poem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{poem.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button onClick={() => navigate({ to: '/creative-studio' })} className="gap-2">
                Share Your Poetry
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-4">
            <Card className="border-2 border-dashed">
              <CardHeader className="text-center">
                <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle>Music Coming Soon</CardTitle>
                <CardDescription>
                  We're building a space for audio content and musical collaborations. Stay tuned for updates!
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
