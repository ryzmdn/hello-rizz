import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { IconComponent } from '@/shared/components/ui/icon/icon';
import { ToggleThemeComponent } from '@/shared/components/ui/toggle-theme/toggle-theme';
import { ButtonComponent } from '@/shared/components/ui/button/button';
import { ButtonGreetings } from "@/shared/components/ui/button-greetings/button-greetings";

interface Info {
  type: 'icon' | 'image';
  icon?: string;
  image?: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [
    IconComponent,
    ToggleThemeComponent,
    NgOptimizedImage,
    ButtonComponent,
    CommonModule,
    FormsModule,
    ButtonGreetings
],
  template: `
    <header id="base-heading" class="flow-root space-y-4 px-4 sm:px-6 lg:px-0">
      <div class="group size-32 mx-auto p-1.5 rounded-full border border-base-200 shadow-xs">
        <div class="relative size-full rounded-full overflow-hidden shadow-2xl">
          <img
            [ngSrc]="pictureImage()"
            alt="My profile picture"
            fill
            class="size-full object-cover group-hover:scale-125 group-hover:rotate-12"
            priority
          />
        </div>
      </div>

      <div class="w-full text-center">
        <div class="relative w-max mx-auto">
          <h1
            class="scroll-m-20 text-base-foreground-100 text-center text-3xl font-bold tracking-tight text-balance"
          >
            {{ name() }}
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            class="absolute top-1/2 -right-9 -translate-y-1/2 size-6"
          >
            <polygon
              fill="#42a5f5"
              points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
            />
            <polygon
              fill="#fff"
              points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
            />
          </svg>
        </div>

        <div
          class="flex justify-center items-center text-base leading-7 gap-x-2.5 text-base-foreground-300 mt-1 mb-2"
        >
          @for (item of profileInfo(); track item.label; let i = $index) { @if (i > 0) {
          <svg
            viewBox="0 0 3 3"
            width="3"
            height="3"
            aria-hidden="true"
            class="fill-base-foreground-300"
          >
            <circle r="1" cx="1" cy="1" />
          </svg>
          }

          <div class="flex items-center gap-x-2">
            @if (item.type === 'icon') {
            <app-icon [name]="item.icon || 'I'" [fill]="0" [fontSize]="18" />
            } @else if (item.type === 'image') {
            <img [src]="item.image" [alt]="item.label" class="size-4" />
            }
            <p>{{ item.label }}</p>
          </div>
          }
        </div>

        <p class="text-base-foreground-300 leading-7 max-w-xl mx-auto">
          Aspiring Software Engineer | Undergraduate Computer Science at
          <a ui-button variant="link" size="xs" href="https://unpam.ac.id"
            ><strong>Pamulang University</strong></a
          >
          | Building Scalable Web &amp; Mobile App.
        </p>
      </div>

      <div class="flex justify-center items-center gap-x-2">
        <a ui-button variant="ghost" size="sm" [href]="'https://' + portfolioUrl()">
          <app-icon
            name="language"
            [fill]="0"
            [fontSize]="18"
            customClass="text-base-foreground-400"
          />
          <span class="text-base-foreground-100">{{ portfolioUrl() }}</span>
        </a>
        <svg
          viewBox="0 0 3 3"
          width="3"
          height="3"
          aria-hidden="true"
          class="fill-base-foreground-300"
        >
          <circle r="1" cx="1" cy="1" />
        </svg>
        <a ui-button variant="ghost" size="sm" [href]="'mailto:' + email()">
          <app-icon name="mail" [fill]="0" [fontSize]="18" customClass="text-base-foreground-400" />
          <span class="text-base-foreground-100">{{ email() }}</span>
        </a>
      </div>

      <div class="flex justify-center items-center gap-x-3 w-full">
        <button ui-button size="icon-lg" (click)="copyCurrentUrl()">
          <app-icon name="share" [fill]="0" [fontSize]="20" />
        </button>
        <div class="flex-1">
          <app-button-greetings></app-button-greetings>
        </div>
        <app-toggle-theme></app-toggle-theme>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly name = signal<string>('Rizky Ramadhan');
  protected readonly portfolioUrl = signal<string>('ryzdev.vercel.app');
  protected readonly email = signal<string>('rizkyramadhanrpd@gmail.com');
  protected readonly pictureImage = signal<string>('assets/images/picture.webp');
  protected readonly profileInfo = signal<Info[]>([
    { type: 'icon', icon: 'person', label: 'Web Developer' },
    {
      type: 'image',
      image: 'https://www.svgrepo.com/show/401654/flag-for-indonesia.svg',
      label: 'Indonesia',
    },
    { type: 'icon', icon: 'work', label: 'Freelancer' },
  ]);

  constructor(private router: Router) {}

  copyCurrentUrl(): void {
    const url = window.location.origin + this.router.url;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Successfully shared the link!');
      })
      .catch(() => {
        alert('Failed to share the link.');
      });
  }
}
