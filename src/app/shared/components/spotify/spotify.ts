import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContainerComponent } from '@/shared/components/container/container';

@Component({
  selector: 'app-spotify',
  imports: [ContainerComponent],
  template: `
    <app-container
      [id]="title()"
      [title]="title()"
      [username]="spotifyUsername()"
      [logo]="spotifyIcon()"
      [url]="spotifyUrl()"
    >
      <iframe
        data-testid="embed-iframe"
        [src]="sanitizedSpotifyEmbed()"
        class="w-full h-88 rounded"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </app-container>
  `,
})
export class SpotifyComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly title = signal<string>('Spotify Album');
  protected readonly spotifyUsername = signal<string>('ryzmdn');
  protected readonly spotifyIcon = signal<string>(
    'https://www.svgrepo.com/show/475684/spotify-color.svg'
  );
  protected readonly spotifyUrl = signal<string>(
    'https://open.spotify.com/user/31y7shgp4loiua7h7acnrklfrvxq?si=b0c3cc7226ea49a0'
  );
  protected readonly spotifyEmbed = signal<string>(
    'https://open.spotify.com/embed/playlist/748k49hBX1cIy9iTdR6BzM?utm_source=generator&theme=0'
  );

  protected readonly sanitizedSpotifyEmbed = signal<SafeResourceUrl>(
    this.sanitizer.bypassSecurityTrustResourceUrl(this.spotifyEmbed())
  );
}
