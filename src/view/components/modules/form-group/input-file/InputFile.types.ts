export type StyledInputFileProps = { maxWidth?: string; width?: string };

export type InputFileProps = StyledInputFileProps & {
  name?: string;
  multiple?: boolean;
  label?: string;
  requiredLabel?: string;
  disabled?: boolean;
  accept?: string;
};

export type InputFileRef = {
  resetInputFile: () => void;
};
