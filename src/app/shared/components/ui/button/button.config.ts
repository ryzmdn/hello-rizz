export type ButtonVariant = 
  | 'default' 
  | 'destructive' 
  | 'outline' 
  | 'secondary' 
  | 'ghost' 
  | 'link';

export type ButtonSize = 
  | 'default' 
  | 'xs' 
  | 'sm' 
  | 'lg' 
  | 'icon' 
  | 'icon-sm' 
  | 'icon-lg';

export interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  
  variants: {
    variant: {
      default: "bg-base-foreground-100 text-base-200 hover:bg-base-foreground-100/90 disabled:bg-base-500",
      destructive: "bg-hot-red text-static-100 hover:bg-hot-red/90 focus-visible:ring-hot-red/20 dark:focus-visible:ring-hot-red/40 dark:bg-hot-red/60",
      outline: "border bg-background shadow-xs hover:bg-base-100 hover:text-base-foreground-100 dark:bg-base-foreground-400/30 dark:border-base-foreground-400 dark:hover:bg-base-foreground-400/50",
      secondary: "bg-base-100 text-base-foreground-200 hover:bg-base-200/80",
      ghost: "text-base-500 hover:bg-base-200 hover:text-base-foreground-200",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "text-sm h-9 px-4 py-2 has-[>svg]:px-3",
      xs: "text-base p-0",
      sm: "text-sm h-8 rounded-md gap-1.5 px-2 has-[>svg]:px-2",
      lg: "text-sm h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  }
};

export function getButtonClasses(variant: ButtonVariant = 'default', size: ButtonSize = 'default', className?: string): string {
  const variantClasses = buttonVariants.variants.variant[variant] || '';
  const sizeClasses = buttonVariants.variants.size[size] || '';
  
  return [
    buttonVariants.base,
    variantClasses,
    sizeClasses,
    className || ''
  ].filter(Boolean).join(' ');
}