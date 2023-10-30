import { ReactNode } from 'react';

export type StyledPopoverContentProps = {
  zIndex?: number;
};

export type PopoverProps = {
  trigger: ReactNode;
  content: string | ReactNode;
  title?: string;
  className?: string;
  skidding?: number;
  stopPropagation?: boolean;
};
