type CustomOptions<Option> =
  | {
      options: Option[] | null;
      asyncOptions?: never;
      loading?: never;
      onStopTyping?: never;
      debounce?: never;
    }
  | {
      options?: never;
      asyncOptions: Option[] | null;
      loading?: boolean;
      onStopTyping?: (searched: Option) => void;
      debounce?: number;
    };

export type AutocompleteProps<Option> = CustomOptions<Option> & {
  name?: string;
  onSelect?: (opt: Option) => void;
  label?: string;
  placeholder?: string;
  requiredLabel?: boolean;
  width?: string;
  onType?: (opt: string) => void;
  maxWidth?: string;
  showError?: boolean;
  disabled?: boolean;
  maskFunction?: (string: string) => string;
};

export type AutocompleteRef = {
  clearAutocomplete: () => void;
};

export type StyledAutocompleteListProps = {
  zIndex?: number;
  displayWidth: number;
};

export type StyledAutocompleteProps = {
  width?: string;
  maxWidth?: string;
};
