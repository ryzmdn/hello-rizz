import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ArticlePost, WordpressService } from '@/core/services/wordpress/wordpress';
import { ContainerComponent } from '@/shared/components/container/container';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [ContainerComponent, DatePipe],
  template: `
    <app-container
      [id]="title()"
      [title]="title()"
      [username]="blogUsername()"
      [logo]="blogIcon()"
      [url]="blogUrl()"
    >
      <div class="flow-root space-y-3 divide-y divide-base-200">
        @for (blog of posts; track blog.id) {
        <article class="flex max-w-xl flex-col items-start justify-between p-4 bg-transparent hover:bg-base-200 rounded-lg">
          <div class="flex items-center gap-x-4 text-xs">
            <time [attr.datetime]="blog.date" class="text-base-foreground-400">{{ blog.date | date: 'dd MMMM, yyyy' }}</time>
            <div
              class="relative z-10 rounded-full bg-transparent px-2 py-1 font-medium capitalize text-base-foreground-400 border border-base-200"
              >{{ blog.category }}</div
            >
          </div>
          <div class="group relative grow">
            <h3 class="mt-3 text-lg/6 font-semibold text-base-foreground-200">
              <a [href]="blogUrl + '/blog/read/' + blog.slug" target="_blank">
                <span class="absolute inset-0"></span>
                {{ blog.title }}
              </a>
            </h3>
            <p class="mt-3 line-clamp-2 text-sm/6 text-base-foreground-400">
              {{ blog.excerpt }}
            </p>
          </div>
        </article>
        }
      </div>
    </app-container>
  `,
})
export class BlogPostComponent {
  private wordPressService = inject(WordpressService);

  protected readonly title = signal<string>('Latest Article Post');
  protected readonly blogUsername = signal<string>('ryzmdn');
  protected readonly blogUrl = signal<string>('https://github.com/exeriz/ryznotes/blob/main/src/assets/logo.webp?raw=true');
  protected readonly blogIcon = signal<string>('https://ryznote.vercel.app');

  posts: ArticlePost[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.wordPressService.getLatestPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load blog posts. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
