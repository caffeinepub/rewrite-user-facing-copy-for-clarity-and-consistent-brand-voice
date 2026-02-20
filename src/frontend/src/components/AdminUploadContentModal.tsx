import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadContent, useSubmitLicensingAgreement } from '../hooks/useQueries';
import { ContentCategory, CreativeContent, LicensingAgreement } from '../backend';
import { ExternalBlob } from '../backend';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LicensingConsentModal from './LicensingConsentModal';

interface AdminUploadContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminUploadContentModal({ open, onOpenChange }: AdminUploadContentModalProps) {
  const { identity } = useInternetIdentity();
  const uploadMutation = useUploadContent();
  const submitLicensingMutation = useSubmitLicensingAgreement();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ContentCategory>(ContentCategory.artwork);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLicensingModal, setShowLicensingModal] = useState(false);
  const [uploadedContentId, setUploadedContentId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('You must be logged in to upload content');
      return;
    }

    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!title.trim() || !description.trim() || !preview.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const priceInCents = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInCents) || priceInCents < 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      const fileBytes = new Uint8Array(await file.arrayBuffer());
      const contentBlob = ExternalBlob.fromBytes(fileBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const contentId = `admin-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      const content: CreativeContent = {
        id: contentId,
        title: title.trim(),
        category,
        description: description.trim(),
        preview: preview.trim(),
        price: BigInt(priceInCents),
        creator: identity.getPrincipal(),
        contentBlob,
        timestamp: BigInt(Date.now() * 1000000),
      };

      await uploadMutation.mutateAsync(content);
      
      setUploadedContentId(contentId);
      setShowLicensingModal(true);

      toast.success('Content uploaded successfully! Please configure licensing.');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload content. Please try again.');
    }
  };

  const handleLicensingSubmit = async (agreement: LicensingAgreement) => {
    try {
      await submitLicensingMutation.mutateAsync(agreement);
      setShowLicensingModal(false);
      resetForm();
      onOpenChange(false);
      toast.success('Content uploaded and licensing configured successfully!');
    } catch (error) {
      console.error('Licensing submission error:', error);
      toast.error('Failed to submit licensing agreement. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory(ContentCategory.artwork);
    setDescription('');
    setPreview('');
    setPrice('');
    setFile(null);
    setUploadProgress(0);
    setUploadedContentId(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admin Content Upload</DialogTitle>
            <DialogDescription>
              Upload content directly as an administrator. Licensing configuration will be required after upload.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter content title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as ContentCategory)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContentCategory.artwork}>Artwork</SelectItem>
                  <SelectItem value={ContentCategory.story}>Story</SelectItem>
                  <SelectItem value={ContentCategory.poem}>Poem</SelectItem>
                  <SelectItem value={ContentCategory.lyrics}>Lyrics</SelectItem>
                  <SelectItem value={ContentCategory.quote}>Quote</SelectItem>
                  <SelectItem value={ContentCategory.coloringPage}>Coloring Page</SelectItem>
                  <SelectItem value={ContentCategory.audio}>Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your content"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preview">Preview Text *</Label>
              <Textarea
                id="preview"
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                placeholder="Enter preview text or excerpt"
                rows={3}
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="file">Content File *</Label>
              {!file ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Images, PDFs, audio files, or documents
                      </p>
                    </div>
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Upload className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      disabled={uploadMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="space-y-1">
                      <Progress value={uploadProgress} />
                      <p className="text-xs text-muted-foreground text-center">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                disabled={uploadMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploadMutation.isPending || !file}>
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Content
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {uploadedContentId && identity && (
        <LicensingConsentModal
          open={showLicensingModal}
          onOpenChange={setShowLicensingModal}
          contentId={uploadedContentId}
          creatorPrincipal={identity.getPrincipal()}
          onSubmit={handleLicensingSubmit}
          isSubmitting={submitLicensingMutation.isPending}
        />
      )}
    </>
  );
}
