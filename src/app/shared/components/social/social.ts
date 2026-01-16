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
        <img [src]="social.icon" [alt]="'follow my ' + social.name" class="size-4.5" />
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
      icon: 'assets/images/icons/twitter-color-svgrepo-com.svg',
      url: 'https://x.com/ryzmdn',
    },
    {
      name: 'Instagram',
      icon: 'assets/images/icons/instagram-1-svgrepo-com.svg',
      url: 'https://instagram.com/ryzmdn',
    },
    {
      name: 'GitHub',
      icon: 'assets/images/icons/github-svgrepo-com.svg',
      url: 'https://github.com/ryzmdn',
    },
    {
      name: 'Dribbble',
      icon: 'assets/images/icons/dribbble-svgrepo-com.svg',
      url: 'https://dribbble.com/ryzmdn',
    },
    {
      name: 'CodePen',
      icon: 'assets/images/icons/codepen-02-svgrepo-com.svg',
      url: 'https://codepen.io/ryzmdn',
    },
    {
      name: 'LinkedIn',
      icon: 'assets/images/icons/linkedin-network-communication-connection-internet-online-svgrepo-com.svg',
      url: 'https://www.linkedin.com/in/ryzmdn',
    },
    {
      name: 'Facebook',
      icon: 'assets/images/icons/facebook-color-svgrepo-com.svg',
      url: 'https://www.facebook.com/ryzmdn',
    },
  ]);
}
