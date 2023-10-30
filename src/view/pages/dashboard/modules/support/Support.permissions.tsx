import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useSupportPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return { openTicket: sessionUser.permissions.CUSTOMER_SUPPORT };
}
