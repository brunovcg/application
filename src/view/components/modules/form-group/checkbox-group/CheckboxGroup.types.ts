import { CheckboxProps } from '../checkbox/Checkbox.types';

export type StyledCheckboxGroupProps = {
  maxWidth?: string;
  width?: string;
  row?: boolean;
};

export type CheckboxOption = CheckboxProps & {
  id: number | string | boolean;
};

export type CheckboxGroupProps = StyledCheckboxGroupProps & {
  label?: string;
  options: CheckboxOption[];
  name?: string;
  onChange?: (output: CheckboxOption[]) => void;
  disabled?: boolean;
  requiredLabel?: boolean;
  showError?: boolean;
  radio?: boolean;
};

export type CheckboxGroupRef = {
  clearCheckboxes: () => void;
  resetCheckboxes: () => void;
};
