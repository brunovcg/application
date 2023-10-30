export type StyledTextAreaProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
};

type ConditionalTextAreaUse =
  | {
      name: string;
      debounce?: never;
      onSearch?: never;
      onChange?: never;
    }
  | {
      name?: never;
      debounce?: number;
      onChange?: (value: string) => void;
    };

export type TextAreaProps = StyledTextAreaProps &
  ConditionalTextAreaUse & {
    maxLength?: number;
    value?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    showHeader?: boolean;
    optionalLabel?: boolean;
    initialValue?: string;
    requiredLabel?: boolean;
    showError?: boolean;
    allowClear?: boolean;
    allowReset?: boolean;
  };

export type TextAreaForwardRef = {
  reset: () => void;
  focus: () => void;
};
