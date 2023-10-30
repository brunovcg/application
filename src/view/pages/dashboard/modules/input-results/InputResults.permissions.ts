import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const usePurchasedPropertiesPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    displayTrackingForm: sessionUser?.permissions?.ADD_PURCHASED_PROPERTY,
    displayListProperties: sessionUser?.permissions?.LIST_PURCHASED_PROPERTY,
  };
};

export default usePurchasedPropertiesPermissions;
