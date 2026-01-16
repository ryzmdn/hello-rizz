import { Component, signal } from '@angular/core';
import { ContainerComponent } from '../container/container';
import { ButtonComponent } from '../ui/button/button';

@Component({
  selector: 'app-call-to-action',
  imports: [ContainerComponent, ButtonComponent],
  template: `
    <app-container id="linkedin">
      <div class="mx-auto max-w-2xl text-center space-y-7">
        <div class="w-full">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-base-foreground-100 sm:text-5xl">
            Let&apos;s Work Together
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-base/7 text-pretty text-base-foreground-400">
            Connect with me on LinkedIn to see my experience, projects, and professional journey in
            the tech world.
          </p>
        </div>

        <a
          ui-button
          size="lg"
          [href]="url()"
          target="_blank"
          rel="noopener noreferrer"
          class="text-base-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4 fill-base-200">
            <path
              d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
            />
          </svg>
          <span>&#124;</span>
          <p>Connect LinkedIn</p>
        </a>
      </div>
    </app-container>
  `,
})
export class CallToAction {
  protected readonly url = signal<string>('https://www.linkedin.com/in/ryzmdn');
}
