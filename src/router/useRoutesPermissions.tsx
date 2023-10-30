import { useContext, useMemo } from 'react';
import { UserSessionContext } from '../contexts/modules/user-session/UserSessionContext';

export default function useRoutesPermissions() {
  const { sessionUser } = useContext(UserSessionContext);
  const { permissions, isLogged, isCustomer } = sessionUser ?? { permissions: {} };

  return useMemo(
    () => ({
      dashboard: isLogged,
      buyBox: !!permissions.GET_CUSTOMER_PREFERENCES || !!permissions.LIST_CUSTOMER_SUBSCRIPTIONS,
      inputResults: !!permissions.LIST_PURCHASED_PROPERTY,
      myLeads: (!!permissions.SEARCH_ADDRESS_BY_OWNER || !!permissions.READ_PROPERTY_ADDRESSES) && isCustomer,
      support: !!permissions.CUSTOMER_SUPPORT,
      accessControl: !!permissions.LIST_GROUPS_WITH_COUNTS || !!permissions.LIST_USERS_BY_TYPE,
      qualityAssurance: !!permissions.GET_ADDRESS_MOTIVATION_MINER_SUBMISSIONS,
      adAudience: !!permissions.ADD_ADSENSE_CONFIGURATION || !!permissions.LIST_ADSENSE_CONFIGURATION,
      content: !!permissions.GET_SQUIDEX_TOKEN,
      addressLookup:
        !!permissions.TAX_ID_ADDRESS_LOOKUP ||
        !!permissions.PROPERTY_ADDRESS_LOOKUP ||
        !!permissions.MAILING_ADDRESS_LOOKUP ||
        !!permissions.LAST_NAME_ADDRESS_LOOKUP ||
        !!permissions.LAST_NAME_ADDRESS_LOOKUP,
      orders: isCustomer,
      motivations: !!permissions.LIST_MOTIVATIONS,
      processRunner: !!permissions.GENERATE_POST_CARDS,
    }),
    [sessionUser]
  );
}
