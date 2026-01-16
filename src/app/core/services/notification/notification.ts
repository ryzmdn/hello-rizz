import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  message: string;
  icon?: string;
  duration?: number;
  type?: 'success' | 'error' | 'message' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifications = signal<Notification[]>([]);

  readonly notifications$ = this.notifications.asReadonly();

  show(message: string, options: Partial<Omit<Notification, 'id' | 'message'>> = {}): string {
    const id = Math.random().toString(36).substr(2, 9);
    const duration = options.duration ?? 5000;
    const type = options.type ?? 'success';
    const icon = options.icon ?? (type === 'error' ? 'error' : 'check_circle');

    const notification: Notification = {
      id,
      message,
      icon,
      duration,
      type,
    };

    this.notifications.update((notifications) => [...notifications, notification]);

    setTimeout(() => {
      this.remove(id);
    }, duration);

    return id;
  }

  remove(id: string): void {
    this.notifications.update((notifications) => notifications.filter((n) => n.id !== id));
  }

  clear(): void {
    this.notifications.set([]);
  }
}
