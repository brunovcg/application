import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

export default function useUsersPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    registerUser: sessionUser.permissions.REGISTER_USER,
    updateStatus: sessionUser.permissions.UPDATE_USER_STATUS,
    updateUserGroups: sessionUser.permissions.UPDATE_USER_GROUPS,
    assignToMarkets: sessionUser.permissions.LIST_CUSTOMER_SUBSCRIPTIONS,
    updateUserData: sessionUser.permissions.UPDATE_USER,
    sendPasswordRecovery: sessionUser.permissions.SEND_RECOVERY_PASSWORD,
  };
}
