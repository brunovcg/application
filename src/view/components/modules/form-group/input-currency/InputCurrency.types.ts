import { MouseEvent } from 'react';

export type StyledInputCurrency = {
  width?: string;
};

export type InputCurrencyProps = StyledInputCurrency & {
  label?: string;
  initValue?: string | number;
  onBlur?: (value: string) => void;
  name?: string;
  currency?: 'en-US' | 'pt-BR';
  canReset?: boolean;
  disabled?: boolean;
  optionalLabel?: boolean;
  requiredLabel?: boolean;
  showError?: boolean;
};

export type InputCurrencyRef = {
  resetInputValue: (e?: MouseEvent<HTMLButtonElement>) => void;
  clearInputValue: (e?: MouseEvent<HTMLButtonElement>) => void;
};
