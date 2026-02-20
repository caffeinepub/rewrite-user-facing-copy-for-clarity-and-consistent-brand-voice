import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import ContentCard from './ContentCard';
import type { CreativeContent } from '../backend';

interface RecommendationEngineProps {
  allContent: CreativeContent[];
  currentContent?: CreativeContent;
  userPurchases?: string[];
  limit?: number;
}

export default function RecommendationEngine({ 
  allContent, 
  currentContent, 
  userPurchases = [],
  limit = 3 
}: RecommendationEngineProps) {
  const recommendations = useMemo(() => {
    if (!allContent.length) return [];

    let scored = allContent.map(content => {
      let score = 0;

      // Don't recommend current content or already purchased
      if (currentContent && content.id === currentContent.id) return { content, score: -1000 };
      if (userPurchases.includes(content.id)) return { content, score: -1000 };

      // Tag-based similarity (category match)
      if (currentContent && content.category === currentContent.category) {
        score += 50;
      }

      // Price similarity
      if (currentContent) {
        const priceDiff = Math.abs(Number(content.price) - Number(currentContent.price));
        if (priceDiff < 500) score += 30; // Within $5
        else if (priceDiff < 1000) score += 15; // Within $10
      }

      // Creator match (same creator)
      if (currentContent && content.creator.toString() === currentContent.creator.toString()) {
        score += 40;
      }

      // Recency bonus (newer content)
      const ageInDays = (Date.now() - Number(content.timestamp) / 1000000) / (1000 * 60 * 60 * 24);
      if (ageInDays < 7) score += 20;
      else if (ageInDays < 30) score += 10;

      // Random factor for diversity
      score += Math.random() * 10;

      return { content, score };
    });

    // Sort by score and take top N
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);
  }, [allContent, currentContent, userPurchases, limit]);

  if (recommendations.length === 0) return null;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recommended for You
        </CardTitle>
        <CardDescription>Content you might enjoy based on your interests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map(content => (
            <ContentCard key={content.id} content={content} showEngagement={false} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
