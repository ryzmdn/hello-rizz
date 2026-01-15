import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('system');
  private storageKey = 'ui-theme';
  private isBrowser: boolean;

  theme$: Observable<Theme> = this.themeSubject.asObservable();
  currentTheme: Theme = 'system';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.storageKey) as Theme;
    const initialTheme = savedTheme || 'system';
    
    this.currentTheme = initialTheme;
    this.themeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  setTheme(theme: Theme): void {
    if (!this.isBrowser) return;

    this.currentTheme = theme;
    this.themeSubject.next(theme);
    
    if (theme === 'system') {
      localStorage.removeItem(this.storageKey);
    } else {
      localStorage.setItem(this.storageKey, theme);
    }
    
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }

  toggleTheme(): void {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  getSystemTheme(): 'light' | 'dark' {
    if (!this.isBrowser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}