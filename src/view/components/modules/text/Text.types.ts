import { ColorsVariant } from '../../../../types';

export type TextSize = 'tiny' | 'small' | 'medium' | 'large';
export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export type StyledTextProps = {
  height?: string;
  width?: string;
  maxLines?: number;
  align?: TextAlign;
  italic?: boolean;
  bold?: boolean;
  showMore: boolean;
  variant?: ColorsVariant;
};

export type TextProps = Omit<StyledTextProps, 'showMore'> & {
  text: string;
  className?: string;
  size?: TextSize;
  convertLinks?: boolean;
};
