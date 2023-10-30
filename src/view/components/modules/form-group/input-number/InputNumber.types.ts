export type StyledInputProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  flex?: string;
};

type ConditionalValid =
  | { valid?: never; validIfChanged?: boolean }
  | { valid?: boolean | ((inputValue?: string | number) => boolean); validIfChanged?: never };

type ConditionalInputUse =
  | {
      name: string;
      onSearch?: never;
      onChange?: never;
    }
  | {
      name?: never;
      onSearch?: (inputValue?: number) => void;
      onChange?: (inputValue?: number) => void;
    };

export type InputNumberProps = StyledInputProps &
  ConditionalInputUse &
  ConditionalValid & {
    onBlur?: (inputValue?: number) => void;
    onFocus?: (inputValue?: number) => void;
    max?: number;
    min?: number;
    allowReset?: boolean;
    initialValue?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    optionalLabel?: boolean;
    requiredLabel?: boolean;
    allowClear?: boolean;
    value?: string;
    showError?: boolean;
    showArrows?: boolean;
    dataTestId?: string;
    step?: number;
    testInstance?: string;
    percent?: boolean;
  };

export type InputNumberRef = {
  resetInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  clearInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
