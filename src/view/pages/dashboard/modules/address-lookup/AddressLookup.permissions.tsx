import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useAddressLookupPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    linkInbound: sessionUser.permissions.CREATE_INBOUND_CALL_SCORE,
    addMotivation: sessionUser.permissions.ADD_ADDRESS_MOTIVATION,
  };
}
