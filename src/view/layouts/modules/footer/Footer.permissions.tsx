import { useContext } from 'react';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';

const useFooterPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return { displayTermsAndCondition: sessionUser?.isCustomer };
};

export default useFooterPermissions;
