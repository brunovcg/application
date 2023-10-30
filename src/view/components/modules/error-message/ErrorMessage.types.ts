export type StyledErrorMessageProps = {
  width?: string;
  margin?: string;
};

export type ErrorMessageProps = StyledErrorMessageProps & {
  error?: string;
  className?: string;
  hide?: boolean;
};
