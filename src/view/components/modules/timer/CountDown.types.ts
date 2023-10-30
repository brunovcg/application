import { ColorsVariant } from '../../../../types';

export type CountDownProps = {
  seconds: number;
  timeUpCallback?: () => void;
  blink?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: ColorsVariant;
  label?: string;
};

export type StyledCountDownProps = {
  blink: boolean;
  variant: ColorsVariant;
};
