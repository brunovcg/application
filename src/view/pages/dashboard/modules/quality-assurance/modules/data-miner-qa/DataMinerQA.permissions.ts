import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

const useDataMinerQAPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    permitUpdateVerificationStatus: sessionUser?.permissions?.UPDATE_ADDRESS_MOTIVATION_MINER_SUBMISSIONS,
  };
};

export default useDataMinerQAPermissions;
