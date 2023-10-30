import { useTranslation } from 'react-i18next';
import { Dialog, Section, UpdatePassword } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import StyledAccountSecurityDialog from './AccountSecurityDialog.styled';
import { useContext, useEffect, useRef, useState } from 'react';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { AccountSecurityDialogProps } from './AccountSecurityDialog.types';
import MessageContainer from '../../components/modules/message-container/MessageContainer';
import { PasswordServices } from '../../../apis/services';
import { UpdatePasswordRef } from '../../components/modules/update-password/UpdatePassword.types';
import { Alert } from '../../../utils/helpers';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

export default function AccountSecurityDialog({ force, expired }: AccountSecurityDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.AccountSecurityDialog');
  const { signOut, setIsSessionBlocked } = useContext(UserSessionContext);
  const { closeDialog } = useContext(DialogsContext);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (payload: { password: string }, forbiddenPasswordHandler: () => void) => {
    setIsLoading(true);
    PasswordServices.updateForCurrentUser({
      payload,
      forbiddenPasswordHandler,
      onSuccess: () => {
        closeDialog('AccountSecurityDialog');
        setIsSessionBlocked(false);
        Alert.info(t(path('Success')));
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });

    if (force) {
      setIsSessionBlocked(false);
    }
  };

  const formRef = useRef<UpdatePasswordRef>(null);

  const content = (
    <Section width="100%" sectionTitle={t(path('Form'))} icon="password">
      <StyledAccountSecurityDialog className="im-account-security">
        {expired && <MessageContainer text={t(path('MessageExpired'))} fontSize="medium" variant="warning" />}
        <UpdatePassword onSubmit={onSubmit} ref={formRef} />
      </StyledAccountSecurityDialog>
    </Section>
  );

  const buttons: DialogButtons = [
    {
      type: 'submit',
      text: t('Common.Submit'),
      icon: 'done',
      disabled: isLoading,
      loading: isLoading,
      onClick: () => {
        formRef.current?.submit();
      },
    },
    {
      text: t('Common.Logout'),
      variant: 'error',
      icon: 'cancel',
      disabled: isLoading,
      onClick: () => {
        signOut();
        closeDialog('AccountSecurityDialog');
      },
      hide: !force,
    },
  ];

  useEffect(() => {
    if (force) {
      setIsSessionBlocked(true);
    }
  }, []);

  return (
    <Dialog
      dialogId="AccountSecurityDialog"
      title={t(path('Title'))}
      content={content}
      width="450px"
      buttons={buttons}
      closeOnOutsideClick={false}
      defaultCloseButton={!force}
      defaultCloseIcon={!force}
    />
  );
}
