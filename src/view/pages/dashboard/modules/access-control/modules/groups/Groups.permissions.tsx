import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

export default function useGroupsPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    updateUsersInGroup: sessionUser.permissions.UPDATE_GROUP_USERS,
    updatePermissions: sessionUser.permissions.UPDATE_GROUP_PERMISSIONS,
  };
}
