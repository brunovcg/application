import { useContext } from 'react';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const useProcessRunnerPermissions = () => {
  const { sessionUser } = useContext(UserSessionContext);

  return {
    generatePostCards: sessionUser?.permissions?.GENERATE_POST_CARDS,
    processStatus: sessionUser?.permissions?.LIST_PROCESS_HIST,
    generateSkipTraceRequest: sessionUser?.permissions?.GENERATE_SKIP_TRACE_REQUESTS,
    defaultParameters: sessionUser?.permissions?.GET_PARAMETERS,
  };
};

export default useProcessRunnerPermissions;
