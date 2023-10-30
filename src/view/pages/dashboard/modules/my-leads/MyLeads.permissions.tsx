import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useMyLeadsPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    addDrivingForDollars: sessionUser.permissions.ADD_ADDRESS_MOTIVATION,
    stopMailing: sessionUser.permissions.STOP_ADDRESS_MAILING,
    onlySkipTracing: sessionUser.permissions.STOP_ADDRESS_MAILING,
  };
}
