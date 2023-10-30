import { ImLoginResponse } from '../../../apis/services/auth-services/Auth.services.types';
import { JWTHelper } from '../../../utils/helpers';
import { AuthServices } from '../../../apis/services';
import { SessionUser, CurrentUserContextProps, CurrentUserProviderProps, UpdateMyAccountPayload } from './UserSessionContext.types';
import { Environment } from '../../../configs';
import { createContext, useMemo, useState } from 'react';
import useNavigation from '../../../utils/hooks/modules/use-navigation/useNavigation';
import { RouteName } from '../../../router/useRoutes.types';
import UserSessionHelper from './UserSession.helper';
import DialogEvent from '../../../utils/events/dialog-event/Dialog.event';

const { setIMAuthToken, cleanStoredSessionData, setSquidexToken, setLastLogin } = JWTHelper;

export const UserSessionContext = createContext<CurrentUserContextProps>({
  sessionUser: UserSessionHelper.initialUser,
  setIsSessionExpired: () => {},
  setIsSessionChecked: () => {},
  signOut: () => {},
  handleLoginSuccess: () => {},
  setIsSessionBlocked: () => {},
  updateSessionUserMyAccount: () => {},
});

export default function UserSessionProvider({ children }: CurrentUserProviderProps) {
  const [sessionUser, setSessionUser] = useState<SessionUser>(UserSessionHelper.getSessionState());

  const { navigate } = useNavigation();

  const handleSquidexToken = async (loggedUserRoles: ImLoginResponse) => {
    if (loggedUserRoles.roles.find((role) => role.name === 'GET_SQUIDEX_TOKEN')) {
      const squidexRes = await AuthServices.loginSquidex(loggedUserRoles.jwt);
      setSessionUser((state) => ({ ...state, squidexJwt: squidexRes?.token }));
      setSquidexToken(squidexRes?.token);
    }
    return null;
  };

  const setIsSessionChecked = (status: boolean) => {
    setSessionUser((state) => ({ ...state, isSessionChecked: status }));
  };

  const handleLogout = () => {
    cleanStoredSessionData();
    setSessionUser(UserSessionHelper.initialUser);
    setIsSessionChecked(true);
  };

  const setIsSessionExpired = (status: boolean) => {
    setSessionUser((state) => ({ ...state, isSessionExpired: status }));
  };

  const signOut = () => {
    if (Environment.mode === 'production') {
      DialogEvent.open({
        props: {
          handleLogout,
        },
        id: 'LogoutDialog',
      });
    } else {
      handleLogout();
      navigate({ routeName: 'login' });
    }
  };

  const handleLoginSuccess = (loginRes: ImLoginResponse, successCallback?: () => void, redirectRouteName?: RouteName) => {
    const loggedUser = UserSessionHelper?.map(loginRes);
    setSessionUser(loggedUser);
    handleSquidexToken(loginRes);
    successCallback?.();
    setLastLogin();
    setIMAuthToken(loginRes.jwt);
    if (redirectRouteName) {
      navigate({ routeName: redirectRouteName });
    }
    if (loginRes.usingDefaultPassword) {
      DialogEvent.open({ id: 'AccountSecurityDialog', props: { expired: true } });
    }
  };

  const setIsSessionBlocked = (status: boolean) => {
    setSessionUser((state) => ({ ...state, isSessionBlocked: status }));
  };

  const updateSessionUserMyAccount = (payload: UpdateMyAccountPayload) => {
    setSessionUser((state) => ({ ...state, ...payload }));
  };

  const providerValues = useMemo(
    () => ({
      sessionUser,
      setIsSessionExpired,
      setIsSessionChecked,
      signOut,
      handleLoginSuccess,
      setIsSessionBlocked,
      updateSessionUserMyAccount,
    }),
    [sessionUser, setIsSessionExpired, setIsSessionChecked, signOut, handleLoginSuccess, setIsSessionBlocked, updateSessionUserMyAccount]
  );

  return <UserSessionContext.Provider value={providerValues}>{children}</UserSessionContext.Provider>;
}
