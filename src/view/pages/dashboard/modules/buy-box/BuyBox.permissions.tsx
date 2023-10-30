import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const useBuyBoxPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    listMarketSubscriptions: sessionUser.permissions.LIST_CUSTOMER_SUBSCRIPTIONS,
    listCustomerPreferences: sessionUser.permissions.GET_CUSTOMER_PREFERENCES,
  };
};

export default useBuyBoxPermissions;
