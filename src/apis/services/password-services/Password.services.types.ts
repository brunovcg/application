export type ForgotPasswordChangeArgs = {
  password: string;
  opaqueToken: string;
  onSuccess: () => void;
  onComplete: () => void;
  forbiddenPasswordHandler: () => void;
};

export type ForgotPasswordChangePayload = {
  password: string;
};

export type SendForgotPasswordEmailArgs = { username: string; onSuccess: () => void };

export type ForgotPasswordSendEmailPayload = {
  username: string;
};

export type ValidateOpaqueTokenArgs = {
  token: string;
  onSuccess: () => void;
  onError: () => void;
  onComplete: () => void;
};

export type UpdateOwnPasswordPayload = {
  password: string;
};

export type UpdateOwnPasswordArgs = {
  payload: UpdateOwnPasswordPayload;
  onSuccess?: () => void;
  onError?: () => void;
  onComplete?: () => void;
  forbiddenPasswordHandler: () => void;
};
