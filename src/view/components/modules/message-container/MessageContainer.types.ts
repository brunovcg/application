import { ReactNode } from 'react';

export type MessageContainerVariants = 'info' | 'warning' | 'error' | 'valid' | 'question';

export type StyledMessageContainerProps = {
  bold?: boolean;
  width?: string;
  fontSize?: string;
  smallPadding?: boolean;
  maxWidth?: string;
  isSmall: boolean;
};

export type MessageContainerProps = Omit<StyledMessageContainerProps, 'isSmall'> & {
  text: string | ReactNode;
  variant?: MessageContainerVariants;
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
};
