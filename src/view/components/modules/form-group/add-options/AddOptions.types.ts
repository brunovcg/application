export type AddOptionsProps = {
  label: string;
  name: string;
  width?: string;
  maxHeight?: string;
  initialState?: string[];
  onChange?: (options: string[]) => void;
  disabled?: boolean;
  showError?: boolean;
};

export type StyledAddOptionsProps = {
  width: string;
  maxHeight?: string;
};
