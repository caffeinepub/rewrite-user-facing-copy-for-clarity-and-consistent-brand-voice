import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface EmbedWidgetProps {
  type: 'dtf-gallery' | 'shop-preview' | 'promotional';
  maxItems?: number;
}

export default function EmbedWidget({ type, maxItems = 6 }: EmbedWidgetProps) {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Detect if page is being embedded in an iframe
    setIsEmbedded(window.self !== window.top);
  }, []);

  const getWidgetContent = () => {
    switch (type) {
      case 'dtf-gallery':
        return {
          title: 'DTF Gallery',
          description: 'Explore our collection of direct-to-film artwork',
          link: '/dtf-gallery',
        };
      case 'shop-preview':
        return {
          title: 'Marketplace',
          description: 'Browse and purchase digital creative works',
          link: '/store',
        };
      case 'promotional':
        return {
          title: 'Righteous Truths',
          description: 'Creative platform for fathers and Black Kings',
          link: '/',
        };
    }
  };

  const content = getWidgetContent();

  if (isEmbedded) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={content.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Full Site
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is an embedded widget. Visit the full site for the complete experience.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
