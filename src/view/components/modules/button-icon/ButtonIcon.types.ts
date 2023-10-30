import { ColorsVariant, WithPrefix } from '../../../../types';
import { IconSize, IconName, IconWeight } from '../icon/Icon.types';

export type StyledButtonIconProps = {
  variant: ColorsVariant;
  size?: IconSize;
  hide?: boolean;
  showBorder?: boolean;
  disabled?: boolean;
  inverted?: boolean;
};

export type ButtonIconProps = Omit<StyledButtonIconProps, 'variant'> & {
  variant?: ColorsVariant;
  icon: IconName;
  iconWeight?: IconWeight;
  label?: string;
  margin?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: WithPrefix<'http'>;
  notifications?: number;
  error?: boolean;
  notificationMargin?: string;
  disabled?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  dataTestId?: string;
};
