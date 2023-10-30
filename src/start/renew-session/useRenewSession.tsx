import { useContext, useEffect } from 'react';
import Constants from '../../utils/constants/Constants';
import { useCurrentRoute } from '../../router/useCurrentRoute';
import { useRoutes } from '../../router/useRoutes';
import { UserSessionContext } from '../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../contexts/modules/dialogs/DialogsContext';

const { RENEW_SESSION } = Constants.EVENTS;

export default function useRenewSession() {
  const { currentRoute } = useCurrentRoute();
  const { routesPaths } = useRoutes();

  const { signOut, setIsSessionExpired } = useContext(UserSessionContext);
  const { openDialog, closeDialog } = useContext(DialogsContext);

  const { login, createPassword, forgotPassword } = routesPaths;

  const ignorePaths = [login, createPassword, forgotPassword];

  const renewSession = () => {
    if (ignorePaths.includes(currentRoute.path)) {
      return;
    }
    setIsSessionExpired(true);
    openDialog({
      id: 'RenewSessionDialog',
      props: {
        onSuccess: () => closeDialog('RenewSessionDialog'),
        onCancel: () => {
          signOut();
          closeDialog('RenewSessionDialog');
        },
      },
    });
  };

  useEffect(() => {
    document.addEventListener(RENEW_SESSION, renewSession);

    return () => {
      document.removeEventListener(RENEW_SESSION, renewSession);
    };
  }, []);
}
