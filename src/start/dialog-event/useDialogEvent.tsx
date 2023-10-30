import { useContext, useEffect } from 'react';
import Constants from '../../utils/constants/Constants';
import { DialogsContext } from '../../contexts/modules/dialogs/DialogsContext';
import { DialogId } from '../../view/dialogs/types';
import { OpenArgs } from '../../contexts/modules/dialogs/DialogContext.types';

const { OPEN_DIALOG, CLOSE_DIALOG } = Constants.EVENTS;

export default function useDialogEvent() {
  const { openDialog, closeDialog } = useContext(DialogsContext);

  const handleOpen = <CurrentDialogId extends DialogId>(e: { detail: OpenArgs<CurrentDialogId> }) => openDialog(e.detail);

  const handleClose = (id: DialogId) => {
    closeDialog(id);
  };

  useEffect(() => {
    document.addEventListener(OPEN_DIALOG, handleOpen);

    return () => {
      document.removeEventListener(OPEN_DIALOG, handleOpen);
    };
  }, []);

  useEffect(() => {
    document.addEventListener(CLOSE_DIALOG, handleClose);

    return () => {
      document.removeEventListener(CLOSE_DIALOG, handleClose);
    };
  }, []);
}
