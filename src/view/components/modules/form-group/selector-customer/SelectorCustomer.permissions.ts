import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const useSelectorCustomerPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return { selectCustomer: !sessionUser?.isCustomer };
};

export default useSelectorCustomerPermissions;
