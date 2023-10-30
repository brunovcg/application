import { ReactNode } from 'react';
import { ColorsVariant } from '../../../../types';

export type ChipSize = 'small' | 'medium' | 'large';

export type StyledChipProps = {
  variant?: ColorsVariant;
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: ChipSize;
  maxWidth?: string;
  centered?: boolean;
};

export type ChipProps = StyledChipProps & {
  text: string | ReactNode;
  onCloseButton?: () => void;
  dataTestId?: string;
};
