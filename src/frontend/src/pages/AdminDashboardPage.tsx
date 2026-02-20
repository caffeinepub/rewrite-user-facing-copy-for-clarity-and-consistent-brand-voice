import { useState } from 'react';
import { 
  useIsCallerAdmin, 
  useGetPendingLicensingRequests, 
  useApproveLicensingAgreement, 
  useRejectLicensingAgreement,
  useGetAdminOverviewMetrics,
  useGetAllUserProfiles,
  useGetAllContent,
  useListApprovals,
  useIsStripeConfigured,
  useDeleteContent
} from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Shield, 
  FileText, 
  DollarSign, 
  Info, 
  Users, 
  TrendingUp, 
  Package, 
  Settings,
  Search,
  UserCheck,
  BarChart3,
  Database,
  Activity,
  Upload,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import SEOHead from '../components/SEOHead';
import AdminUploadContentModal from '../components/AdminUploadContentModal';
import { ApprovalStatus } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();
  const { data: pendingRequests = [], isLoading: requestsLoading } = useGetPendingLicensingRequests();
  const { data: overviewMetrics, isLoading: metricsLoading } = useGetAdminOverviewMetrics();
  const { data: allUsers = [], isLoading: usersLoading } = useGetAllUserProfiles();
  const { data: allContent = [], isLoading: contentLoading } = useGetAllContent();
  const { data: userApprovals = [] } = useListApprovals();
  const { data: isStripeConfigured = false } = useIsStripeConfigured();
  
  const approveMutation = useApproveLicensingAgreement();
  const rejectMutation = useRejectLicensingAgreement();
  const deleteMutation = useDeleteContent();

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [contentSearchTerm, setContentSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch additional admin data with optimized caching
  const { data: allColoringPages = [] } = useQuery({
    queryKey: ['allColoringPages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllColoringPages();
    },
    enabled: !!actor && isAdmin === true,
    staleTime: 1000 * 60 * 2,
  });

  const { data: allAffirmations = [] } = useQuery({
    queryKey: ['allAffirmations'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAffirmations();
    },
    enabled: !!actor && isAdmin === true,
    staleTime: 1000 * 60 * 2,
  });

  const { data: allMemes = [] } = useQuery({
    queryKey: ['allMemes'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllMemes();
    },
    enabled: !!actor && isAdmin === true,
    staleTime: 1000 * 60 * 2,
  });

  const { data: allDtfDesigns = [] } = useQuery({
    queryKey: ['allDtfDesigns'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllDtfDesigns();
    },
    enabled: !!actor && isAdmin === true,
    staleTime: 1000 * 60 * 2,
  });

  const { data: allKingsCollab = [] } = useQuery({
    queryKey: ['allKingsCollaboration'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllKingsCollaborationContent();
    },
    enabled: !!actor && isAdmin === true,
    staleTime: 1000 * 60 * 2,
  });

  const handleApprove = async (contentId: string) => {
    try {
      await approveMutation.mutateAsync(contentId);
      toast.success('Licensing agreement approved. Content is now visible in marketplace.');
    } catch (error) {
      console.error('Error approving agreement:', error);
      toast.error('Failed to approve agreement');
    }
  };

  const handleReject = async (contentId: string) => {
    try {
      await rejectMutation.mutateAsync(contentId);
      toast.success('Licensing agreement rejected. Creator will need to resubmit.');
    } catch (error) {
      console.error('Error rejecting agreement:', error);
      toast.error('Failed to reject agreement');
    }
  };

  const handleSetApproval = async (userPrincipal: Principal, status: ApprovalStatus) => {
    try {
      if (!actor) throw new Error('Actor not available');
      await actor.setApproval(userPrincipal, status);
      queryClient.invalidateQueries({ queryKey: ['userApprovals'] });
      toast.success(`User ${status === ApprovalStatus.approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error setting approval:', error);
      toast.error('Failed to update user approval status');
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(contentId);
      toast.success('Content deleted successfully');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  if (adminCheckLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <SEOHead
          title="Access Denied"
          description="Admin access required"
        />
        <div className="container py-12">
          <Alert variant="destructive">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You do not have permission to access the admin dashboard.
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  const filteredUsers = allUsers.filter(([principal, profile]) => {
    const searchLower = userSearchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      principal.toString().toLowerCase().includes(searchLower)
    );
  });

  const filteredContent = allContent.filter(([id, content]) => {
    const matchesSearch = 
      content.title.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(contentSearchTerm.toLowerCase());
    
    if (contentTypeFilter === 'all') return matchesSearch;
    return matchesSearch && content.category.toString() === contentTypeFilter;
  });

  return (
    <>
      <SEOHead
        title="Admin Dashboard - Righteous Truths"
        description="Centralized administrative control for managing users, content, licensing, and platform operations"
      />
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Centralized platform management and oversight</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowUploadModal(true)} className="hidden md:flex">
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content">
              <Package className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="licensing">
              <FileText className="mr-2 h-4 w-4" />
              Licensing
            </TabsTrigger>
            <TabsTrigger value="royalties">
              <DollarSign className="mr-2 h-4 w-4" />
              Royalties
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metricsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : Number(overviewMetrics?.totalUsers || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Registered on platform</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metricsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : Number(overviewMetrics?.activeCreators || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">With uploaded content</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contentLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : allContent.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Creative works uploaded</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {requestsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingRequests.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Licensing requests</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                  <CardDescription>Breakdown by content type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Creative Writing</span>
                    <Badge variant="secondary">{allContent.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Coloring Pages</span>
                    <Badge variant="secondary">{allColoringPages.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memes</span>
                    <Badge variant="secondary">{allMemes.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DTF Prints</span>
                    <Badge variant="secondary">{allDtfDesigns.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kings Collaboration</span>
                    <Badge variant="secondary">{allKingsCollab.length}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Actions</CardTitle>
                  <CardDescription>Quick access to admin tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowUploadModal(true)} 
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Content
                    </Button>
                    <div className="flex items-center gap-3 pt-2">
                      <Activity className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Platform Status</p>
                        <p className="text-xs text-muted-foreground">All systems operational</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Storage Usage</p>
                        <p className="text-xs text-muted-foreground">Monitoring active</p>
                      </div>
                      <Badge variant="outline">Healthy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, approvals, and role assignments
                </CardDescription>
                <div className="flex items-center gap-2 pt-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or principal..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="py-8 text-center">
                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Principal ID</TableHead>
                          <TableHead>Bio</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map(([principal, profile]) => {
                          const approval = userApprovals.find(a => a.principal.toString() === principal.toString());
                          return (
                            <TableRow key={principal.toString()}>
                              <TableCell className="font-medium">{profile.name}</TableCell>
                              <TableCell className="font-mono text-xs">{principal.toString().slice(0, 12)}...</TableCell>
                              <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                {profile.bio || 'No bio'}
                              </TableCell>
                              <TableCell>
                                {approval ? (
                                  <Badge variant={
                                    approval.status === ApprovalStatus.approved ? 'default' :
                                    approval.status === ApprovalStatus.rejected ? 'destructive' : 'secondary'
                                  }>
                                    {approval.status}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Unknown</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSetApproval(principal, ApprovalStatus.approved)}
                                  >
                                    <UserCheck className="mr-1 h-3 w-3" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigate({ to: `/creator/${principal.toString()}` })}
                                  >
                                    View Profile
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Search, filter, and manage all platform content
                </CardDescription>
                <div className="flex flex-col gap-2 pt-4 sm:flex-row">
                  <div className="flex flex-1 items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search content by title or description..."
                      value={contentSearchTerm}
                      onChange={(e) => setContentSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="story">Stories</SelectItem>
                      <SelectItem value="poem">Poems</SelectItem>
                      <SelectItem value="lyrics">Lyrics</SelectItem>
                      <SelectItem value="artwork">Artwork</SelectItem>
                      <SelectItem value="coloringPage">Coloring Pages</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setShowUploadModal(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {contentLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredContent.length === 0 ? (
                  <div className="py-8 text-center">
                    <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No content found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Creator</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContent.slice(0, 50).map(([id, content]) => {
                          const createdDate = new Date(Number(content.timestamp) / 1000000);
                          return (
                            <TableRow key={id}>
                              <TableCell className="font-medium">{content.title}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{content.category}</Badge>
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {content.creator.toString().slice(0, 12)}...
                              </TableCell>
                              <TableCell>${Number(content.price) / 100}</TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {createdDate.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigate({ to: `/content/${id}` })}
                                  >
                                    <Edit className="mr-1 h-3 w-3" />
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteContent(id)}
                                    disabled={deleteMutation.isPending}
                                  >
                                    <Trash2 className="mr-1 h-3 w-3" />
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licensing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Licensing Agreements</CardTitle>
                <CardDescription>
                  Review and approve licensing agreements submitted by creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="py-8 text-center">
                    <Info className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No pending licensing requests</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content ID</TableHead>
                          <TableHead>Creator</TableHead>
                          <TableHead>Commercial Use</TableHead>
                          <TableHead>Derivatives</TableHead>
                          <TableHead>Royalty Splits</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingRequests.map(([contentId, agreement]) => {
                          const submittedDate = new Date(Number(agreement.agreementTimestamp) / 1000000);
                          return (
                            <TableRow key={contentId}>
                              <TableCell className="font-mono text-xs">{contentId.slice(0, 12)}...</TableCell>
                              <TableCell className="font-mono text-xs">{agreement.creator.toString().slice(0, 12)}...</TableCell>
                              <TableCell>
                                <Badge variant={agreement.commercialUse ? 'default' : 'secondary'}>
                                  {agreement.commercialUse ? 'Allowed' : 'Not Allowed'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{agreement.derivativeWorks}</Badge>
                              </TableCell>
                              <TableCell>
                                {agreement.royaltySplit.length} split(s)
                                {agreement.royaltySplit.length > 1 && (
                                  <span className="text-xs text-muted-foreground ml-1">(collaborative)</span>
                                )}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {submittedDate.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleApprove(contentId)}
                                    disabled={approveMutation.isPending || rejectMutation.isPending}
                                  >
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(contentId)}
                                    disabled={approveMutation.isPending || rejectMutation.isPending}
                                  >
                                    <XCircle className="mr-1 h-3 w-3" />
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="royalties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Royalty & Licensing Summary</CardTitle>
                <CardDescription>
                  Active agreements, automation logs, and royalty splits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Royalty Automation</p>
                        <p className="text-sm text-muted-foreground">
                          Automatic distribution on each purchase
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Active Licensing Agreements</p>
                        <p className="text-sm text-muted-foreground">
                          {allContent.length} content items with licensing
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{allContent.length}</Badge>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Royalty tracking is automated. Each purchase automatically distributes royalties according to 
                      approved licensing agreements. Detailed reporting features coming soon.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health & Configuration</CardTitle>
                <CardDescription>
                  Monitor platform status and configuration settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Stripe Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Payment processing status
                      </p>
                    </div>
                  </div>
                  <Badge variant={isStripeConfigured ? 'default' : 'destructive'}>
                    {isStripeConfigured ? 'Configured' : 'Not Configured'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Storage Usage</p>
                      <p className="text-sm text-muted-foreground">
                        Content and user data storage
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Monitoring Active</Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">SEO Health</p>
                      <p className="text-sm text-muted-foreground">
                        Search engine optimization status
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">Optimized</Badge>
                </div>

                <div className="mt-6 rounded-lg bg-muted p-6">
                  <h3 className="mb-4 font-semibold">Quick Actions</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button variant="outline" onClick={() => navigate({ to: '/production-checklist' })}>
                      View Production Checklist
                    </Button>
                    <Button variant="outline" onClick={() => navigate({ to: '/legal/terms' })}>
                      Manage Legal Policies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AdminUploadContentModal open={showUploadModal} onOpenChange={setShowUploadModal} />
    </>
  );
}
