import { ReactNode, MouseEvent, FormEvent } from 'react';
import { IconProps, IconName } from '../icon/Icon.types';
import { ColorsVariant, WithPrefix } from '../../../../types';

export const buttonStyling = ['regular', 'outlined', 'text'] as const;

type ConditionalButtonProps = { width?: never; height?: never } | { width?: string; height?: string };

type DefaultIcon = { icon?: never; customIcon?: IconProps } | { icon?: IconName; customIcon?: never };

type DefaultStyledButtonProps = DefaultIcon & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  textNoWrap?: boolean;
  styling?: (typeof buttonStyling)[number];
};

export type StyledButtonProps = DefaultStyledButtonProps & {
  width?: string;
  height?: string;
  small?: boolean;
  flexGrow?: boolean;
  variant: ColorsVariant;
};

export type ButtonProps = DefaultStyledButtonProps &
  ConditionalButtonProps & {
    text: string | ReactNode;
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    onSubmitCapture?: (e?: FormEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    className?: string;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    small?: boolean;
    href?: WithPrefix<'http'>;
    dataTestId?: string;
    usePortal?: string;
    flexGrow?: boolean;
    variant?: ColorsVariant;
  };
