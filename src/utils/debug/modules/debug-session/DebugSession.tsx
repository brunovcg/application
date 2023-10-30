import { useContext } from 'react';
import StyledDebugSession from './DebugSession.styled';
import { JsonViewer } from '../../../../view/components';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';

export default function DebugLoggedUser() {
  const { sessionUser } = useContext(UserSessionContext);

  return (
    <StyledDebugSession className="im-debug-session">
      <JsonViewer json={sessionUser} initStyle="dark" />
    </StyledDebugSession>
  );
}
