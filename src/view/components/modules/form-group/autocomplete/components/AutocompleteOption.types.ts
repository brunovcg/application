export type AutoCompleteOptionProps<Option> = {
  onSelect?: (opt: Option) => void;
  opt: Option;
  autocompleteValue: Option;
  handleOptionClick: (opt: Option) => void;
};
