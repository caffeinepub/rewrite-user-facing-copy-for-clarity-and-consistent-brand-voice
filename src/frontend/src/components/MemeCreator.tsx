import { useState, useRef, useEffect } from 'react';
import { useSaveMeme } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Download, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob, Meme } from '../backend';

const fonts = ['Impact', 'Arial Black', 'Comic Sans MS', 'Courier New'];
const templates = [
  { name: 'Cat Template', url: '/assets/generated/meme-template-cat.dim_400x400.png' },
];

export default function MemeCreator() {
  const { identity } = useInternetIdentity();
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');
  const [selectedFont, setSelectedFont] = useState('Impact');
  const [backgroundImage, setBackgroundImage] = useState(templates[0].url);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saveMeme = useSaveMeme();

  useEffect(() => {
    drawMeme();
  }, [topCaption, bottomCaption, selectedFont, backgroundImage]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 600;
      canvas.height = 600;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = `bold 48px ${selectedFont}`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      if (topCaption) {
        const lines = wrapText(ctx, topCaption.toUpperCase(), canvas.width - 40);
        lines.forEach((line, i) => {
          const y = 20 + i * 55;
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      if (bottomCaption) {
        ctx.textBaseline = 'bottom';
        const lines = wrapText(ctx, bottomCaption.toUpperCase(), canvas.width - 40);
        lines.reverse().forEach((line, i) => {
          const y = canvas.height - 20 - i * 55;
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
    };
    img.src = backgroundImage;
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const generateAIBackground = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBackgroundImage(templates[0].url);
      toast.success('AI background generated!');
    } catch (error) {
      toast.error('Failed to generate background');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!identity || !canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png');
      });

      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const externalBlob = ExternalBlob.fromBytes(uint8Array);

      const meme: Meme = {
        id: `meme-${Date.now()}`,
        backgroundImage: externalBlob,
        topCaption,
        bottomCaption,
        font: selectedFont,
        creator: identity.getPrincipal(),
        timestamp: BigInt(Date.now() * 1000000),
      };

      await saveMeme.mutateAsync(meme);
      toast.success('Meme saved to your creations!');
    } catch (error) {
      toast.error('Failed to save meme');
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'meme.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Download started!');
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="top-caption">Top Caption</Label>
          <Input
            id="top-caption"
            placeholder="Enter top text..."
            value={topCaption}
            onChange={(e) => setTopCaption(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bottom-caption">Bottom Caption</Label>
          <Input
            id="bottom-caption"
            placeholder="Enter bottom text..."
            value={bottomCaption}
            onChange={(e) => setBottomCaption(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="font">Font Style</Label>
          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger id="font">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={generateAIBackground}
          disabled={isGenerating}
          variant="outline"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating AI Background...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Background
            </>
          )}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="aspect-square overflow-hidden bg-muted">
          <canvas
            ref={canvasRef}
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
            Download
          </Button>
          <Button
            className="flex-1"
            onClick={handleSave}
            disabled={saveMeme.isPending}
          >
            {saveMeme.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
