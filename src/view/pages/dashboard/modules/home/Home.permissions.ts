import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useHomePermissions() {
  const { sessionUser } = useContext(UserSessionContext);
  return {
    signatureSolution: sessionUser.permissions.GET_CONTENT,
  };
}
