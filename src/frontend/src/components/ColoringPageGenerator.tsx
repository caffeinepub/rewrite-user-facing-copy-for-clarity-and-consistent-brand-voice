import { useState } from 'react';
import { useSaveColoringPage } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Download, Save } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob, ColoringPage } from '../backend';

const themes = ['animals', 'nature', 'patterns', 'fantasy', 'vehicles'];
const difficulties = ['kids', 'teens', 'adults'];

export default function ColoringPageGenerator() {
  const { identity } = useInternetIdentity();
  const [theme, setTheme] = useState('animals');
  const [difficulty, setDifficulty] = useState('kids');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const saveColoringPage = useSaveColoringPage();

  const generateColoringPage = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation with a sample image
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedImage('/assets/generated/coloring-sample-butterfly.dim_300x300.png');
      toast.success('Coloring page generated!');
    } catch (error) {
      toast.error('Failed to generate coloring page');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedImage || !identity) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const externalBlob = ExternalBlob.fromBytes(uint8Array);

      const page: ColoringPage = {
        id: `coloring-${Date.now()}`,
        theme,
        difficulty,
        image: externalBlob,
        creator: identity.getPrincipal(),
        timestamp: BigInt(Date.now() * 1000000),
      };

      await saveColoringPage.mutateAsync(page);
      toast.success('Coloring page saved to your creations!');
    } catch (error) {
      toast.error('Failed to save coloring page');
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `coloring-${theme}-${difficulty}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((t) => (
                <SelectItem key={t} value={t} className="capitalize">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger id="difficulty">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((d) => (
                <SelectItem key={d} value={d} className="capitalize">
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={generateColoringPage}
        disabled={isGenerating}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Coloring Page'
        )}
      </Button>

      {generatedImage && (
        <Card className="overflow-hidden">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={generatedImage}
              alt="Generated coloring page"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex gap-2 p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={saveColoringPage.isPending}
            >
              {saveColoringPage.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
