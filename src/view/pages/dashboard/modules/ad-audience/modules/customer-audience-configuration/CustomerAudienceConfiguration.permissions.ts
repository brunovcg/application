import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

const useAudienceConfigurationPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    add: sessionUser.permissions.ADD_ADSENSE_CONFIGURATION,
    update: sessionUser.permissions.UPDATE_ADSENSE_CONFIGURATION,
  };
};

export default useAudienceConfigurationPermissions;
