import { useTranslation } from 'react-i18next';
import { Container, LoginForm, MessageContainer, Title, Dialog } from '../../components';
import { RenewSessionDialogProps } from './RenewSessionDialog.types';
import useTranslationPath from '../../../utils/hooks/modules/useTranslationPath';
import './RenewSessionDialog.scss';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useContext } from 'react';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

export default function RenewSessionDialog({ onCancel, onSuccess }: RenewSessionDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.RenewSessionDialog');
  const { dialogSubscriptions } = useContext(DialogsContext);

  const { buttonsPortal } = dialogSubscriptions?.RenewSessionDialog ?? {};

  const content = (
    <Container className="im-renew-session-dialog-content">
      <Title text={t(path('FormTitle'))} icon="form" />
      <MessageContainer className="im-renew-session-dialog-message" variant="warning" text={t(path('FormMessage'))} fontSize="medium" />
      <LoginForm onSubmitSuccess={onSuccess} buttonsPortal={buttonsPortal} />
    </Container>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Logout'),
      icon: 'logout',
      variant: 'error',
      onClick: onCancel,
    },
  ];

  return (
    <Dialog
      dialogId="RenewSessionDialog"
      content={content}
      title={t(path('Title'))}
      defaultCloseButton={false}
      defaultCloseIcon={false}
      closeOnOutsideClick={false}
      buttons={buttons}
      useButtonsPortal
    />
  );
}
