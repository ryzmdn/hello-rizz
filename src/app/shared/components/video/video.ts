import { Component, signal } from '@angular/core';
import { VideoDialogComponent } from '../ui/video-dialog/video-dialog';
import { ContainerComponent } from '../container/container';

@Component({
  selector: 'app-video',
  imports: [VideoDialogComponent, ContainerComponent],
  template: `
    <app-container
      [id]="title()"
      [title]="title()"
      [username]="youtubeUsername()"
      [logo]="youtubeIcon()"
      [url]="youtubeUrl()"
    >
      <app-video-dialog
        [videoSrc]="videoSrc()"
        [thumbnailSrc]="videoThumbnail()"
        [thumbnailAlt]="title() + ' thumbnail by ' + youtubeUsername()"
        className="max-w-4xl mx-auto"
      ></app-video-dialog>
    </app-container>
  `,
})
export class VideoComponent {
  protected readonly title = signal<string>('Featured YouTube Video');
  protected readonly youtubeUsername = signal<string>('ryzmdn');
  protected readonly youtubeUrl = signal<string>(`https://www.youtube.com/@${this.youtubeUsername()}`);
  protected readonly youtubeIcon = signal<string>('https://www.svgrepo.com/show/475700/youtube-color.svg');
  protected readonly videoSrc = signal<string>('https://youtu.be/QUoRZkpQXsE?si=kLCB5NU7QDDvBc79');
  protected readonly videoThumbnail = signal<string>('assets/images/thumbnail.webp');
}
