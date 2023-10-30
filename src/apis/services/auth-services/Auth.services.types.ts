import Constants from '../../../utils/constants/Constants';
import { USState } from '../states-services/States.services.types';
import { UserType } from '../user-services/User.services.types';

export type SignInPayload = { username: string; password: string };

const { HTTP_STATUS } = Constants;

export type SignInArgs<ImLoginResponse> = {
  payload: SignInPayload;
  onSuccess: (res: ImLoginResponse) => void;
  onError: (e: unknown) => void;
  onComplete: () => void;
  errorHandling: { code: (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]; handler: () => void }[];
};

export type ImLoginResponse = {
  admin: boolean;
  city?: string;
  id: number;
  jwt: string;
  name: string;
  phone?: string;
  roles: { id: number; name: string }[];
  state?: USState;
  streetName?: string;
  userType: UserType;
  username: string;
  zipCode?: string;
  usingDefaultPassword: boolean;
};

export type SquidexLoginResponse = {
  token: string;
};

export type ValidateStoredTokenArgs = {
  token: string;
  expiredTokenCallback: () => void;
  onSuccess: (res: ImLoginResponse) => void;
  onError: (e: unknown) => void;
  onComplete: () => void;
};
