import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="flex flex-col justify-center items-center gap-y-2.5 text-base-foreground-300 text-sm/6 text-center w-full pt-10 sm:text-base/7">
      <p>&copy; {{ year() }} Rizky Ramadhan. All rights reserved.</p>
      <div class="flex flex-col items-center gap-x-3 gap-y-1 sm:flex-row">
        <p>Designed by <a [href]="url()" class="capitalize">{{ username() }}</a></p>
        <svg viewBox="0 0 3 3" width="3" height="3" aria-hidden="true" class="hidden fill-base-foreground-300 sm:block">
          <circle r="1" cx="1" cy="1" />
        </svg>
        <p>Powered by {{ license() }} License</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly year = signal<number>(0);
  protected readonly username = signal<string>('ryzmdn');
  protected readonly license = signal<string>('MIT');
  protected readonly url = signal<string>(`https://github.com/${this.username()}`);
  
  constructor() {
    this.year.set(new Date().getFullYear());
  }
}
