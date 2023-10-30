import { useContext, useEffect } from 'react';
import ExpiredTokenRenewSessionEvent from '../../utils/events/ExpiredTokenRenewSession.event';
import { JWTHelper } from '../../utils/helpers';
import { useCurrentRoute } from '../../router/useCurrentRoute';
import { useRoutes } from '../../router/useRoutes';
import { AuthServices } from '../../apis/services';
import { UserSessionContext } from '../../contexts/modules/user-session/UserSessionContext';

const { validLastLoginDate, cleanStoredSessionData, getIMToken } = JWTHelper;

export default function useTokenLogin() {
  const { currentRoute } = useCurrentRoute();
  const { routesPaths } = useRoutes();
  const { setIsSessionChecked, setIsSessionExpired, handleLoginSuccess } = useContext(UserSessionContext);

  useEffect(() => {
    const token = getIMToken();

    const { createPassword, login, forgotPassword } = routesPaths;
    const { path } = currentRoute;

    const routesToCleanTokens = [createPassword, forgotPassword, login];

    const pageRequireCleanStorage = routesToCleanTokens.includes(path);
    const hasExpiredLastLoginTime = !!token && !validLastLoginDate() && path !== login;

    if (pageRequireCleanStorage || hasExpiredLastLoginTime || !token) {
      setIsSessionChecked(true);
      cleanStoredSessionData();
      return;
    }

    if (token) {
      AuthServices.validateStoredToken({
        token,
        expiredTokenCallback: () => {
          if (path === login) {
            setIsSessionChecked(true);
            cleanStoredSessionData();
          } else {
            ExpiredTokenRenewSessionEvent.trigger();
          }
        },
        onSuccess: (res) => {
          if (res?.jwt) {
            handleLoginSuccess(res);
          } else {
            setIsSessionChecked(true);
            setIsSessionExpired(true);
          }
        },
        onError: (e) => {
          console.error(e);
        },
        onComplete: () => {
          setIsSessionChecked(true);
        },
      });
    } else {
      setIsSessionChecked(true);
    }
  }, []);
}
