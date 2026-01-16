import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme, ThemeService } from '@/core/services/theme/theme';
import { IconComponent } from '@/shared/components/ui/icon/icon';
import { ButtonComponent } from '@/shared/components/ui/button/button';
import { NotificationService } from '@/core/services/notification/notification';

@Component({
  selector: 'app-toggle-theme',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  template: `
    <button
      ui-button
      size="icon-lg"
      (click)="toggleTheme()"
      [attr.aria-label]="'Switch theme. Current: ' + currentTheme"
    >
      @if (currentTheme === 'light') {
      <app-icon name="light_mode" [fill]="0" [fontSize]="20" />
      } @if (currentTheme === 'dark') {
      <app-icon name="dark_mode" [fill]="0" [fontSize]="20" />
      } @if (currentTheme === 'system') {
      <app-icon name="desktop_windows" [fill]="0" [fontSize]="20" />
      }
    </button>
  `,
})
export class ToggleThemeComponent implements OnInit {
  currentTheme: Theme = 'system';
  showOptions = false;
  private subscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    const themeLabel = this.getThemeLabel(this.currentTheme);
    const themeIcon = this.getThemeIcon(this.currentTheme);
    this.notificationService.show(`Theme changed to ${themeLabel}`, {
      type: 'message',
      icon: themeIcon,
    });
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.showOptions = false;
    const themeLabel = this.getThemeLabel(theme);
    const themeIcon = this.getThemeIcon(theme);
    this.notificationService.show(`Theme changed to ${themeLabel}`, {
      type: 'message',
      icon: themeIcon,
    });
  }

  getThemeLabel(theme: Theme): string {
    const labels: Record<Theme, string> = {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    };
    return labels[theme];
  }

  private getThemeIcon(theme: Theme): string {
    const icons: Record<Theme, string> = {
      light: 'light_mode',
      dark: 'dark_mode',
      system: 'desktop_windows',
    };
    return icons[theme];
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
}
