import { IconName } from '../icon/Icon.types';
import { ColorsVariant } from '../../../../types';

export type TitleSize = 'small' | 'medium' | 'regular' | 'large' | 'huge';

export type TextAlign = 'left' | 'center' | 'right';

export type StyledTitleProps = {
  size?: TitleSize;
  variant?: ColorsVariant;
  marginBottom?: string;
  align?: TextAlign;
};

export type TitleProps = StyledTitleProps & {
  text: string;
  icon?: IconName;
  className?: string;
  maxCharacters?: number;
};
