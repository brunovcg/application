import { ReactNode } from 'react';
import { ImLoginResponse } from '../../../apis/services/auth-services/Auth.services.types';
import { UserPermissions } from '../../../apis/services/permissions-services/Permissions.services.types';
import { USState } from '../../../apis/services/states-services/States.services.types';
import { RouteName } from '../../../router/useRoutes.types';

export type UserRoles = string[];

export type SessionUser = {
  username: string;
  name: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isLogged: boolean;
  jwt: string;
  squidexJwt: string;
  permissions: UserPermissions;
  id: number;
  phone?: string;
  city?: string;
  state?: USState;
  streetName?: string;
  zipCode?: string;
  isSessionExpired: boolean;
  isSessionChecked: boolean;
  isSessionBlocked: boolean;
};

export type UpdateMyAccountPayload = {
  name?: string;
  phone?: string;
  city?: string;
  state?: USState;
  streetName?: string;
  zipCode?: string;
};

export type SignInArgs = {
  payload: { username: string; password: string };
  onSuccess?: () => void;
  onComplete: () => void;
};

export type CurrentUserContextProps = {
  sessionUser: SessionUser;
  signOut: () => void;
  setIsSessionExpired: (status: boolean) => void;
  setIsSessionBlocked: (status: boolean) => void;
  updateSessionUserMyAccount: (payload: UpdateMyAccountPayload) => void;
  setIsSessionChecked: (status: boolean) => void;
  handleLoginSuccess: (loginRes: ImLoginResponse, successCallback?: () => void, redirectRouteName?: RouteName) => void;
};

export type CurrentUserProviderProps = { children: ReactNode };
