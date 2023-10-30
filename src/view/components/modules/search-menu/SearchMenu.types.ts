export type StyledSearchMenuProps = {
  maxWidth?: string;
  width?: string;
  optionsHeight?: string;
  optionsMaxHeight?: string;
  disabled?: boolean;
  zIndex: number;
  displayWidth: number;
};

export type SearchMenuProps<Option extends object> = Omit<StyledSearchMenuProps, 'zIndex' | 'displayWidth'> & {
  label?: string;
  placeholder?: string;
  options: Option[];
  displayAccessor: keyof Option;
  contentAccessor: keyof Option;
  onOptionClick: (value: Option) => void;
  className?: string;
  debounce?: number;
  searchFunction?: (option: Option, typedSearch: string) => boolean;
};
