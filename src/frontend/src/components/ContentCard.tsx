import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import type { CreativeContent } from '../backend';
import AnimatedButton from './AnimatedButton';

interface ContentCardProps {
  content: CreativeContent;
  showEngagement?: boolean;
}

export default function ContentCard({ content, showEngagement = true }: ContentCardProps) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));
  const [shares, setShares] = useState(Math.floor(Math.random() * 20));
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: bigint) => {
    return `$${(Number(price) / 100).toFixed(2)}`;
  };

  const getCategoryLabel = (category: string) => {
    return category.replace(/([A-Z])/g, ' $1').trim();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/content/${content.id}`;
    navigator.clipboard.writeText(url);
    setShares(shares + 1);
    toast.success('Link copied to clipboard!');
  };

  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-primary">{content.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {getCategoryLabel(content.category)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{content.preview}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {showEngagement && (
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-all duration-200 hover:text-primary hover:scale-110 ${isLiked ? 'text-primary' : ''}`}
            >
              <Heart className={`h-4 w-4 transition-all ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Share2 className="h-4 w-4" />
              <span>{shares}</span>
            </button>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold text-primary">{formatPrice(content.price)}</span>
          <AnimatedButton
            size="sm"
            onClick={() => navigate({ to: '/content/$contentId', params: { contentId: content.id } })}
            tooltip="View Details"
            animationType="lift"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </AnimatedButton>
        </div>
      </CardFooter>
    </Card>
  );
}
