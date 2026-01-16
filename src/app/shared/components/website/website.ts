import { Component, signal } from '@angular/core';
import { IconComponent } from '@/shared/components/ui/icon/icon';

interface Website {
  name: string;
  summary: string;
  badge: string;
  logo: string;
  url: string;
}

@Component({
  selector: 'app-website',
  template: `
    <div class="flow-root w-full space-y-3">
      @for (website of websites(); track website.name) {
      <div
        class="relative group flex p-4 bg-base-100 hover:bg-base-200 border border-base-200 rounded-2xl shadow-xs"
      >
        <div class="size-12 p-2.5 mr-4 shrink-0 bg-base-200 group-hover:bg-base-100 rounded-md">
          <img [src]="website.logo" [alt]="website.name + ' logo'" class="size-full" />
        </div>
        <div class="w-full">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-base-foreground-200">{{ website.name }}</h3>
            <app-icon
              name="arrow_outward"
              [fill]="0"
              [fontSize]="18"
              class="text-base-400 group-hover:rotate-45"
            />
          </div>
          <p class="mt-1 mb-3 text-base-500">{{ website.summary }}</p>
          <a [href]="website.url" class="absolute inset-0">
            <span hidden>Visit {{ website.name }}</span>
          </a>

          <span
            class="size-max text-base-foreground-200 text-xs px-1.5 py-1 border border-base-200 rounded-lg"
            >Website</span
          >
        </div>
      </div>
      }
    </div>
  `,
  imports: [IconComponent],
})
export class WebsiteComponent {
  protected readonly websites = signal<Website[]>([
    {
      name: "Qur'an Huda",
      summary:
        'Read, listen, and understand the Quran through various modern, easy-to-use features.',
      badge: 'Website',
      logo: 'assets/images/quranhuda.jpg',
      url: 'https://quranhuda.vercel.app/',
    },
    {
      name: 'RyzNotes',
      summary: 'My personal blog made with nextjs, tailwind and wordpress.',
      badge: 'Blog',
      logo: 'assets/images/ryznotes.png',
      url: 'https://ryznotes.vercel.app/',
    },
    {
      name: 'RyzDev',
      summary: 'Documentation of several projects that I have made.',
      badge: 'Portfolio',
      logo: 'assets/images/ryzdev.png',
      url: 'https://ryzdev.vercel.app/',
    },
  ]);
}
