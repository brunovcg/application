import { ReactNode, RefObject } from 'react';
import { DialogId } from '../../../view/dialogs/types';
import { dialogs } from '../../../view/dialogs';

export type DialogSubscriptions = { [id: string]: { component: ReactNode; zIndex: number; buttonsPortal: string } };

export type ConditionalProps<CurrentDialogId extends DialogId> = Parameters<(typeof dialogs)[CurrentDialogId]>[number] extends never
  ? { props?: Parameters<(typeof dialogs)[CurrentDialogId]>[number] }
  : { props: Parameters<(typeof dialogs)[CurrentDialogId]>[number] };

export type OpenDialog = <ComponentRef, CurrentDialogId extends DialogId>({
  id,
  props,
}: {
  id: CurrentDialogId;
  ref?: RefObject<ComponentRef>;
} & ConditionalProps<CurrentDialogId>) => void;

export type CloseDialog = (dialogId: DialogId) => void;

export type OpenArgs<CurrentDialogId extends DialogId> = ConditionalProps<CurrentDialogId> & {
  id: CurrentDialogId;
};

export type DialogContextProps = {
  openDialog: OpenDialog;
  closeDialog: CloseDialog;
  dialogSubscriptions: DialogSubscriptions;
};
