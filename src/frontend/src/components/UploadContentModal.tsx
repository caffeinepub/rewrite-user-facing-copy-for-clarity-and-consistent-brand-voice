import { useState } from 'react';
import { useUploadContent, useSubmitLicensingAgreement } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';
import { ContentCategory } from '../backend';
import { ExternalBlob } from '../backend';
import LicensingConsentModal from './LicensingConsentModal';
import type { LicensingAgreement } from '../backend';
import AnimatedButton from './AnimatedButton';

export default function UploadContentModal() {
  const [open, setOpen] = useState(false);
  const [licensingModalOpen, setLicensingModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ContentCategory | ''>('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pendingContentId, setPendingContentId] = useState<string | null>(null);
  
  const uploadContent = useUploadContent();
  const submitLicensing = useSubmitLicensingAgreement();
  const { identity } = useInternetIdentity();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category || !description.trim() || !preview.trim() || !price || !file || !identity) {
      toast.error('Please fill in all required fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      const fileBytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(fileBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const contentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      await uploadContent.mutateAsync({
        id: contentId,
        title: title.trim(),
        category: category as ContentCategory,
        description: description.trim(),
        preview: preview.trim(),
        price: BigInt(Math.round(priceNum * 100)),
        creator: identity.getPrincipal(),
        contentBlob: blob,
        timestamp: BigInt(Date.now() * 1000000),
      });

      setPendingContentId(contentId);
      setOpen(false);
      setLicensingModalOpen(true);
    } catch (error) {
      console.error('Error uploading content:', error);
      toast.error('Failed to upload content. Please try again.');
    }
  };

  const handleLicensingSubmit = async (agreement: LicensingAgreement) => {
    try {
      await submitLicensing.mutateAsync(agreement);
      toast.success('Content uploaded and licensing agreement submitted!');
      setLicensingModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error submitting licensing:', error);
      toast.error('Failed to submit licensing agreement');
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setPreview('');
    setPrice('');
    setFile(null);
    setUploadProgress(0);
    setPendingContentId(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <AnimatedButton tooltip="Upload Content" animationType="glow">
            <Upload className="mr-2 h-4 w-4" />
            Upload Content
          </AnimatedButton>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Creative Content</DialogTitle>
            <DialogDescription>
              Share your creative work with the community. You'll configure licensing terms after upload.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={uploadContent.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as ContentCategory)} disabled={uploadContent.isPending}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContentCategory.story}>Story</SelectItem>
                  <SelectItem value={ContentCategory.poem}>Poem</SelectItem>
                  <SelectItem value={ContentCategory.lyrics}>Lyrics</SelectItem>
                  <SelectItem value={ContentCategory.quote}>Quote</SelectItem>
                  <SelectItem value={ContentCategory.artwork}>Artwork</SelectItem>
                  <SelectItem value={ContentCategory.coloringPage}>Coloring Page</SelectItem>
                  <SelectItem value={ContentCategory.audio}>Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploadContent.isPending}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preview">Preview Text *</Label>
              <Textarea
                id="preview"
                placeholder="Enter a preview or excerpt..."
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                disabled={uploadContent.isPending}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="9.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={uploadContent.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Content File *</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                disabled={uploadContent.isPending}
                accept=".txt,.pdf,.jpg,.jpeg,.png,.mp3,.wav"
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: Text, PDF, Images (JPG, PNG), Audio (MP3, WAV)
              </p>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}

            <AnimatedButton 
              type="submit" 
              className="w-full" 
              disabled={uploadContent.isPending}
              tooltip="Continue to Licensing"
              animationType="glow"
            >
              {uploadContent.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue to Licensing
            </AnimatedButton>
          </form>
        </DialogContent>
      </Dialog>

      {pendingContentId && identity && (
        <LicensingConsentModal
          open={licensingModalOpen}
          onOpenChange={setLicensingModalOpen}
          contentId={pendingContentId}
          creatorPrincipal={identity.getPrincipal()}
          onSubmit={handleLicensingSubmit}
          isSubmitting={submitLicensing.isPending}
        />
      )}
    </>
  );
}
