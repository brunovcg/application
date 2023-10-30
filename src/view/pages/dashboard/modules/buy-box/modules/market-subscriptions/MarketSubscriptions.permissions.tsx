import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

export default function useMarketSubscriptionsPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return { updateSubscriptions: sessionUser.permissions.SAVE_CUSTOMER };
}
