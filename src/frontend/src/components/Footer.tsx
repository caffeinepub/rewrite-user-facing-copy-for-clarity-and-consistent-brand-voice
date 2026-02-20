import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';

export default function Footer() {
  const navigate = useNavigate();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'righteous-truths');

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
              aria-label="Visit our Facebook page"
            >
              <SiFacebook className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
              aria-label="Visit our Instagram page"
            >
              <SiInstagram className="h-5 w-5" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
              aria-label="Visit our TikTok page"
            >
              <SiTiktok className="h-5 w-5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
              aria-label="Visit our YouTube channel"
            >
              <SiYoutube className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <button 
              onClick={() => navigate({ to: '/legal/terms' })} 
              className="footer-legal-link transition-all duration-200 hover:text-foreground hover:underline hover:scale-105"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate({ to: '/legal/privacy' })} 
              className="footer-legal-link transition-all duration-200 hover:text-foreground hover:underline hover:scale-105"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate({ to: '/legal/refund' })} 
              className="footer-legal-link transition-all duration-200 hover:text-foreground hover:underline hover:scale-105"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate({ to: '/legal/copyright' })} 
              className="footer-legal-link transition-all duration-200 hover:text-foreground hover:underline hover:scale-105"
            >
              Copyright & Licensing
            </button>
          </div>

          <p className="flex items-center gap-1 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Righteous Truths. Built with <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-caffeine-link font-medium underline underline-offset-4 transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
