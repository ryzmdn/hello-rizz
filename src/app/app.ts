import { Component } from '@angular/core';
import { HeaderComponent } from '@/shared/components/header/header';
import { FooterComponent } from '@/shared/components/footer/footer';
import { StoryComponent } from '@/shared/components/story/story';
import { SocialComponent } from '@/shared/components/social/social';
import { WebsiteComponent } from '@/shared/components/website/website';
import { TwitterPostComponent } from '@/shared/components/twitter-post/twitter-post';
import { LayoutComponent } from '@/shared/components/layout/layout';
import { VideoComponent } from '@/shared/components/video/video';
import { SpotifyComponent } from '@/shared/components/spotify/spotify';
import { GithubRepoComponent } from "@/shared/components/github-repo/github-repo";
import { MainContainerComponent } from "@/shared/components/main-container/main-container";
import { BlogPostComponent } from "@/shared/components/blog-post/blog-post";

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    StoryComponent,
    SocialComponent,
    WebsiteComponent,
    TwitterPostComponent,
    LayoutComponent,
    SpotifyComponent,
    VideoComponent,
    GithubRepoComponent,
    MainContainerComponent,
    BlogPostComponent
],
  template: `
    <app-layout>
      <app-header></app-header>
      <app-main-container>
        <app-story></app-story>
        <app-social></app-social>
        <app-website></app-website>
        <app-twitter-post></app-twitter-post>
        <app-video></app-video>
        <app-github-repo></app-github-repo>
        <app-spotify></app-spotify>
        <app-blog-post></app-blog-post>
      </app-main-container>
      <app-footer></app-footer>
    </app-layout>
  `,
})
export class App {}
