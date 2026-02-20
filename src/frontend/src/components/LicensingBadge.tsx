import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, DollarSign, Shuffle, Info, Users } from 'lucide-react';
import { useGetRoyaltyAndLicensingSummary } from '../hooks/useQueries';

interface LicensingBadgeProps {
  contentId: string;
}

export default function LicensingBadge({ contentId }: LicensingBadgeProps) {
  const { data: summary, isLoading } = useGetRoyaltyAndLicensingSummary(contentId);

  if (isLoading) {
    return null;
  }

  if (!summary?.licensingTerms) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-help">
              <Info className="mr-1 h-3 w-3" />
              Standard License
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Personal use only. Contact creator for commercial licensing.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const { licensingTerms } = summary;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {licensingTerms.commercialUse && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="default" className="cursor-help">
                <DollarSign className="mr-1 h-3 w-3" />
                Commercial Use
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>This content can be used for commercial purposes</p>
            </TooltipContent>
          </Tooltip>
        )}

        {licensingTerms.derivativeWorks !== 'none' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary" className="cursor-help">
                <Shuffle className="mr-1 h-3 w-3" />
                Derivatives {licensingTerms.derivativeWorks === 'withAttribution' ? '(Attribution)' : 'Allowed'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {licensingTerms.derivativeWorks === 'withAttribution'
                  ? 'Derivative works allowed with attribution'
                  : 'Full remix rights granted'}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {licensingTerms.redistributionRights.__kind__ !== 'none' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-help">
                <Shield className="mr-1 h-3 w-3" />
                {licensingTerms.redistributionRights.__kind__ === 'full' ? 'Full Redistribution' : 'Limited Redistribution'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {licensingTerms.redistributionRights.__kind__ === 'full'
                  ? 'Full redistribution rights granted'
                  : 'Limited redistribution with terms'}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {summary.royaltySplits && summary.royaltySplits.length > 1 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-help">
                <Users className="mr-1 h-3 w-3" />
                {summary.royaltySplits.length} Contributors
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Royalties split among {summary.royaltySplits.length} contributors</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
