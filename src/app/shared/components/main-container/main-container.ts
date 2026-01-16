import { Component, inject } from '@angular/core';
import { LayoutComponent } from '@/shared/components/layout/layout';

@Component({
  selector: 'app-main-container',
  standalone: true,
  template: `
    <main id="main" class="flex flex-col gap-y-5 w-full bg-transparent overflow-x-hidden px-4 sm:px-6 lg:px-0">
      <ng-content></ng-content>
    </main>
  `
})
export class MainContainerComponent {
  private layout = inject(LayoutComponent, { optional: true });

  constructor() {
    if (!this.layout) {
      throw new Error('An error occurred in the <app-main-container> component, which may be outside the <app-layout> component.')
    }
  }
}
