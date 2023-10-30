import { useRenewSession } from '../utils/hooks';
import useDialogEvent from './dialog-event/useDialogEvent';
import useTokenLogin from './token-login/useTokenLogin';
import useValidateBrowser from './validate-browser/useValidateBrowser';

export default function useStart() {
  useTokenLogin();
  useRenewSession();
  useValidateBrowser();
  useDialogEvent();
}
