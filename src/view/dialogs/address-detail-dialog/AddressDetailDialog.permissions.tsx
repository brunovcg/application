import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';

const useAddressDetailDialogPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return { displayPropertyAttributes: !sessionUser?.isCustomer };
};

export default useAddressDetailDialogPermissions;
