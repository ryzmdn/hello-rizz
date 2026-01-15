import { Component, signal } from '@angular/core';

interface Social {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-social',
  imports: [],
  template: `
    <div class="flex flex-wrap justify-center items-center gap-3">
      @for (social of socials(); track social.name) {
      <a
        [href]="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-x-1.5 w-max px-2 py-1 bg-base-200 hover:bg-base-300 rounded-full"
      >
        <img [src]="social.icon" [alt]="'follow my ' + social.name" class="size-5" />
        <span class="text-base-foreground-200">{{ social.name }}</span>
      </a>
      }
    </div>
  `,
})
export class SocialComponent {
  protected readonly socials = signal<Social[]>([
    {
      name: 'Twitter',
      icon: 'https://www.svgrepo.com/show/475689/twitter-color.svg',
      url: 'https://x.com/ryzmdn',
    },
    {
      name: 'Instagram',
      icon: 'https://www.svgrepo.com/show/452229/instagram-1.svg',
      url: 'https://instagram.com/ryzmdn',
    },
    {
      name: 'GitHub',
      icon: 'https://www.svgrepo.com/show/512317/github-142.svg',
      url: 'https://github.com/ryzmdn',
    },
    {
      name: 'Dribbble',
      icon: 'https://www.svgrepo.com/show/153985/dribbble.svg',
      url: 'https://dribbble.com/ryzmdn',
    },
    {
      name: 'CodePen',
      icon: 'https://www.svgrepo.com/show/508790/codepen-02.svg',
      url: 'https://codepen.io/ryzmdn',
    },
    {
      name: 'LinkedIn',
      icon: 'https://www.svgrepo.com/show/448234/linkedin.svg',
      url: 'https://www.linkedin.com/in/ryzmdn',
    },
    {
      name: 'Facebook',
      icon: 'https://www.svgrepo.com/show/349359/facebook.svg',
      url: 'https://www.facebook.com/ryzmdn',
    },
  ]);
}
