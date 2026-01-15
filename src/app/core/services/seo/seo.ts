import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
  type?: 'website' | 'article' | 'profile';
  publishedDate?: Date;
  modifiedDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly router = inject(Router);

  private baseUrl = 'https://hello-rizz.vercel.app';
  private siteName = 'Link Bio';

  constructor() {
    this.trackPageViews();
    this.setDefaultMetaTags();
  }

  updateMetaTags(config: SEOConfig): void {
    const fullTitle = `${config.title} | ${this.siteName}`;
    this.titleService.setTitle(fullTitle);

    this.updateMetaTag('og:title', config.title);
    this.updateMetaTag('twitter:title', config.title);
    this.updateMetaTag('description', config.description);
    this.updateMetaTag('og:description', config.description);
    this.updateMetaTag('twitter:description', config.description);

    if (config.keywords) {
      this.updateMetaTag('keywords', config.keywords);
    }

    if (config.image) {
      this.updateMetaTag('og:image', config.image);
      this.updateMetaTag('twitter:image', config.image);
    }

    if (config.url) {
      this.updateMetaTag('og:url', config.url);
      this.updateCanonicalUrl(config.url);
    }

    if (config.author) {
      this.updateMetaTag('author', config.author);
    }

    if (config.type) {
      this.updateMetaTag('og:type', config.type);
    }

    if (config.type === 'article') {
      this.addArticleStructuredData(config);
    }
  }

  private setDefaultMetaTags(): void {
    this.updateMetaTag('og:site_name', this.siteName);
    this.updateMetaTag('og:locale', 'en_US');
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:creator', '@ryzmdn');
    this.updateMetaTag(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  }

  private updateMetaTag(name: string, content: string): void {
    const existingTag =
      this.metaService.getTag(`name='${name}'`) || this.metaService.getTag(`property='${name}'`);

    if (existingTag) {
      this.metaService.updateTag({ name, content });
    } else {
      this.metaService.addTag({ name, content });
    }
  }

  private updateCanonicalUrl(url: string): void {
    let canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = url;
  }

  private addArticleStructuredData(config: SEOConfig): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.title,
      description: config.description,
      image: config.image,
      author: {
        '@type': 'Person',
        name: config.author || 'Rizky',
      },
      datePublished: config.publishedDate?.toISOString(),
      dateModified: config.modifiedDate?.toISOString(),
      url: config.url || this.baseUrl,
    };

    this.addStructuredData(structuredData);
  }

  private addStructuredData(data: Record<string, unknown>): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEnd = event as NavigationEnd;
        // Notify Google Analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('config', 'YOUR_GA_ID', {
            page_path: navEnd.urlAfterRedirects,
          });
        }
      });
  }

  generateSitemap(): string {
    const routes = [{ path: '/', priority: 1.0, changefreq: 'daily' }];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    routes.forEach((route) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${this.baseUrl}${route.path}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${route.priority}</priority>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += '</urlset>';
    return sitemap;
  }
}

declare let gtag: Function;
