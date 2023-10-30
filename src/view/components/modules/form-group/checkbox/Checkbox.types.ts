import { ChangeEvent } from 'react';

export type StyledCheckboxProps = {
  selected: boolean;
  hasLabel: boolean;
};

export type CheckboxProps = {
  label?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (selected: boolean) => void;
  dataTestId?: string;
};
