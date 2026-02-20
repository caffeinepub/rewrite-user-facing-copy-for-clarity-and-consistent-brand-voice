import { useState } from 'react';
import { useSaveAffirmation } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save, Sparkles, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { Affirmation } from '../backend';

const moods = ['happy', 'relaxed', 'motivated', 'empowered', 'confident'];

const affirmationTemplates: Record<string, string[]> = {
  happy: [
    'I choose joy and happiness in every moment.',
    'My life is filled with abundance and positivity.',
    'I radiate happiness and attract wonderful experiences.',
  ],
  relaxed: [
    'I am calm, peaceful, and centered in this moment.',
    'I release all tension and embrace tranquility.',
    'Peace flows through me with every breath I take.',
  ],
  motivated: [
    'I am capable of achieving anything I set my mind to.',
    'Every day I move closer to my goals with determination.',
    'I have the power to create the life I desire.',
  ],
  empowered: [
    'I am strong, capable, and in control of my destiny.',
    'My voice matters and I use it to create positive change.',
    'I embrace my power and use it wisely.',
  ],
  confident: [
    'I believe in myself and my abilities completely.',
    'I am worthy of success and all good things.',
    'My confidence grows stronger with each passing day.',
  ],
};

export default function AffirmationCreator() {
  const { identity } = useInternetIdentity();
  const [mood, setMood] = useState('happy');
  const [customInput, setCustomInput] = useState('');
  const [generatedAffirmation, setGeneratedAffirmation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const saveAffirmation = useSaveAffirmation();

  const generateDailyAffirmation = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const templates = affirmationTemplates[mood];
      const randomAffirmation = templates[Math.floor(Math.random() * templates.length)];
      setGeneratedAffirmation(randomAffirmation);
      toast.success('Affirmation generated!');
    } catch (error) {
      toast.error('Failed to generate affirmation');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCustomAffirmation = async () => {
    if (!customInput.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedAffirmation(`I am ${customInput.trim()} and I embrace this truth fully.`);
      toast.success('Custom affirmation created!');
    } catch (error) {
      toast.error('Failed to create affirmation');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedAffirmation || !identity) return;

    try {
      const affirmation: Affirmation = {
        id: `affirmation-${Date.now()}`,
        mood,
        text: generatedAffirmation,
        creator: identity.getPrincipal(),
        timestamp: BigInt(Date.now() * 1000000),
      };

      await saveAffirmation.mutateAsync(affirmation);
      toast.success('Affirmation saved to your creations!');
    } catch (error) {
      toast.error('Failed to save affirmation');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mood">Select Your Mood</Label>
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger id="mood">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {moods.map((m) => (
              <SelectItem key={m} value={m} className="capitalize">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          onClick={generateDailyAffirmation}
          disabled={isGenerating}
          variant="outline"
          className="w-full"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Shuffle className="mr-2 h-4 w-4" />
          )}
          Daily Random
        </Button>
        <Button
          onClick={generateCustomAffirmation}
          disabled={isGenerating || !customInput.trim()}
          variant="outline"
          className="w-full"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Custom
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom">Custom Input (Optional)</Label>
        <Textarea
          id="custom"
          placeholder="Enter a word or phrase to personalize your affirmation..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          rows={3}
        />
      </div>

      {generatedAffirmation && (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-lg font-medium italic leading-relaxed">
                "{generatedAffirmation}"
              </p>
            </div>
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={saveAffirmation.isPending}
            >
              {saveAffirmation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Affirmation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
