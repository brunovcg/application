import { useTranslation } from 'react-i18next';
import { MessageContainer, Dialog } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import './SubscribeRedirectGroupsDialog.scss';
import { UserType } from '../../../apis/services/user-services/User.services.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useContext } from 'react';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

export default function SubscribeRedirectGroupsDialog({
  username,
  userId,
  userType,
}: {
  username: string;
  userId: number;
  userType: UserType;
}) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.SubscribeRedirectGroupDialog');
  const { openDialog, closeDialog } = useContext(DialogsContext);

  const content = <MessageContainer text={t(path('SubscribeToGroups'), { username })} variant="question" fontSize="large" />;
  const buttons: DialogButtons = [
    {
      icon: 'add',
      text: t('Common.Subscribe'),
      onClick: () => {
        closeDialog('SubscribeRedirectGroupsDialog');
        openDialog({
          id: 'UpdateUserGroupsDialog',
          props: {
            username,
            userType,
            userId,
          },
        });
      },
    },
  ];

  return <Dialog dialogId="SubscribeRedirectGroupsDialog" content={content} title={t(path('SubscribeToGroupsTitle'))} buttons={buttons} />;
}
