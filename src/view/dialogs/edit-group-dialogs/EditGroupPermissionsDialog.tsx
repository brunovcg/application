import { useTranslation } from 'react-i18next';
import { AddRemoveList, MessageContainer, Section, UserFeedback, UserTypeChip, Dialog } from '../../components';
import { EditGroupDialogProps, GroupPayload } from './EditGroupDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import { groupsQueries, permissionsQueries } from '../../../apis/queries';
import { useContext, useState } from 'react';
import StyledEditGroupPermissionsDialog from './EditGroupDialog.styled';
import { IMPermission } from '../../../apis/services/permissions-services/Permissions.services.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { Alert } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useGroupQuery, useUpdateGroupPermissionsMutation } = groupsQueries;
const { useListPermissionsQuery } = permissionsQueries;

export default function EditGroupPermissionsDialog({ groupId, groupName, userType }: EditGroupDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.EditGroupDialog');
  const { closeDialog } = useContext(DialogsContext);
  const { mutate } = useUpdateGroupPermissionsMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modification, setModification] = useState(false);
  const { group, groupIsLoading } = useGroupQuery(groupId);
  const { permissionList, permissionListLoading, permissionsIsSuccess } = useListPermissionsQuery();

  const [groupPermissionsPayload, setGroupPermissionsPayload] = useState<GroupPayload<(typeof permissionList)[number]>>({
    submitList: [],
    updatedAvailableList: [],
  });

  const isLoadingData = groupIsLoading || permissionListLoading;
  const hasData = !!group?.name && !isLoadingData;

  const content = (
    <StyledEditGroupPermissionsDialog>
      {hasData && (
        <Section
          className="im-edit-group-dialog"
          width="100%"
          sectionTitle={groupName}
          icon="form"
          description={<UserTypeChip userType={userType} />}
        >
          <MessageContainer
            className="im-edit-group-dialog-message"
            text={t(path('MessagePermissions'))}
            width="fit-content"
            fontSize="medium"
            variant="info"
          />
          <AddRemoveList
            availableList={permissionList as unknown as IMPermission[]}
            currentList={group?.permissions as IMPermission[]}
            onChange={(value) => setGroupPermissionsPayload(value)}
            accessor="name"
            enabled={permissionsIsSuccess}
            listTitle={t(path('Permissions'))}
            instance={group?.name}
            disabled={isSubmitting}
            onModification={(value) => setModification(value)}
          />
        </Section>
      )}
      {isLoadingData && <UserFeedback variant="loading" />}
    </StyledEditGroupPermissionsDialog>
  );

  const buttons: DialogButtons = [
    {
      hide: !modification,
      type: 'submit',
      text: t(path('SubmitPermissions')),
      icon: 'done',
      loading: isSubmitting,
      onClick: () => {
        setIsSubmitting(true);
        mutate({
          payload: { id: groupId, permissionsIds: groupPermissionsPayload.submitList.map((item) => item.id) },
          onSuccess: () => {
            closeDialog('EditGroupPermissionsDialog');
            Alert.info(t(path('PermissionsSubmissionsSuccess')));
          },
          onComplete: () => {
            setIsSubmitting(false);
          },
        });
      },
    },
  ];

  return (
    <Dialog
      dialogId="EditGroupPermissionsDialog"
      content={content}
      closeOnOutsideClick={false}
      width="1000px"
      title={t(path('EditGroupPermissions'))}
      buttons={buttons}
    />
  );
}
