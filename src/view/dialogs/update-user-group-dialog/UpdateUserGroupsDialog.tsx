import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import StyledUpdateUserGroupsDialog from './UpdateUserGroupsDialog.styled';
import { AddRemoveList, MessageContainer, Section, UserFeedback, UserTypeChip, Dialog } from '../../components';
import { useContext, useState } from 'react';
import { UpdateUsersDialogProps, UserPayload } from './UpdateUserGroupsDialog.types';
import { groupsQueries, userQueries } from '../../../apis/queries';
import { Group } from '../../../apis/services/groups-services/Group.services.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { Alert } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useListGroupsQuery } = groupsQueries;
const { useUserInfoQuery, useUpdateUserGroupsMutation } = userQueries;

export default function UpdateUserGroupsDialog({ userId, username, userType }: UpdateUsersDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { groupsByType, groupsListLoading, groupsListSuccess } = useListGroupsQuery();
  const { userInfo, userInfoLoading } = useUserInfoQuery(userId);
  const { closeDialog } = useContext(DialogsContext);
  const [modification, setModification] = useState(false);
  const path = useTranslationPath('Dialogs.UpdateUserGroupDialog');
  const [userGroupsPayload, setUserGroupsPayload] = useState<UserPayload<Group>>({
    submitList: [],
    updatedAvailableList: [],
  });
  const { mutate } = useUpdateUserGroupsMutation();

  const isLoadingData = groupsListLoading || userInfoLoading;
  const hasData = !!userInfo?.username && !isLoadingData;

  const content = (
    <StyledUpdateUserGroupsDialog>
      {hasData && (
        <Section
          sectionTitle={username}
          className="im-update-user-group-dialog"
          width="100%"
          icon="user"
          description={<UserTypeChip userType={userType} />}
        >
          <MessageContainer
            className="im-update-user-group-dialog-message"
            text={t(path('Message'))}
            width="fit-content"
            fontSize="medium"
            variant="info"
          />
          <AddRemoveList
            availableList={groupsByType?.[`${userType}`] as Group[]}
            currentList={userInfo?.groups as Group[]}
            onChange={(value) => setUserGroupsPayload(value)}
            accessor="name"
            enabled={groupsListSuccess}
            listTitle={t(path('Groups'))}
            instance={username}
            disabled={isSubmitting}
            onModification={(value) => setModification(value)}
          />
        </Section>
      )}
      {isLoadingData && <UserFeedback variant="loading" />}
    </StyledUpdateUserGroupsDialog>
  );

  const buttons: DialogButtons = [
    {
      hide: !modification,
      type: 'submit',
      text: t('Common.Submit'),
      icon: 'done',
      loading: isSubmitting,
      onClick: () => {
        setIsSubmitting(true);
        mutate({
          payload: { id: userId, groupIds: userGroupsPayload.submitList.map((item) => item.id) },
          onSuccess: () => {
            closeDialog('UpdateUserGroupsDialog');
            Alert.info(t(path('GroupSubmissionSuccess')));
          },
          onComplete: () => setIsSubmitting(false),
        });
      },
    },
  ];

  return <Dialog dialogId="UpdateUserGroupsDialog" content={content} title={t(path('UpdateUserGroupsTitle'))} buttons={buttons} />;
}
