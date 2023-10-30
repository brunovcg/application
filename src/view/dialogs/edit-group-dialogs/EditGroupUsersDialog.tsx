import { useTranslation } from 'react-i18next';
import { AddRemoveList, MessageContainer, Section, UserFeedback, UserTypeChip, Dialog } from '../../components';
import { EditGroupDialogProps, GroupPayload } from './EditGroupDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import { groupsQueries, userQueries } from '../../../apis/queries';
import { useContext, useState } from 'react';
import StyledEditGroupDialog from './EditGroupDialog.styled';
import { User } from '../../../apis/services/user-services/User.services.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { Alert } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useGroupQuery, useUpdateGroupUsersMutation } = groupsQueries;
const { useListAllUsersQuery } = userQueries;

export default function EditGroupUsersDialog({ groupId, groupName, userType }: EditGroupDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.EditGroupDialog');
  const { closeDialog } = useContext(DialogsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modification, setModification] = useState(false);
  const { mutate } = useUpdateGroupUsersMutation();

  const { group, groupIsLoading } = useGroupQuery(groupId);
  const { usersListLoading, usersByType, userListIsSuccess } = useListAllUsersQuery();

  const [groupUsersPayload, setGroupUsersPayload] = useState<GroupPayload<User>>({
    submitList: [],
    updatedAvailableList: [],
  });

  const isLoadingData = usersListLoading || groupIsLoading;
  const hasData = !!group?.name && !isLoadingData;

  const content = (
    <StyledEditGroupDialog>
      {hasData && (
        <Section
          className="im-edit-group-dialog"
          description={<UserTypeChip userType={userType} />}
          width="100%"
          sectionTitle={groupName}
          icon="form"
        >
          <MessageContainer
            className="im-edit-group-dialog-message"
            text={t(path('MessageUsers'))}
            width="fit-content"
            fontSize="medium"
            variant="info"
          />
          <AddRemoveList
            availableList={usersByType?.Active[`${userType}`] as User[]}
            currentList={group?.users as User[]}
            onChange={(value) => setGroupUsersPayload(value)}
            accessor="username"
            enabled={userListIsSuccess}
            listTitle={t(path('Users'))}
            instance={group?.name}
            disabled={isSubmitting}
            onModification={(value) => setModification(value)}
          />
        </Section>
      )}
      {isLoadingData && <UserFeedback variant="loading" />}
    </StyledEditGroupDialog>
  );

  const buttons: DialogButtons = [
    {
      hide: !modification,
      type: 'submit',
      text: t(path('SubmitUsers')),
      icon: 'done',
      loading: isSubmitting,
      onClick: () => {
        setIsSubmitting(true);
        mutate({
          payload: { id: groupId, usersIds: groupUsersPayload.submitList.map((item) => item.id) },
          onSuccess: () => {
            closeDialog('EditGroupUsersDialog');
            Alert.info(t(path('UserSubmissionSuccess')));
          },
          onComplete: () => setIsSubmitting(false),
        });
      },
    },
  ];

  return (
    <Dialog
      dialogId="EditGroupUsersDialog"
      content={content}
      closeOnOutsideClick={false}
      width="1000px"
      title={t(path('EditGroupUsers'))}
      buttons={buttons}
      useButtonsPortal
    />
  );
}
