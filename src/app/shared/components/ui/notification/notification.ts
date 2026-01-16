import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@/core/services/notification/notification';
import { IconComponent } from '@/shared/components/ui/icon/icon';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        @for (notification of notificationService.notifications$(); track notification.id) {
        <div
          class="pointer-events-auto w-full max-w-sm rounded-lg bg-base-100 shadow-xs outline-1 -outline-offset-1 outline-base-foreground-200/10"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                @if (notification.type === 'error') {
                <app-icon
                  name="{{ notification.icon || 'error' }}"
                  [fill]="0"
                  [fontSize]="20"
                  customClass="text-red-500"
                />
                } @else if (notification.type === 'success') {
                <app-icon
                  name="{{ notification.icon || 'check_circle' }}"
                  [fill]="0"
                  [fontSize]="20"
                  customClass="text-green-500"
                />
                } @else if (notification.type === 'message') {
                <app-icon
                  name="{{ notification.icon || 'info' }}"
                  [fill]="0"
                  [fontSize]="20"
                  customClass="text-base-foreground-200"
                />
                } @else {
                <app-icon
                  name="{{ notification.icon || 'info' }}"
                  [fill]="0"
                  [fontSize]="20"
                  customClass="text-blue-500"
                />
                }
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm leading-7 font-medium text-base-foreground-200">
                  {{ notification.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class NotificationComponent {
  constructor(protected notificationService: NotificationService) {}
}
