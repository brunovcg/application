import { ReactNode } from 'react';
import { ButtonProps } from '../button/Button.types';

import { DialogId } from '../../../dialogs/types';

export type StyledDialogProps = {
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  zIndex?: number;
  hasTitle: boolean;
};

type DialogButtonsConditional = { hide?: boolean; show?: never } | { hide?: never; show?: boolean };

export type DialogButtons = (ButtonProps & DialogButtonsConditional)[];

export type DialogProps = Omit<StyledDialogProps, 'zIndex' | 'hasTitle'> & {
  content: string | ReactNode;
  title?: string | ReactNode;
  buttons?: DialogButtons;
  closeOnOutsideClick?: boolean;
  defaultCloseButton?: boolean;
  defaultCloseIcon?: boolean;
  useButtonsPortal?: boolean;
  dialogId: DialogId;
  onCancel?: () => void;
};
