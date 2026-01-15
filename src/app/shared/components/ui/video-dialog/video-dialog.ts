import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconComponent } from "../icon/icon";

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  host: {
    '(document:keydown.escape)': 'handleEscapeKey($event)',
  },
  template: `
    <div class="relative w-full" [ngClass]="className">
      <button
        type="button"
        aria-label="Play video"
        class="group relative cursor-pointer border-0 bg-transparent p-0"
        (click)="openVideo()"
      >
        <img
          [src]="thumbnailSrc"
          [alt]="thumbnailAlt"
          width="1920"
          height="1080"
          class="w-full rounded-md border border-base-100 shadow-lg group-hover:brightness-[0.8]"
        />
        <div
          class="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl group-hover:scale-100"
        >
          <div
            class="bg-base-200/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md"
          >
            <div
              class="from-base-200/20 to-base-200 relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b shadow-md group-hover:scale-[1.2]"
            >
              <app-icon name="play_arrow" [fill]="1" [fontSize]="48" customClass="scale-100 text-static-300 group-hover:scale-105"  />
            </div>
          </div>
        </div>
      </button>

      @if (isVideoOpen) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        [class.fade-in]="isVideoOpen"
        [class.fade-out]="!isVideoOpen && wasOpen"
        (click)="closeVideo()"
        tabindex="0"
        (keydown)="onKeyDown($event)"
      >
        <div class="relative mx-4 aspect-video w-full max-w-4xl md:mx-0">
          <button
            class="absolute -top-12 -right-14 rounded-full bg-base-200/50 size-10 text-base-foreground-200 border border-base-100/15 backdrop-blur-md"
            (click)="closeVideo(); $event.stopPropagation()"
          >
            <app-icon name="close" [fill]="0" [fontSize]="20" />
          </button>
          <div
            class="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white"
          >
            <iframe
              [src]="getSafeVideoUrl()"
              title="Hero Video player"
              class="size-full rounded-2xl"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }

      .fade-out {
        animation: fadeOut 0.3s ease-out forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,
  ],
})
export class VideoDialogComponent {
  private sanitizer = inject(DomSanitizer);

  @Input() videoSrc: string = '';
  @Input() thumbnailSrc: string = '';
  @Input() thumbnailAlt: string = 'Video thumbnail';
  @Input() className: string = '';

  isVideoOpen: boolean = false;
  wasOpen: boolean = false;

  openVideo(): void {
    this.wasOpen = this.isVideoOpen;
    this.isVideoOpen = true;
  }

  closeVideo(): void {
    this.wasOpen = this.isVideoOpen;
    this.isVideoOpen = false;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      this.closeVideo();
      event.preventDefault();
    }
  }

  getSafeVideoUrl(): SafeResourceUrl {
    const embedUrl = this.convertToEmbedUrl(this.videoSrc);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private convertToEmbedUrl(url: string): string {
    if (url.includes('/embed/')) {
      return url;
    }

    let videoId = '';

    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  handleEscapeKey(event: Event): void {
    if (this.isVideoOpen) {
      this.closeVideo();
      (event as KeyboardEvent).preventDefault();
    }
  }
}
