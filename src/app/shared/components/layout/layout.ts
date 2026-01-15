import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <div class="flow-root max-w-lg min-h-dvh space-y-5 mx-auto py-12">
      <ng-content></ng-content>
    </div>
  `,
})
export class LayoutComponent {}
