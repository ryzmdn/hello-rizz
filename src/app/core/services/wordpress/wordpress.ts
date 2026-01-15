import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ArticlePost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  date: Date;
  readingTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private readonly apiUrl = signal<string>('https://public-api.wordpress.com/wp/v2/sites/ryzmdn.wordpress.com');
  private readonly postsPerPage = signal<number>(5);
  private readonly defaultImage = signal<string>('https://images.unsplash.com/photo-1554050857-71489d1f758a?auto=format&fit=crop&w=500&q=60');
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  getLatestPosts(): Observable<ArticlePost[]> {
    return this.http
      .get<WordPressPost[]>(`${this.apiUrl()}/posts`, {
        params: {
          per_page: this.postsPerPage().toString(),
          orderby: 'date',
          order: 'desc',
          _embed: 'true',
        },
      })
      .pipe(
        map((posts) => posts.map((post) => this.mapPost(post))),
        catchError((error) => {
          console.error('Error fetching posts:', error);
          throw new Error(`Failed to fetch posts: ${this.getErrorMessage(error)}`);
        })
      );
  }

  getPostBySlug(slug: string): Observable<ArticlePost> {
    return this.http
      .get<WordPressPost[]>(`${this.apiUrl()}/posts`, {
        params: {
          slug,
          _embed: 'true',
        },
      })
      .pipe(
        map((posts) => {
          if (posts.length === 0) {
            throw new Error('Post not found');
          }
          return this.mapPost(posts[0]);
        }),
        catchError((error) => {
          console.error('Error fetching post:', error);
          throw new Error(`Failed to fetch post: ${this.getErrorMessage(error)}`);
        })
      );
  }

  private getFeaturedImage(post: WordPressPost): string {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return this.defaultImage();
  }

  private getCategory(post: WordPressPost): string {
    if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
      return post._embedded['wp:term'][0][0].name;
    }
    return 'Uncategorized';
  }

  private calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return Math.max(1, readingTime);
  }

  private stripHtml(html: string): string {
    if (!html) return '';

    if (isPlatformBrowser(this.platformId)) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  private mapPost(post: WordPressPost): ArticlePost {
    return {
      id: post.id,
      slug: post.slug,
      title: this.stripHtml(post.title.rendered),
      excerpt: this.stripHtml(post.excerpt.rendered),
      content: post.content.rendered,
      featuredImage: this.getFeaturedImage(post),
      category: this.getCategory(post),
      date: new Date(post.date),
      readingTime: this.calculateReadingTime(post.content.rendered),
    };
  }

  private getErrorMessage(error: any): string {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.message) {
      return error.message;
    }
    if (error.status) {
      return `HTTP ${error.status}: ${error.statusText}`;
    }
    return 'Unknown error';
  }
}
