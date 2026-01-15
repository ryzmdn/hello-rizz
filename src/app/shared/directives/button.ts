import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import {
  ButtonVariant,
  ButtonSize,
  getButtonClasses,
} from '@/shared/components/ui/button/button.config';

@Directive({
  selector: '[uiButton]',
  standalone: true,
})
export class ButtonDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() uiButtonVariant: ButtonVariant = 'default';
  @Input() uiButtonSize: ButtonSize = 'default';
  @Input() uiButtonClass = '';
  @Input() disabled = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyButtonStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uiButtonVariant'] || changes['uiButtonSize'] || changes['uiButtonClass']) {
      this.applyButtonStyles();
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', '');
        this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-disabled', 'true');
      } else {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-disabled');
      }
    }
  }

  ngAfterViewInit(): void {
    const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
    if (tagName !== 'button' && tagName !== 'a') {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
      this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
    }

    this.applyButtonStyles();
  }

  private applyButtonStyles(): void {
    const classes = getButtonClasses(this.uiButtonVariant, this.uiButtonSize, this.uiButtonClass);

    const element = this.elementRef.nativeElement;
    const currentClasses = element.className.split(' ');
    const buttonBaseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'whitespace-nowrap',
      'rounded-md',
      'text-sm',
      'font-medium',
      'transition-all',
    ];

    const filteredClasses = currentClasses.filter(
      (cls: string) => !buttonBaseClasses.some((base) => cls.startsWith(base.split('-')[0]))
    );

    const newClasses = [...filteredClasses, ...classes.split(' ')].filter(Boolean).join(' ');
    this.renderer.setAttribute(element, 'class', newClasses);
    this.renderer.setAttribute(element, 'data-variant', this.uiButtonVariant);
    this.renderer.setAttribute(element, 'data-size', this.uiButtonSize);
    this.renderer.setAttribute(element, 'data-slot', 'button');
  }
}
