import type { ComponentProps, FC, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 text-center cursor-pointer outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      visualType: {
        solid: 'border text-neutral-50',
        outline: 'border bg-transparent',
        link: 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 enabled:hover:after:origin-bottom-left enabled:hover:after:scale-x-100',
        plain: '',
      },
      color: {
        neutral: '',
        primary: '',
        secondary: '',
        warning: '',
        error: '',
      },
      size: {
        small: 'rounded text-sm',
        medium: 'rounded-md text-base',
      },
      isFullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      needPadding: {
        true: '',
      },
    },
    compoundVariants: [
      // Solid Buttons
      {
        visualType: 'solid',
        color: 'neutral',
        className:
          'border-neutral-600 bg-neutral-600 focus:border-neutral-500 focus:bg-neutral-500 enabled:hover:border-neutral-500 enabled:hover:bg-neutral-500 enabled:active:border-neutral-400 enabled:active:bg-neutral-400',
      },
      {
        visualType: 'solid',
        color: 'primary',
        className:
          'border-primary-600 bg-primary-600 focus:border-primary-500 focus:bg-primary-500 enabled:hover:border-primary-500 enabled:hover:bg-primary-500 enabled:active:border-primary-400 enabled:active:bg-primary-400',
      },
      {
        visualType: 'solid',
        color: 'secondary',
        className:
          'border-secondary-600 bg-secondary-600 focus:border-secondary-500 focus:bg-secondary-500 enabled:hover:border-secondary-500 enabled:hover:bg-secondary-500 enabled:active:border-secondary-400 enabled:active:bg-secondary-400',
      },
      {
        visualType: 'solid',
        color: 'warning',
        className:
          'border-warning-600 bg-warning-600 focus:border-warning-500 focus:bg-warning-500 enabled:hover:border-warning-500 enabled:hover:bg-warning-500 enabled:active:border-warning-400 enabled:active:bg-warning-400',
      },
      {
        visualType: 'solid',
        color: 'error',
        className:
          'border-error-600 bg-error-600 focus:border-error-500 focus:bg-error-500 enabled:hover:border-error-500 enabled:hover:bg-error-500 enabled:active:border-error-400 enabled:active:bg-error-400',
      },

      // Outline Buttons
      {
        visualType: 'outline',
        color: 'neutral',
        className:
          'border-neutral-500 text-neutral-200 focus:border-neutral-400 focus:bg-neutral-400/10 enabled:hover:bg-neutral-400/10 enabled:active:bg-neutral-300/20',
      },
      {
        visualType: 'outline',
        color: 'primary',
        className:
          'border-primary-500 text-primary-500 focus:border-primary-400 focus:bg-primary-400/10 enabled:hover:bg-primary-400/10 enabled:active:bg-primary-300/20',
      },
      {
        visualType: 'outline',
        color: 'secondary',
        className:
          'border-secondary-500 text-secondary-500 focus:border-secondary-400 focus:bg-secondary-400/10 enabled:hover:bg-secondary-400/10 enabled:active:bg-secondary-300/20',
      },
      {
        visualType: 'outline',
        color: 'warning',
        className:
          'border-warning-500 text-warning-500 focus:border-warning-400 focus:bg-warning-400/10 enabled:hover:bg-warning-400/10 enabled:active:bg-warning-300/20',
      },
      {
        visualType: 'outline',
        color: 'error',
        className:
          'border-error-500 text-error-500 focus:border-error-400 focus:bg-error-400/10 enabled:hover:bg-error-400/10 enabled:active:bg-error-300/20',
      },

      // Link Buttons
      {
        visualType: 'link',
        color: 'neutral',
        className:
          'text-neutral-100 after:bg-neutral-100 focus:text-neutral-50 enabled:hover:text-neutral-50 enabled:active:text-neutral-50',
      },
      {
        visualType: 'link',
        color: 'primary',
        className:
          'text-primary-500 after:bg-primary-400 focus:text-primary-400 enabled:hover:text-primary-300 enabled:active:text-primary-200',
      },
      {
        visualType: 'link',
        color: 'secondary',
        className:
          'text-secondary-500 after:bg-secondary-400 focus:text-secondary-400 enabled:hover:text-secondary-300 enabled:active:text-secondary-200',
      },
      {
        visualType: 'link',
        color: 'warning',
        className:
          'text-warning-500 after:bg-warning-400 focus:text-warning-400 enabled:hover:text-warning-300 enabled:active:text-warning-200',
      },
      {
        visualType: 'link',
        color: 'error',
        className:
          'text-error-500 after:bg-error-400 focus:text-error-400 enabled:hover:text-error-300 enabled:active:text-error-200',
      },

      // Plain Buttons
      {
        visualType: 'plain',
        color: 'neutral',
        className:
          'text-neutral-100 focus:text-neutral-300 enabled:hover:text-neutral-300 enabled:active:text-neutral-400',
      },
      {
        visualType: 'plain',
        color: 'primary',
        className:
          'text-primary-400 focus:text-primary-500 enabled:hover:text-primary-500 enabled:active:text-primary-700',
      },
      {
        visualType: 'plain',
        color: 'secondary',
        className:
          'text-secondary-400 focus:text-secondary-500 enabled:hover:text-secondary-500 enabled:active:text-secondary-700',
      },
      {
        visualType: 'plain',
        color: 'warning',
        className:
          'text-warning-400 focus:text-warning-500 enabled:hover:text-warning-500 enabled:active:text-warning-700',
      },
      {
        visualType: 'plain',
        color: 'error',
        className:
          'text-error-400 focus:text-error-500 enabled:hover:text-error-500 enabled:active:text-error-700',
      },

      // Padding for Sizes
      { size: 'small', needPadding: true, className: 'px-2 py-1.5' },
      {
        size: 'medium',
        needPadding: true,
        className: 'px-2.5 py-2',
      },
    ],
    defaultVariants: {
      visualType: 'solid',
      color: 'primary',
      size: 'medium',
      isFullWidth: false,
      needPadding: true,
    },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
  };

export const Button: FC<ButtonProps> = ({
  // cvaで管理するprops
  visualType,
  color,
  size,
  isFullWidth,
  needPadding,
  // その他のprops
  prefixIcon,
  suffixIcon,
  children,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({
        visualType,
        color,
        size,
        isFullWidth,
        needPadding,
      })}
      {...props}
    >
      {/* アイコンと子の配置ロジックは変更なし */}
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  );
};
