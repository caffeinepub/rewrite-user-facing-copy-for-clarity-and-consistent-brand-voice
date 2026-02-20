import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerCreativeStudioContent } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Download, Plus, Trash2, MoveUp, MoveDown, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

type LineThickness = 'kids' | 'teens' | 'adults';

interface SelectedPage {
  id: string;
  imageUrl: string;
  theme: string;
}

export default function ColoringBookBuilderPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: creativeContent, isLoading } = useGetCallerCreativeStudioContent();
  const [selectedPages, setSelectedPages] = useState<SelectedPage[]>([]);
  const [bookTitle, setBookTitle] = useState('My Custom Coloring Book');
  const [lineThickness, setLineThickness] = useState<LineThickness>('kids');

  const isAuthenticated = !!identity;

  const handleAddPage = (page: { id: string; imageUrl: string; theme: string }) => {
    if (selectedPages.find(p => p.id === page.id)) {
      toast.error('This page is already in your book');
      return;
    }
    setSelectedPages([...selectedPages, page]);
    toast.success('Page added to book');
  };

  const handleRemovePage = (pageId: string) => {
    setSelectedPages(selectedPages.filter(p => p.id !== pageId));
    toast.success('Page removed from book');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...selectedPages];
    [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
    setSelectedPages(newPages);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedPages.length - 1) return;
    const newPages = [...selectedPages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    setSelectedPages(newPages);
  };

  const handleExportPDF = () => {
    if (selectedPages.length === 0) {
      toast.error('Please add at least one page to your book');
      return;
    }
    toast.success('PDF export feature coming soon!');
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-16 text-center">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please log in to access the Coloring Book Builder and create custom coloring books.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate({ to: '/' })}>
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
          <BookOpen className="h-10 w-10 text-primary" />
          Coloring Book Builder
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select multiple coloring pages, arrange their order, and export as a printable PDF with customizable line thickness
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Coloring Pages</CardTitle>
              <CardDescription>Select pages from your created coloring pages</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground py-8">Loading your coloring pages...</p>
              ) : creativeContent?.coloringPages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any coloring pages yet.</p>
                  <Button onClick={() => navigate({ to: '/creative-studio' })}>
                    Create Coloring Pages
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {creativeContent?.coloringPages.map((page) => (
                    <Card key={page.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={page.image.getDirectURL()}
                          alt={page.theme}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardFooter className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{page.theme}</p>
                          <Badge variant="outline" className="text-xs">{page.difficulty}</Badge>
                        </div>
                        <Button size="sm" onClick={() => handleAddPage({ id: page.id, imageUrl: page.image.getDirectURL(), theme: page.theme })}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Your Book</CardTitle>
              <CardDescription>{selectedPages.length} pages selected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book-title">Book Title</Label>
                <Input
                  id="book-title"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter book title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="line-thickness">Line Thickness</Label>
                <Select value={lineThickness} onValueChange={(value) => setLineThickness(value as LineThickness)}>
                  <SelectTrigger id="line-thickness">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kids">Kids (Simple)</SelectItem>
                    <SelectItem value="teens">Teens (Moderate)</SelectItem>
                    <SelectItem value="adults">Adults (Complex)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Selected Pages</Label>
                {selectedPages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No pages selected yet</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedPages.map((page, index) => (
                      <div key={page.id} className="flex items-center gap-2 rounded-md border p-2">
                        <span className="text-sm font-medium">{index + 1}.</span>
                        <span className="flex-1 text-sm truncate">{page.theme}</span>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                            <MoveUp className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveDown(index)} disabled={index === selectedPages.length - 1}>
                            <MoveDown className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleRemovePage(page.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full" onClick={handleExportPDF} disabled={selectedPages.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
