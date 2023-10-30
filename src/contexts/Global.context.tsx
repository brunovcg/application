import { GlobalProviderProps } from './Global.context.types';
import UserSessionProvider from './modules/user-session/UserSessionContext';
import DialogsProvider from './modules/dialogs/DialogsContext';

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <UserSessionProvider>
      <DialogsProvider>{children} </DialogsProvider>
    </UserSessionProvider>
  );
}
