import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, ShoppingBag, LayoutDashboard, LogOut, Menu, Sparkles, Image, Printer, Home, Store, BookOpen, Users, Info, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { cn } from '@/lib/utils';

export default function Header() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const currentPath = routerState.location.pathname;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const isActivePath = (path: string) => {
    return currentPath === path;
  };

  const NavButton = ({ path, icon: Icon, label, tooltip }: { path: string; icon: any; label: string; tooltip?: string }) => {
    const active = isActivePath(path);
    
    const button = (
      <Button
        variant="ghost"
        onClick={() => navigate({ to: path })}
        className={cn(
          'nav-button relative transition-all duration-200',
          active && 'nav-button-active'
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
        {active && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent" />
        )}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  const NavLinks = () => (
    <>
      <NavButton path="/" icon={Home} label="Home" tooltip="Return to homepage" />
      <NavButton path="/store" icon={Store} label="Store" tooltip="Browse digital marketplace" />
      <NavButton path="/creative-studio" icon={Sparkles} label="Creative Studio" tooltip="AI-powered creative tools" />
      <NavButton path="/community" icon={Users} label="Community" tooltip="Explore community content" />
      <NavButton path="/about" icon={Info} label="About" tooltip="Learn about Righteous Truths" />
    </>
  );

  const MobileNavButton = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => {
    const active = isActivePath(path);
    
    return (
      <Button
        variant="ghost"
        onClick={() => navigate({ to: path })}
        className={cn(
          'mobile-nav-button w-full justify-start transition-all duration-200',
          active && 'mobile-nav-button-active bg-accent/20'
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate({ to: '/' })} className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <img src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" alt="Righteous Truths" className="h-10 w-10 object-contain" />
            <span className="hidden text-lg font-bold sm:inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Righteous Truths</span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-accent/20 transition-colors duration-200">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate({ to: '/creative-studio' })} className="cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Creative Studio
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/my-creations' })} className="cursor-pointer">
                  <Image className="mr-2 h-4 w-4" />
                  My Creations
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/marketplace' })} className="cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Marketplace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/dtf-gallery' })} className="cursor-pointer">
                  <Printer className="mr-2 h-4 w-4" />
                  DTF Gallery
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/dashboard' })} className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/purchases' })} className="cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  My Purchases
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: '/admin' })} className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAuth} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleAuth} disabled={isLoggingIn} className="hidden md:flex btn-hover-glow">
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden mobile-menu-trigger">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open menu</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-menu-content">
              <nav className="flex flex-col gap-4 pt-8">
                <MobileNavButton path="/" icon={Home} label="Home" />
                <MobileNavButton path="/store" icon={Store} label="Store" />
                <MobileNavButton path="/creative-studio" icon={Sparkles} label="Creative Studio" />
                <MobileNavButton path="/coloring-book-builder" icon={BookOpen} label="Book Builder" />
                <MobileNavButton path="/community" icon={Users} label="Community" />
                <MobileNavButton path="/about" icon={Info} label="About" />
                {isAuthenticated && (
                  <>
                    <div className="my-2 border-t" />
                    <MobileNavButton path="/marketplace" icon={ShoppingBag} label="Marketplace" />
                    <MobileNavButton path="/dtf-gallery" icon={Printer} label="DTF Gallery" />
                    <MobileNavButton path="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    {isAdmin && (
                      <MobileNavButton path="/admin" icon={Shield} label="Admin Dashboard" />
                    )}
                  </>
                )}
                <Button onClick={handleAuth} disabled={isLoggingIn} className="w-full mt-4 btn-hover-glow">
                  {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
