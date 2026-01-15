import {
  Component,
  signal,
  computed,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { IconComponent } from '@/shared/components/ui/icon/icon';

interface Story {
  label: string;
  images: string[];
}

@Component({
  selector: 'app-story',
  imports: [NgOptimizedImage, CommonModule, IconComponent],
  template: `
    <div class="flex justify-between items-center my-5">
      @for (story of story(); track story.label) {
      <figure class="relative group text-center w-max space-y-2 bg-transparent cursor-pointer">
        <div
          class="flex justify-center items-center size-20 mx-auto bg-linear-to-br from-bright-blue to-hot-red p-0.5 rounded-full"
        >
          <div class="size-full p-0.5 bg-base-50 rounded-full">
            <div class="relative size-full overflow-hidden rounded-full bg-base-50">
              <img
                [ngSrc]="story.images[0]"
                [alt]="story.label"
                loading="lazy"
                fill
                class="object-cover group-hover:scale-125 rounded-full"
              />
            </div>
          </div>
        </div>
        <figcaption class="text-xs text-base-foreground-300">
          <button type="button" (click)="openStory(story)" class="absolute inset-0">
            <span hidden>Show {{ story.label }} story</span>
          </button>
          {{ story.label }}
        </figcaption>
      </figure>
      }
    </div>

    @if (selectedStory()) {
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-base-50/10 backdrop-blur-md"
      (click)="closeStory()"
      [class.opacity-0]="!isModalOpen()"
      [class.opacity-100]="isModalOpen()"
      [class.pointer-events-none]="!isModalOpen()"
      [class.transition-opacity]="true"
      [class.duration-300]="true"
    >
      <div
        class="relative w-full max-w-md h-[90dvh] mx-4 overflow-hidden rounded-xl"
        (click)="$event.stopPropagation()"
      >
        <div class="absolute top-4 inset-x-4 z-20 flex gap-1">
          @for (img of selectedStory()?.images; track $index; let i = $index) {
          <div class="h-0.5 flex-1 bg-static-200/30 rounded-full overflow-hidden">
            <div class="h-full bg-static-100" [style.width.%]="getProgressBarWidth(i)"></div>
          </div>
          }
        </div>

        <div class="absolute top-8 z-20 flex justify-between items-center w-full px-4">
          <a [href]="instagramUrl()" class="flex items-center gap-x-2.5">
            <img
              [src]="instagramPicture()"
              alt="Profile picture"
              class="size-6 rounded-full"
            />
            <span class="text-static-100 text-sm/6">{{ instagramUsername() }}</span>
          </a>

          <button (click)="closeStory()" class="shrink-0 text-static-200 transition-colors">
            <app-icon name="close" [fill]="0" [fontSize]="18" customClass="text-static-200" />
          </button>
        </div>

        <div class="relative size-full">
          <img
            [src]="selectedStory()?.images[currentImageIndex()]"
            [alt]="selectedStory()?.label"
            class="size-full object-cover"
            [style.transform]="'translateX(' + swipeOffset() + 'px)'"
            [style.transition]="isSwiping() ? 'none' : 'transform 0.3s ease-out'"
            (touchstart)="onTouchStart($event)"
            (touchmove)="onTouchMove($event)"
            (touchend)="onTouchEnd()"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseEnd()"
            (mouseleave)="onMouseEnd()"
          />
        </div>

        @if (!isSwiping()) {
        <div class="absolute inset-0 z-10 flex">
          <div class="w-1/2 h-full cursor-pointer" (click)="previousStory()"></div>
          <div class="w-1/2 h-full cursor-pointer" (click)="nextStory()"></div>
        </div>
        }

        <div class="absolute left-0 bottom-3.5 text-center w-full">
          <p class="text-xs text-static-100/50">Instagram &#64;{{ instagramUsername() }}</p>
        </div>
      </div>
    </div>
    }
  `,
})
export class StoryComponent implements OnDestroy {
  private readonly renderer = inject(Renderer2);

  protected selectedStory = signal<any>(null);
  protected isModalOpen = signal<boolean>(false);
  protected currentImageIndex = signal<number>(0);
  protected progress = signal<number>(0);
  protected isSwiping = signal<boolean>(false);
  protected swipeOffset = signal<number>(0);
  protected touchStartX: number = 0;
  protected touchStartY: number = 0;
  protected isDragging: boolean = false;

  protected readonly instagramUsername = signal<string>('ryzmdn');
  protected readonly instagramUrl = signal<string>(`https://instagram.com/${this.instagramUsername()}`);
  protected readonly instagramPicture = signal<string>('https://avatars.githubusercontent.com/u/134961138?v=4');

  private readonly STORY_DURATION: number = 5000;
  private readonly SWIPE_THRESHOLD: number = 50;
  private autoAdvanceInterval: any;
  private progressInterval: any;
  private progressStartTime: number = 0;
  private currentProgressDuration: number = 0;

  protected readonly story = signal<Story[]>([
    {
      label: 'Jaksel',
      images: [
        'assets/images/story/city/jaksel.webp',
        'assets/images/story/city/jaksel_2.webp',
        'assets/images/story/city/jaksel_3.webp',
      ],
    },
    {
      label: 'Ngoding',
      images: [
        'assets/images/story/coding/coding.webp',
        'assets/images/story/coding/coding_2.webp'
      ],
    },
    {
      label: 'Ngopi',
      images: [
        'assets/images/story/coffee/coffee.webp',
      ],
    },
    {
      label: 'Pemandangan',
      images: [
        'assets/images/story/view/view.webp',
      ],
    },
    {
      label: 'Design',
      images: [
        'assets/images/story/design/design.webp',
      ],
    },
  ]);

  protected showPreviousArrow = computed(() => {
    return !this.isSwiping() && this.currentImageIndex() > 0;
  });

  protected showNextArrow = computed(() => {
    if (!this.selectedStory()) return false;
    return !this.isSwiping() && this.currentImageIndex() < this.selectedStory().images.length - 1;
  });

  ngOnDestroy() {
    this.stopAllIntervals();
  }

  getProgressBarWidth(index: number): number {
    const currentIndex = this.currentImageIndex();

    if (index < currentIndex) {
      return 100;
    } else if (index === currentIndex) {
      return this.progress();
    } else {
      return 0;
    }
  }

  openStory(story: any) {
    this.selectedStory.set(story);
    this.currentImageIndex.set(0);
    this.progress.set(0);
    this.renderer.addClass(document.body, 'overflow-hidden');
    setTimeout(() => {
      this.isModalOpen.set(true);
      this.startProgressTimer();
    }, 10);
  }

  closeStory() {
    this.renderer.removeClass(document.body, 'overflow-hidden');
    this.isModalOpen.set(false);
    this.stopAllIntervals();
    setTimeout(() => {
      this.selectedStory.set(null);
      this.currentImageIndex.set(0);
      this.progress.set(0);
      this.swipeOffset.set(0);
    }, 300);
  }

  previousStory() {
    if (this.currentImageIndex() > 0) {
      this.currentImageIndex.update((index) => index - 1);
      this.progress.set(0);
      this.restartProgressTimer();
    }
  }

  nextStory() {
    if (!this.selectedStory()) return;

    const nextIndex = this.currentImageIndex() + 1;
    const totalImages = this.selectedStory().images.length;

    if (nextIndex < totalImages) {
      this.currentImageIndex.set(nextIndex);
      this.progress.set(0);
      this.restartProgressTimer();
    } else {
      this.closeStory();
    }
  }

  private startProgressTimer() {
    this.stopProgressTimer();

    this.progressStartTime = Date.now();
    this.currentProgressDuration = 0;

    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - this.progressStartTime;
      this.currentProgressDuration = elapsed;

      const progressPercentage = (elapsed / this.STORY_DURATION) * 100;

      if (progressPercentage >= 100) {
        this.nextStory();
      } else {
        this.progress.set(progressPercentage);
      }
    }, 50);
  }

  private stopProgressTimer() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  private restartProgressTimer() {
    this.stopProgressTimer();
    this.startProgressTimer();
  }

  private stopAllIntervals() {
    this.stopProgressTimer();
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  onTouchStart(event: TouchEvent) {
    this.stopProgressTimer();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;

    const touchX = event.touches[0].clientX;
    const deltaX = touchX - this.touchStartX;
    const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);

    if (deltaY < 20) {
      this.isSwiping.set(true);
      this.swipeOffset.set(deltaX);
    }
  }

  onTouchEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.isSwiping.set(false);

    const deltaX = this.swipeOffset();

    if (Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        this.nextStory();
      } else {
        this.previousStory();
      }
    }

    this.swipeOffset.set(0);
    this.startProgressTimer();
  }

  onMouseDown(event: MouseEvent) {
    this.stopProgressTimer();
    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;
    this.isDragging = true;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const mouseX = event.clientX;
    const deltaX = mouseX - this.touchStartX;
    const deltaY = Math.abs(event.clientY - this.touchStartY);

    if (deltaY < 20) {
      this.isSwiping.set(true);
      this.swipeOffset.set(deltaX);
    }
  }

  onMouseEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.isSwiping.set(false);

    const deltaX = this.swipeOffset();

    if (Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        this.nextStory();
      } else {
        this.previousStory();
      }
    }

    this.swipeOffset.set(0);
    this.startProgressTimer();
  }
}
