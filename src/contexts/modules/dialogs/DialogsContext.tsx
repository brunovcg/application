import { ComponentType, Fragment, ReactNode, createContext, useMemo, useState } from 'react';
import { DialogContextProps, DialogSubscriptions, OpenArgs } from './DialogContext.types';
import { DOMHelper } from '../../../utils/helpers';
import { DialogId } from '../../../view/dialogs/types';
import { dialogs } from '../../../view/dialogs';
import { Wrapper, Portal } from '../../../view/components';
import { AttributesOptionalChildren } from '../../../view/components/modules/wrapper/Wrapper.types';

export const DialogsContext = createContext<DialogContextProps>({
  openDialog: () => {},
  closeDialog: () => {},
  dialogSubscriptions: {},
});

export default function DialogsProvider({ children }: { children: ReactNode }) {
  const [dialogSubscriptions, setDialogSubscriptions] = useState<DialogSubscriptions>({} as DialogSubscriptions);

  const subscribedDialogsRenderer = Object.keys(dialogSubscriptions).map((dialogKey) => (
    <Fragment key={dialogKey}>{dialogSubscriptions[`${dialogKey}`].component}</Fragment>
  ));

  const openDialog = <ComponentProps extends AttributesOptionalChildren, CurrentDialogId extends DialogId>({
    id,
    props,
  }: OpenArgs<CurrentDialogId>) => {
    const zIndex = DOMHelper.windowNextZIndex();
    const dialogComponent = dialogs[id as keyof typeof dialogs];

    setDialogSubscriptions((state) => ({
      ...state,
      [id]: {
        id,
        component: (
          <Wrapper component={dialogComponent as unknown as ComponentType<ComponentProps>} props={props as unknown as ComponentProps}>
            {' '}
          </Wrapper>
        ),
        zIndex: zIndex,
        buttonsPortal: `im-buttons-portal-${id}`,
      },
    }));
  };

  const closeDialog = (id: DialogId) => {
    setDialogSubscriptions((state) => {
      Reflect.deleteProperty(state, id);
      return { ...state };
    });
  };

  const dialogsRenderPortal = <Portal element={subscribedDialogsRenderer} targetId={'im-app-dialog-root'} />;

  const providerValue = useMemo(() => ({ closeDialog, openDialog, dialogSubscriptions }), [closeDialog, openDialog, dialogSubscriptions]);

  return (
    <DialogsContext.Provider value={providerValue}>
      {children}
      {dialogsRenderPortal}
    </DialogsContext.Provider>
  );
}
