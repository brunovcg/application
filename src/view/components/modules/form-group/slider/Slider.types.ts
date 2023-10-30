import { Dispatch, SetStateAction, MouseEvent } from 'react';

type CustomAvailableSum =
  | {
      setAvailableSum: Dispatch<SetStateAction<number>>;
      maxSum: number;
      availableSum: number;
    }
  | {
      setAvailableSum?: never;
      maxSum?: never;
      availableSum?: never;
    };

export type SliderProps = CustomAvailableSum & {
  label?: string;
  max: number;
  min: number;
  valid?: boolean | ((inputValid: string | number) => boolean);
  disabled?: boolean;
  value?: number;
  step?: number;
  width?: string;
  name?: string;
  onChange?: (value: number) => void;
  onReset?: (value: number) => void;
  showCaption?: boolean;
  initialValue?: number;
  requiredLabel?: boolean;
  showError?: boolean;
  testInstance?: string;
  inputWidth?: string;
  showInputArrows?: boolean;
  percent?: boolean;
};

export type StyledSliderProps = {
  valueDisplaySize: string;
  footerWidth?: string;
  width?: string;
};

export type SliderForwardedRef = {
  resetSlider: (e: MouseEvent<HTMLButtonElement>) => void;
};
