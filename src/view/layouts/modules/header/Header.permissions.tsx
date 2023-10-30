import { useContext } from 'react';
import { useCurrentRoute } from '../../../../router/useCurrentRoute';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';

const useHeaderPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);
  const { currentRoute } = useCurrentRoute();

  return {
    displayNavMenu: sessionUser?.permissions.GET_CONTENT && !sessionUser.isSessionBlocked,
    displayAvatarMenu: sessionUser?.isLogged && !sessionUser.isSessionBlocked,
    renderHeader: currentRoute.permission !== undefined,
  };
};

export default useHeaderPermissions;
