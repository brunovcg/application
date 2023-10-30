export type StyledInputTextProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
};

type ConditionalInputUse =
  | {
      name: string;
      debounce?: never;
      onSearch?: never;
      onChange?: never;
    }
  | {
      name?: never;
      debounce?: number;
      onSearch?: (inputValue: string) => void;
      onChange?: (inputValue: string) => void;
    };

export type InputTextProps = StyledInputTextProps &
  ConditionalInputUse & {
    canReset?: boolean;
    onBlur?: (inputValue: string) => void;
    maxLength?: number;
    initialValue?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    showHeader?: boolean;
    optionalLabel?: boolean;
    requiredLabel?: boolean;
    canClear?: boolean;
    value?: string;
    valid?: boolean | ((inputValue: string) => boolean);
    showError?: boolean;
    maskFunction?: (value: string) => string;
    dataTestId?: string;
    autoComplete?: 'on' | 'off';
    loading?: boolean;
  };

export type InputTextRef = {
  resetInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  clearInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  focus: () => void;
};
