import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

export default function useMotivationsPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    motivationList: sessionUser.permissions.LIST_MOTIVATIONS,
    motivationSources: sessionUser.permissions.LIST_MOTIVATION_SOURCE,
    motivationsSourceGroups: sessionUser.permissions.LIST_MOTIVATION_SOURCE_GROUPS,
  };
}
