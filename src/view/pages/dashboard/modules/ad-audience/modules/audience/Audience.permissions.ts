import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

export default function useAudiencePermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return { generateAudience: sessionUser.permissions.CREATE_AUDIENCE };
}
