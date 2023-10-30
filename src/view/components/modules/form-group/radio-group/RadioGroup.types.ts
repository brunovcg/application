import { RadioProps } from '../radio/Radio.types';

export type StyledRadioGroupProps = {
  maxWidth?: string;
  width?: string;
  row?: boolean;
  center?: boolean;
};

export type RadioGroupRef = {
  resetRadioGroup: () => void;
};

export type RadioOption = RadioProps & {
  id: number | string | boolean;
};

export type RadioGroupProps = StyledRadioGroupProps & {
  label?: string;
  options: RadioOption[];
  name?: string;
  onChange?: (output: RadioOption) => void;
  disabled?: boolean;
  requiredLabel?: boolean;
  showError?: boolean;
  radio?: boolean;
  className?: string;
  accessor?: string;
  headerEqualizer?: boolean;
};
