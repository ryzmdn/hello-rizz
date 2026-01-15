import { Component, inject, Input } from '@angular/core';
import { LayoutComponent } from '@/shared/components/layout/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      [attr.aria-labelledby]="id"
      [id]="id + '-section'"
      role="region"
      class="w-full p-5 bg-base-100 border border-base-200 rounded-2xl shadow-xs"
    >
      <header class="w-full pb-5 sm:flex sm:items-center sm:justify-between" [id]="id">
        <h3 class="text-lg font-semibold text-base-foreground-200">{{ title }}</h3>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          <a [href]="url" class="flex items-center gap-x-2 text-sm text-base-foreground-300 px-2 py-1.5 rounded-md hover:bg-base-200">
            <img [src]="logo" alt="logo" class="size-4" />
            <span>&#64;{{ username }}</span>
          </a>
        </div>
      </header>

      <div class="w-full bg-transparent" [ngClass]="class">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class ContainerComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() logo?: string = 'https://www.svgrepo.com/show/303670/firebase-1-logo.svg';
  @Input() username: string = '';
  @Input() url: string = '';
  @Input() class?: string = '';

  private layout = inject(LayoutComponent, { optional: true });

  constructor() {
    if (!this.layout) {
      throw new Error('error');
    }
  }
}
