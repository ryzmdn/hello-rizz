import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@/shared/components/ui/icon/icon';
import { ButtonComponent } from '@/shared/components/ui/button/button';

@Component({
  selector: 'app-button-greetings',
  imports: [FormsModule, IconComponent, ButtonComponent],
  standalone: true,
  template: `
    <button ui-button size="lg" (click)="openNameDialog()" class="w-full">
      <app-icon name="waving_hand" [fill]="0" [fontSize]="20" />
      Greetings
    </button>

    @if (isDialogOpen()) {
    <div
      (click)="closeNameDialog()"
      class="fixed inset-0 z-50 flex items-center justify-center bg-base-50/10 backdrop-blur-md"
    >
      <div (click)="$event.stopPropagation()" class="relative bg-base-100 shadow-sm sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-base font-semibold text-base-foreground-200">What is your name?</h3>
          <div class="mt-2 max-w-xl text-sm text-base-500">
            <p>Enter your name to receive a personalized greeting.</p>
          </div>
          <div class="mt-5 sm:flex sm:items-center sm:gap-x-3">
            <div class="w-full sm:max-w-xs">
              <input
                id="name"
                name="name"
                placeholder="e.g, John Doe"
                aria-label="Name"
                [(ngModel)]="userInputName"
                (keyup.enter)="submitName()"
                maxlength="50"
                class="block w-full rounded-md bg-base-50 px-3 py-1.5 text-base text-base-foreground-100 outline-1 -outline-offset-1 outline-base-200 placeholder:text-base-400 focus:outline-2 focus:-outline-offset-2 focus:outline-base-foreground-200 sm:text-sm/6"
              />
            </div>
            <button ui-button (click)="submitName()" [disabled]="!userInputName.trim()">
              Submit
            </button>
          </div>
        </div>

        <button ui-button variant="ghost" size="icon-sm" (click)="closeNameDialog()" class="absolute top-3 right-3">
          <app-icon name="close" [fill]="0" [fontSize]="18" />
        </button>
      </div>
    </div>
    }
    
    @if (greetings()) {
    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <div
          class="pointer-events-auto w-full max-w-sm translate-y-0 transform rounded-lg bg-base-100 opacity-100 shadow-xs outline-1 -outline-offset-1 outline-base-foreground-200/10 sm:translate-x-0"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <app-icon
                  name="waving_hand"
                  [fill]="0"
                  [fontSize]="20"
                  class="text-base-foreground-200"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-base leading-7 capitalize font-medium text-base-foreground-200">
                  Hello {{ greetings() }}!
                </p>
                <p class="mt-1 text-sm text-base-foreground-400">
                  Thank you for visiting this bio link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class ButtonGreetings {
  protected readonly isDialogOpen = signal<boolean>(false);
  protected readonly greetings = signal<string>('');
  protected userInputName: string = '';

  openNameDialog(): void {
    this.isDialogOpen.set(true);
    this.userInputName = '';
  }

  closeNameDialog(): void {
    this.isDialogOpen.set(false);
    this.userInputName = '';
  }

  submitName(): void {
    if (!this.userInputName.trim()) return;

    const words = this.userInputName.trim().split(/\s+/);
    const name = words.slice(0, 2).join(' ');

    this.greetings.set(name);
    this.closeNameDialog();

    setTimeout(() => {
      this.greetings.set('');
    }, 5000);
  }
}
