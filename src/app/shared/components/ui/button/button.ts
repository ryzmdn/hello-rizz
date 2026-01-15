import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, ButtonSize, getButtonClasses } from './button.config';

@Component({
  selector: 'button[ui-button], a[ui-button]',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': 'buttonClasses',
    '[attr.data-variant]': 'variant',
    '[attr.data-size]': 'size',
    '[attr.data-slot]': '"button"',
    '[attr.aria-invalid]': 'ariaInvalid',
    '[attr.disabled]': 'disabled || null',
    '[attr.type]': 'type',
    '(click)': 'onClick.emit($event)',
    '(keydown.enter)': 'handleEnter($event)',
    '(keydown.space)': 'handleSpace($event)',
  },
})
export class ButtonComponent implements AfterViewInit, OnChanges {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() class = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaInvalid?: boolean | 'false' | 'true' | 'grammar' | 'spelling';

  @Output() onClick = new EventEmitter<Event>();
  @Output() onEnter = new EventEmitter<KeyboardEvent>();
  @Output() onSpace = new EventEmitter<KeyboardEvent>();

  @ViewChild('buttonRef', { static: false }) buttonRef?: ElementRef<HTMLButtonElement>;

  buttonClasses = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant'] || changes['size'] || changes['class']) {
      this.updateButtonClasses();
    }
  }

  ngAfterViewInit(): void {
    this.updateButtonClasses();
  }

  private updateButtonClasses(): void {
    this.buttonClasses = getButtonClasses(this.variant, this.size, this.class);
  }

  handleEnter(event: Event): void {
    if (!this.disabled) {
      this.onEnter.emit(event as KeyboardEvent);
    }
  }

  handleSpace(event: Event): void {
    event.preventDefault();
    if (!this.disabled) {
      this.onSpace.emit(event as KeyboardEvent);
    }
  }
}
