import { Component, Input, computed } from '@angular/core';

export type IconFill = 0 | 1;
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export type IconGrade = -25 | 0 | 200;
export type IconOpticalSize = 18 | 20 | 24 | 40 | 48;
export type IconStyle = 'outlined' | 'rounded' | 'sharp';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span
      [class]="iconClass()"
      aria-hidden="true"
      [style.font-variation-settings]="fontVariationSettings()"
      [style.font-size.px]="fontSize"
      [attr.aria-label]="ariaLabel()"
      [attr.data-icon-style]="style"
    >
      {{ name }}
    </span>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() weight: IconWeight = 400;
  @Input() fill: IconFill = 0;
  @Input() grade: IconGrade = 0;
  @Input() opticalSize: IconOpticalSize = 24;
  @Input() fontSize: number = 24;
  @Input() style: IconStyle = 'outlined';
  @Input() customClass: string = '';

  @Input()
  ariaLabel(): string {
    return this.name.replace(/_/g, ' ');
  }

  fontVariationSettings = computed(() => {
    return [
      `'wght' ${this.weight}`,
      `'FILL' ${this.fill}`,
      `'GRAD' ${this.grade}`,
      `'opsz' ${this.opticalSize}`,
    ].join(', ');
  });

  iconClass = computed(() => {
    const baseClass = `icon-${this.style} align-middle`;
    return this.customClass ? `${baseClass} ${this.customClass}` : baseClass;
  });
}