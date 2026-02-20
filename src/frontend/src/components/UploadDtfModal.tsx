import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useUploadDtfDesign } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { DtfContentType, DtfDesignInput } from '../backend';
import { ExternalBlob } from '../backend';
import AnimatedButton from './AnimatedButton';

export default function UploadDtfModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [price, setPrice] = useState('');
  const [contentType, setContentType] = useState<DtfContentType>(DtfContentType.freeDownload);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { identity } = useInternetIdentity();
  const uploadMutation = useUploadDtfDesign();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file (PNG or JPG)');
        return;
      }
      setPreviewFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('Please login to upload DTF designs');
      return;
    }

    if (!title.trim() || !artist.trim() || !previewFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (contentType === DtfContentType.purchase && (!price || Number(price) <= 0)) {
      toast.error('Please enter a valid price for purchase items');
      return;
    }

    if (contentType === DtfContentType.externalRedirect && !externalLink.trim()) {
      toast.error('Please provide an external link');
      return;
    }

    try {
      const bytes = new Uint8Array(await previewFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const input: DtfDesignInput = {
        title: title.trim(),
        artist: artist.trim(),
        tags,
        externalLink: externalLink.trim() || undefined,
        price: contentType === DtfContentType.purchase ? BigInt(Math.round(Number(price) * 100)) : undefined,
        contentType,
        previewThumbnail: blob,
        creator: identity.getPrincipal(),
      };

      await uploadMutation.mutateAsync(input);
      toast.success('DTF design uploaded successfully!');
      
      // Reset form
      setTitle('');
      setArtist('');
      setTags([]);
      setTagInput('');
      setExternalLink('');
      setPrice('');
      setContentType(DtfContentType.freeDownload);
      setPreviewFile(null);
      setUploadProgress(0);
      setOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload DTF design');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AnimatedButton tooltip="Upload DTF Design" animationType="glow">
          <Upload className="mr-2 h-4 w-4" />
          Upload DTF Design
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload DTF Design</DialogTitle>
          <DialogDescription>
            Share your direct-to-film artwork with the community
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter design title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artist">Artist Name *</Label>
            <Input
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Enter artist name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type *</Label>
            <Select
              value={contentType}
              onValueChange={(value) => setContentType(value as DtfContentType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DtfContentType.freeDownload}>Free Download</SelectItem>
                <SelectItem value={DtfContentType.purchase}>Purchase</SelectItem>
                <SelectItem value={DtfContentType.externalRedirect}>External Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contentType === DtfContentType.purchase && (
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          )}

          {contentType === DtfContentType.externalRedirect && (
            <div className="space-y-2">
              <Label htmlFor="externalLink">External Link *</Label>
              <Input
                id="externalLink"
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tags (press Enter)"
              />
              <AnimatedButton type="button" size="icon" onClick={handleAddTag} tooltip="Add Tag" animationType="scale">
                <Plus className="h-4 w-4" />
              </AnimatedButton>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preview">Preview Image (PNG/JPG) *</Label>
            <Input
              id="preview"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              required
            />
            {previewFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {previewFile.name}
              </p>
            )}
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <AnimatedButton type="button" variant="outline" onClick={() => setOpen(false)} animationType="scale">
              Cancel
            </AnimatedButton>
            <AnimatedButton type="submit" disabled={uploadMutation.isPending} tooltip="Upload Design" animationType="glow">
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </AnimatedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
