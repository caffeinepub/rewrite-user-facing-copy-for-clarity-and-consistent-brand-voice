import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, any>;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  structuredData 
}: SEOHeadProps) {
  const fullTitle = `${title} | Righteous Truths`;
  const defaultImage = '/assets/generated/righteous-truths-logo-transparent.dim_200x200.png';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'Righteous Truths');

    // Open Graph tags
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage || `${siteUrl}${defaultImage}`, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:site_name', 'Righteous Truths', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage || `${siteUrl}${defaultImage}`);
    updateMetaTag('twitter:site', '@RighteousTruths');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      
      const baseStructuredData = {
        '@context': 'https://schema.org',
        ...structuredData,
      };
      
      scriptTag.textContent = JSON.stringify(baseStructuredData);
    }

  }, [fullTitle, description, keywords, ogImage, ogType, siteUrl, currentUrl, structuredData]);

  return null;
}
