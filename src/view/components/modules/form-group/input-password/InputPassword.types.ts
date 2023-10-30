export type StyledInputProps = {
  width?: string;
  maxWidth?: string;
  flex?: string;
};

type ConditionalInputUse =
  | {
      name: string;
      onChange?: never;
      onBlur?: never;
    }
  | {
      name?: never;
      onChange?: (inputValue: string) => void;
      onBlur?: (inputValue: string) => void;
    };

export type InputProps = StyledInputProps &
  ConditionalInputUse & {
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    requiredLabel?: boolean;
    allowClear?: boolean;
    valid?: boolean | ((inputValue: string) => boolean);
    showError?: boolean;
    initValue?: string;
    allowReset?: boolean;
    debounce?: number;
    readOnly?: boolean;
  };

export type InputPasswordRef = {
  resetInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  clearInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
