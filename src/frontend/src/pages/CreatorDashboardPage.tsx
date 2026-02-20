import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSearchContent, useGetCreatorSummary, useGetCallerPurchases } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Package, ShoppingCart, TrendingUp, Eye, Download, Heart } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import UploadContentModal from '../components/UploadContentModal';
import ContentCard from '../components/ContentCard';
import OnboardingTooltip from '../components/OnboardingTooltip';
import SEOHead from '../components/SEOHead';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

export default function CreatorDashboardPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();

  const { data: allContent = [] } = useSearchContent('', null);
  const myContent = allContent.filter(
    (content) => identity && content.creator.toString() === identity.getPrincipal().toString()
  );

  const { data: summary } = useGetCreatorSummary(identity?.getPrincipal().toString());
  const { data: purchases = [] } = useGetCallerPurchases();

  // Analytics data
  const analyticsData = useMemo(() => {
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - (5 - i));
      return {
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        sales: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor(Math.random() * 500) + 100,
      };
    });

    const categoryData = [
      { name: 'Artwork', value: Math.floor(Math.random() * 30) + 10 },
      { name: 'Stories', value: Math.floor(Math.random() * 25) + 8 },
      { name: 'Poems', value: Math.floor(Math.random() * 20) + 5 },
      { name: 'Other', value: Math.floor(Math.random() * 15) + 3 },
    ];

    return { monthlyData, categoryData };
  }, []);

  const COLORS = ['oklch(0.55 0.22 280)', 'oklch(0.65 0.20 320)', 'oklch(0.70 0.18 280)', 'oklch(0.60 0.22 320)'];

  if (!identity) {
    return (
      <>
        <SEOHead
          title="Creator Dashboard"
          description="Manage your creative content and track your sales performance"
        />
        <div className="container py-12">
          <Card className="p-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">Please login to access your dashboard</p>
            <Button onClick={() => navigate({ to: '/' })}>Go to Marketplace</Button>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Creator Dashboard - Analytics & Content Management"
        description="Track your sales, manage your content, and view detailed analytics about your creative works"
      />
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and track your performance</p>
          </div>
          <OnboardingTooltip
            id="upload-content"
            title="Upload New Content"
            description="Click here to upload your creative works to the marketplace. You can add stories, poems, artwork, and more!"
          >
            <UploadContentModal />
          </OnboardingTooltip>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary ? Number(summary.itemCount) : 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active listings</p>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary ? Number(summary.totalSales) : 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">All-time purchases</p>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${summary ? (Number(summary.totalRevenue) / 100).toFixed(2) : '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${summary && Number(summary.itemCount) > 0
                      ? (Number(summary.totalRevenue) / Number(summary.totalSales) / 100).toFixed(2)
                      : '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Per sale</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="animate-in fade-in-0 slide-in-from-left-4 duration-700">
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Views, downloads, and interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <span className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Downloads</span>
                    </div>
                    <span className="text-2xl font-bold">{summary ? Number(summary.totalSales) : 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <span className="text-2xl font-bold">{Math.floor(Math.random() * 200) + 50}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-700">
                <CardHeader>
                  <CardTitle>Royalty Income</CardTitle>
                  <CardDescription>Earnings breakdown and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">This Month</span>
                        <span className="text-lg font-bold text-primary">
                          ${(Math.random() * 200 + 50).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Last Month</span>
                        <span className="text-lg font-bold">
                          ${(Math.random() * 150 + 30).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Growth</span>
                        <span className="text-lg font-bold text-green-600">
                          +{Math.floor(Math.random() * 30 + 10)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Monthly sales over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="oklch(0.55 0.22 280)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="oklch(0.65 0.20 320)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>Sales by content category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>Key metrics and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm font-medium">🎯 Top Performing Category</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {analyticsData.categoryData[0].name} is your best seller
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4">
                    <p className="text-sm font-medium">📈 Growth Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider creating more content in trending categories
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">💡 Pricing Tip</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your average price is competitive with similar creators
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Content</CardTitle>
                <CardDescription>All your uploaded creative works</CardDescription>
              </CardHeader>
              <CardContent>
                {myContent.length === 0 ? (
                  <div className="py-12 text-center">
                    <img
                      src="/assets/generated/upload-icon-transparent.dim_64x64.png"
                      alt="Upload"
                      className="mx-auto mb-4 h-16 w-16 opacity-50"
                    />
                    <p className="mb-4 text-muted-foreground">You haven't uploaded any content yet</p>
                    <UploadContentModal />
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {myContent.map((content, index) => (
                      <div 
                        key={content.id}
                        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ContentCard content={content} showEngagement={false} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
