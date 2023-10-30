import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useAdAudiencePermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    customerAudienceConfiguration: sessionUser.permissions.LIST_ADSENSE_CONFIGURATION,
    audience: sessionUser.permissions.LIST_AUDIENCE,
  };
}
