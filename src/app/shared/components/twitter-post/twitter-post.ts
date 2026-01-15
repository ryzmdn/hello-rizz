import { Component, signal } from '@angular/core';
import { ContainerComponent } from '@/shared/components/container/container';
import { ButtonComponent } from '@/shared/components/ui/button/button';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-twitter-post',
  imports: [ContainerComponent, ButtonComponent, NgOptimizedImage],
  template: `
    <app-container
      [id]="title()"
      [title]="title()"
      [username]="twitterUsername()"
      [logo]="twitterIcon()"
      [url]="twitterUrl()"
    >
      <div class="w-full p-4 bg-base-200 rounded-xl">
        <div class="flex items-center">
          <div class="relative size-12 rounded-full overflow-hidden">
            <img
              [ngSrc]="twitterPicture()"
              alt="My twitter profile picture"
              class="outline -outline-offset-1 outline-base-foreground-50/5"
              fill
            />
          </div>

          <div class="ml-3">
            <p class="text-lg font-medium text-base-foreground-200">Rizky Ramadhan</p>

            <div class="flex items-center gap-x-1.5 text-sm">
              <p class="font-medium text-base-foreground-400">@{{ twitterUsername() }}</p>
              <svg
                viewBox="0 0 3 3"
                width="3"
                height="3"
                aria-hidden="true"
                class="fill-base-foreground-400"
              >
                <circle r="1" cx="1" cy="1" />
              </svg>
              <a
                ui-button
                variant="link"
                size="xs"
                [href]="twitterUrl()"
                class="text-sm text-bright-blue hover:text-bright-blue/50"
                >Follow</a
              >
            </div>
          </div>
        </div>

        <div class="w-full line-clamp-4 py-3.5">
          <p class="text-base leading-7 text-base-foreground-300">baru inget punya akun ini</p>
        </div>

        <div class="flex items-center gap-x-2 text-sm text-base-foreground-400">
          <time datetime="10:39">10:39 PM</time>
          <svg
            viewBox="0 0 3 3"
            width="3"
            height="3"
            aria-hidden="true"
            class="fill-base-foreground-400"
          >
            <circle r="1" cx="1" cy="1" />
          </svg>
          <time datetime="10:39">Jul 23, 2023</time>
        </div>
      </div>
    </app-container>
  `,
})
export class TwitterPostComponent {
  protected readonly title = signal<string>('Featured Twitter Post');
  protected readonly twitterUsername = signal<string>('ryzmdn');
  protected readonly twitterUrl = signal<string>(`https://x.com/${this.twitterUsername()}`);
  protected readonly twitterIcon = signal<string>('https://www.svgrepo.com/show/475689/twitter-color.svg');
  protected readonly twitterPicture = signal<string>('assets/images/picture.webp');
}
