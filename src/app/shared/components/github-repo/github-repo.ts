import { Component, signal } from '@angular/core';
import { IconComponent } from "@/shared/components/ui/icon/icon";
import { ContainerComponent } from "@/shared/components/container/container";

interface Repository {
  user: string;
  name: string;
  description: string;
  language: string;
  license?: string;
  url: string;
  archive?: boolean;
}

@Component({
  selector: 'app-github-repo',
  imports: [IconComponent, ContainerComponent],
  template: `
    <app-container
      [id]="title()"
      [title]="title()"
      [username]="githubUsername()"
      [logo]="githubIcon()"
      [url]="githubUrl()"
    >
      <div class="flow-root space-y-3 divide-y divide-base-200">
        @for (repo of repositories(); track repo.name) {
          <div class="text-base-foreground-400 text-sm leading-6 w-full space-y-1.5 pb-3 bg-transparent">
            <div class="flex items-center gap-x-2">
              <app-icon name="book_2" [fill]="0" [fontSize]="18" />
              
              <div class="flex items-center gap-x-1">
                <div class="relative flex items-center gap-x-1 text-bright-blue hover:underline">
                  <p>{{ repo.user }}</p>
                  <span>/</span>
                  <p>{{ repo.name }}</p>
                  <a [href]="repo.url" class="absolute inset-0">
                    <span hidden>View my Repository</span>
                  </a>
                </div>

                @if (repo.archive) {
                  <span class="inline-flex items-center rounded-full bg-hot-red/5 ml-2 px-1.5 py-0.5 text-xs font-medium text-hot-red inset-ring inset-ring-hot-red/20">
                    Public Archive
                  </span>
                }
              </div>
            </div>

            <div class="w-full h-max">
              <p>{{ repo.description }}</p>

              <div class="flex items-center gap-x-8 mt-1.5">
                <div class="flex items-center gap-x-1.5">
                  <div class="block size-3 bg-bright-blue rounded-full"></div>
                  <p>{{ repo.language }}</p>
                </div>
                <div class="flex items-center gap-x-1.5">
                  <app-icon name="balance" [fill]="0" [fontSize]="18" />
                  <p>{{ repo.license }} License</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </app-container>
  `
})
export class GithubRepoComponent {
  protected readonly title = signal<string>('Featured Repository');
  protected readonly githubUsername = signal<string>('ryzmdn');
  protected readonly githubIcon = signal<string>('assets/images/icons/github-svgrepo-com.svg');
  protected readonly githubUrl = signal<string>('https://github.com/ryzmdn');

  protected readonly repositories = signal<Repository[]>([
    {
      user: 'quranhuda',
      name: 'quranhuda',
      description: 'Read, listen, and understand the Quran through various modern, easy-to-use features.',
      language: 'TypeScript',
      license: 'MIT',
      url: 'https://github.com/quranhuda/quranhuda',
      archive: false
    },
    {
      user: 'exeriz',
      name: 'ryznotes',
      description: 'My personal blog made with nextjs, tailwind and wordpress.',
      language: 'TypeScript',
      license: 'MIT',
      url: 'https://github.com/exeriz/ryznotes',
      archive: false
    },
    {
      user: 'exeriz',
      name: 'ryzdev',
      description: 'Documentation of several projects that I have made.',
      language: 'TypeScript',
      license: 'MIT',
      url: 'https://github.com/exeriz/ryzdev',
      archive: true
    },
    {
      user: 'exeriz',
      name: 'ryzbook',
      description: 'My personal blog made with Next.Js, Tailwind CSS and Wordpress.',
      language: 'TypeScript',
      license: 'MIT',
      url: 'https://github.com/exeriz/ryzbook',
      archive: true
    }
  ])
}
