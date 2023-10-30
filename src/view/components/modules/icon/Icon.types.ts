import { icons } from './Icon.map';

import { ColorsVariant } from '../../../../types';

export const iconSizes = ['tiny', 'small', 'medium', 'large', 'huge'] as const;

export type IconSize = (typeof iconSizes)[number] | undefined;

export type IconName = keyof typeof icons;

export const iconWeight = ['duotone', 'regular', 'bold', 'thin', 'fill'] as const;

export type IconWeight = (typeof iconWeight)[number];

type ConditionalStyledIconProps = { size?: IconSize; customSize?: never } | { size?: never; customSize?: string };

type DefaultStyledIconProps = {
  margin?: string;
  hoverColor?: ColorsVariant;
  disabled?: boolean;
  error?: boolean;
};

export type StyledIconProps = DefaultStyledIconProps & {
  size?: IconSize;
  customSize?: string;
  variant?: ColorsVariant;
};

export type IconProps = ConditionalStyledIconProps &
  DefaultStyledIconProps & {
    icon: IconName;
    variant?: ColorsVariant;
    className?: string;
    notifications?: number;
    weight?: IconWeight;
    mirrored?: boolean;
  };
