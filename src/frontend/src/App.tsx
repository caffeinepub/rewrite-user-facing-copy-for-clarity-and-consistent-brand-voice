import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ColoringBookBuilderPage from './pages/ColoringBookBuilderPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import MarketplacePage from './pages/MarketplacePage';
import CreatorDashboardPage from './pages/CreatorDashboardPage';
import MyPurchasesPage from './pages/MyPurchasesPage';
import ContentDetailPage from './pages/ContentDetailPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import CreativeStudioPage from './pages/CreativeStudioPage';
import MyCreationsPage from './pages/MyCreationsPage';
import DtfGalleryPage from './pages/DtfGalleryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LegalTermsPage from './pages/LegalTermsPage';
import LegalPrivacyPage from './pages/LegalPrivacyPage';
import LegalRefundPage from './pages/LegalRefundPage';
import LegalCopyrightPage from './pages/LegalCopyrightPage';
import ProductionChecklistPage from './pages/ProductionChecklistPage';
import StripeSetupModal from './components/StripeSetupModal';

function Layout() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {showProfileSetup ? (
          <ProfileSetupModal open={showProfileSetup} />
        ) : (
          <div className="outlet-container">
            <div id="router-outlet" />
          </div>
        )}
      </main>
      <Footer />
      <StripeSetupModal />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/store',
  component: StorePage,
});

const coloringBookBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/coloring-book-builder',
  component: ColoringBookBuilderPage,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: CommunityPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: MarketplacePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: CreatorDashboardPage,
});

const purchasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/purchases',
  component: MyPurchasesPage,
});

const contentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/content/$contentId',
  component: ContentDetailPage,
});

const creatorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator/$creatorId',
  component: CreatorProfilePage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const creativeStudioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creative-studio',
  component: CreativeStudioPage,
});

const myCreationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-creations',
  component: MyCreationsPage,
});

const dtfGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dtf-gallery',
  component: DtfGalleryPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const productionChecklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/production-checklist',
  component: ProductionChecklistPage,
});

const legalTermsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/terms',
  component: LegalTermsPage,
});

const legalPrivacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/privacy',
  component: LegalPrivacyPage,
});

const legalRefundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/refund',
  component: LegalRefundPage,
});

const legalCopyrightRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/copyright',
  component: LegalCopyrightPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  storeRoute,
  coloringBookBuilderRoute,
  communityRoute,
  aboutRoute,
  marketplaceRoute,
  dashboardRoute,
  purchasesRoute,
  contentDetailRoute,
  creatorProfileRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  creativeStudioRoute,
  myCreationsRoute,
  dtfGalleryRoute,
  adminDashboardRoute,
  productionChecklistRoute,
  legalTermsRoute,
  legalPrivacyRoute,
  legalRefundRoute,
  legalCopyrightRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
