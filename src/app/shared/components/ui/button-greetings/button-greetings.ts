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
      class="fixed inset-0 z-50 flex items-center justify-center bg-base-50/10 backdrop-blur-md"
      (click)="closeNameDialog()"
    >
      <div
        class="relative bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-sm mx-4"
      >
        <h2 class="text-xl font-bold text-base-foreground-100 mb-4">What is your name?</h2>
        <input
          [(ngModel)]="userInputName"
          (keyup.enter)="submitName()"
          placeholder="e.g. John Doe"
          maxlength="50"
          class="w-full px-3 py-2 border border-base-200 rounded-md bg-base-50 text-base-foreground-100 placeholder-base-foreground-400 focus:outline-none focus:ring-2 focus:ring-bright-blue mb-6"
        />
        <div class="flex gap-x-2 justify-end">
          <button ui-button variant="destructive" (click)="closeNameDialog()">Cancel</button>
          <button ui-button (click)="submitName()" [disabled]="!userInputName.trim()">
            Submit
          </button>
        </div>

        <button type="button" (click)="$event.stopPropagation()" class="absolute inset-0" hidden>Stop Propagation</button>
      </div>
    </div>
    } @if (greetings()) {
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
                <div class="flex justify-between items-center">
                  <p class="text-base leading-7 capitalize font-medium text-base-foreground-200">
                    Hello {{ greetings() }}!
                  </p>

                  <div class="ml-4 flex shrink-0">
                    <button ui-button variant="ghost" size="icon-sm" (click)="closeNameDialog()">
                      <app-icon name="close" [fill]="0" [fontSize]="18" />
                    </button>
                  </div>
                </div>
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

    // Limit to 2 words maximum
    const words = this.userInputName.trim().split(/\s+/);
    const name = words.slice(0, 2).join(' ');

    this.greetings.set(name);
    this.closeNameDialog();

    setTimeout(() => {
      this.greetings.set('');
    }, 5000);
  }
}
