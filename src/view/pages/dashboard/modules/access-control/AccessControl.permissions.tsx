import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useAccessControlPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    displayUsersTab: sessionUser.permissions.LIST_USERS_BY_TYPE,
    displayGroupsTab: sessionUser.permissions.LIST_GROUPS_WITH_COUNTS,
  };
}
