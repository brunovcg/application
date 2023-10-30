import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

export default function useCustomerPreferencesFormPermissions() {
  const { sessionUser } = useContext(UserSessionContext);

  return { updatePreferences: sessionUser.permissions.CREATE_CUSTOMER_CHOICES || sessionUser.permissions.SAVE_CUSTOMER_PREFERENCES };
}
