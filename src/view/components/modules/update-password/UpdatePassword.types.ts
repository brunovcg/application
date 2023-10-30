export type UpdatePasswordProps = {
  onSubmit: (payload: { password: string }, forbiddenPasswordHandler: () => void) => void;
};

export type UpdatePasswordRef = {
  submit: () => void;
};
