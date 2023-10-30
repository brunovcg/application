import { OpenArgs } from '../../../contexts/modules/dialogs/DialogContext.types';
import { DialogId } from '../../../view/dialogs/types';
import Constants from '../../constants/Constants';

const { OPEN_DIALOG, CLOSE_DIALOG } = Constants.EVENTS;

abstract class DialogEvent {
  static open<CurrentDialogId extends DialogId>(args: OpenArgs<CurrentDialogId>) {
    const event = new CustomEvent(OPEN_DIALOG, { detail: args });

    document.dispatchEvent(event);
  }

  static close(dialogId: DialogId) {
    const event = new CustomEvent(CLOSE_DIALOG, { detail: dialogId });

    document.dispatchEvent(event);
  }
}

export default DialogEvent;
