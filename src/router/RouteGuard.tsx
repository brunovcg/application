import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentRoute } from './useCurrentRoute';
import { useContext, useMemo } from 'react';
import { LoadingSpinner } from '../view/components';
import { useTranslation } from 'react-i18next';
import { JWTHelper } from '../utils/helpers';
import { UserSessionContext } from '../contexts/modules/user-session/UserSessionContext';

const { getIMToken } = JWTHelper;

export default function RouteGuard() {
  const { currentRoute } = useCurrentRoute();
  const { sessionUser } = useContext(UserSessionContext);
  const { t } = useTranslation();
  const hasToken = !!getIMToken();
  const { fallbackPath, active, permission } = currentRoute ?? {};
  const routePermission = permission === undefined ? true : permission;
  const validRoute = active === undefined ? true : active === true;

  const permittedUser = routePermission && validRoute && sessionUser.isSessionChecked;

  return useMemo(() => {
    if (permittedUser || sessionUser.isSessionExpired) {
      return <Outlet />;
    }

    if (sessionUser.isSessionChecked) {
      return <Navigate to={fallbackPath ?? ''} />;
    }

    if (hasToken) {
      return (
        <div className="im-global-centered im-global-full-size">
          <LoadingSpinner message={t('Routes.CheckingSession')} />
        </div>
      );
    }

    return null;
  }, [permission, validRoute, fallbackPath, sessionUser]);
}
