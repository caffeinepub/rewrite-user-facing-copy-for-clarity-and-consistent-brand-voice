import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Plus, X } from 'lucide-react';
import { LicensingAgreement, RoyaltySplit, Variant_withAttribution_none_fullRemixRights } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

interface LicensingConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
  creatorPrincipal: Principal;
  onSubmit: (agreement: LicensingAgreement) => void;
  isSubmitting?: boolean;
  collaborators?: Principal[];
}

export default function LicensingConsentModal({
  open,
  onOpenChange,
  contentId,
  creatorPrincipal,
  onSubmit,
  isSubmitting = false,
  collaborators = [],
}: LicensingConsentModalProps) {
  const [ownershipConfirmed, setOwnershipConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [redistributionRights, setRedistributionRights] = useState<'none' | 'limited' | 'full'>('none');
  const [usageTerms, setUsageTerms] = useState('');
  const [commercialUse, setCommercialUse] = useState(false);
  const [derivativeWorks, setDerivativeWorks] = useState<Variant_withAttribution_none_fullRemixRights>(
    Variant_withAttribution_none_fullRemixRights.none
  );
  const [royaltySplits, setRoyaltySplits] = useState<RoyaltySplit[]>([
    { creator: creatorPrincipal, percentage: BigInt(10000) }
  ]);
  const [newCollaboratorPrincipal, setNewCollaboratorPrincipal] = useState('');
  const [newCollaboratorPercentage, setNewCollaboratorPercentage] = useState('');

  const handleAddRoyaltySplit = () => {
    if (!newCollaboratorPrincipal.trim() || !newCollaboratorPercentage) return;

    try {
      const principal = Principal.fromText(newCollaboratorPrincipal.trim());
      const percentage = parseInt(newCollaboratorPercentage);

      if (percentage <= 0 || percentage > 10000) {
        alert('Percentage must be between 0 and 100%');
        return;
      }

      setRoyaltySplits([...royaltySplits, { creator: principal, percentage: BigInt(percentage) }]);
      setNewCollaboratorPrincipal('');
      setNewCollaboratorPercentage('');
    } catch (error) {
      alert('Invalid principal ID');
    }
  };

  const handleRemoveRoyaltySplit = (index: number) => {
    if (index === 0) return; // Cannot remove primary creator
    setRoyaltySplits(royaltySplits.filter((_, i) => i !== index));
  };

  const totalPercentage = royaltySplits.reduce((sum, split) => sum + Number(split.percentage), 0);

  const handleSubmit = () => {
    if (!ownershipConfirmed || !termsAccepted) {
      alert('Please confirm ownership and accept terms');
      return;
    }

    if (totalPercentage !== 10000) {
      alert('Total royalty percentage must equal 100%');
      return;
    }

    if (redistributionRights === 'limited' && !usageTerms.trim()) {
      alert('Please specify usage terms for limited redistribution');
      return;
    }

    const agreement: LicensingAgreement = {
      contentId,
      creator: creatorPrincipal,
      redistributionRights:
        redistributionRights === 'none'
          ? { __kind__: 'none', none: null }
          : redistributionRights === 'full'
          ? { __kind__: 'full', full: null }
          : { __kind__: 'limited', limited: { usageTerms: usageTerms.trim() } },
      commercialUse,
      derivativeWorks,
      royaltySplit: royaltySplits,
      licensingTermsAccepted: true,
      agreementTimestamp: BigInt(Date.now() * 1000000),
    };

    onSubmit(agreement);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Licensing Agreement & Royalty Configuration</DialogTitle>
          <DialogDescription>
            Configure licensing terms and royalty splits for your content
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              By submitting this agreement, you confirm that you own the rights to this content and agree to the platform's terms.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold">Rights Ownership</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ownership"
                checked={ownershipConfirmed}
                onCheckedChange={(checked) => setOwnershipConfirmed(checked as boolean)}
              />
              <Label htmlFor="ownership" className="text-sm font-normal">
                I confirm that I own all rights to this content or have permission to license it
              </Label>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Redistribution Rights</h3>
            <RadioGroup value={redistributionRights} onValueChange={(value) => setRedistributionRights(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="redist-none" />
                <Label htmlFor="redist-none">No redistribution allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited" id="redist-limited" />
                <Label htmlFor="redist-limited">Limited redistribution (specify terms)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="redist-full" />
                <Label htmlFor="redist-full">Full redistribution rights</Label>
              </div>
            </RadioGroup>

            {redistributionRights === 'limited' && (
              <Textarea
                placeholder="Specify usage terms and conditions..."
                value={usageTerms}
                onChange={(e) => setUsageTerms(e.target.value)}
                rows={3}
              />
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Commercial Use</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commercial"
                checked={commercialUse}
                onCheckedChange={(checked) => setCommercialUse(checked as boolean)}
              />
              <Label htmlFor="commercial" className="text-sm font-normal">
                Allow commercial use of this content
              </Label>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Derivative Works</h3>
            <RadioGroup
              value={derivativeWorks}
              onValueChange={(value) => setDerivativeWorks(value as Variant_withAttribution_none_fullRemixRights)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Variant_withAttribution_none_fullRemixRights.none} id="deriv-none" />
                <Label htmlFor="deriv-none">No derivatives allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Variant_withAttribution_none_fullRemixRights.withAttribution} id="deriv-attr" />
                <Label htmlFor="deriv-attr">Derivatives allowed with attribution</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Variant_withAttribution_none_fullRemixRights.fullRemixRights} id="deriv-full" />
                <Label htmlFor="deriv-full">Full remix rights</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Royalty Splits</h3>
            <p className="text-sm text-muted-foreground">
              Configure how royalties are distributed. Total must equal 100%.
            </p>

            <div className="space-y-2">
              {royaltySplits.map((split, index) => (
                <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                  <div className="flex-1 truncate text-sm">
                    {split.creator.toString()}
                  </div>
                  <div className="text-sm font-medium">
                    {(Number(split.percentage) / 100).toFixed(2)}%
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRoyaltySplit(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Principal ID"
                value={newCollaboratorPrincipal}
                onChange={(e) => setNewCollaboratorPrincipal(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="% (0-100)"
                value={newCollaboratorPercentage}
                onChange={(e) => setNewCollaboratorPercentage(e.target.value)}
                className="w-32"
              />
              <Button type="button" size="icon" onClick={handleAddRoyaltySplit}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm">
              Total: <span className={totalPercentage === 10000 ? 'text-green-600' : 'text-destructive'}>
                {(totalPercentage / 100).toFixed(2)}%
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I accept the licensing terms and conditions
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !ownershipConfirmed || !termsAccepted}>
            {isSubmitting ? 'Submitting...' : 'Submit Agreement'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
