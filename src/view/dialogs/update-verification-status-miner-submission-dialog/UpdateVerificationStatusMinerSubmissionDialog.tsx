import { useTranslation } from 'react-i18next';
import { Dialog, Section, TextArea, Icon } from '../../components';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { UpdateVerificationStatusMinerSubmissionDialogProps } from './UpdateVerificationStatusMinerSubmissionDialog.types';
import { useContext, useState } from 'react';
import { useTranslationPath } from '../../../utils/hooks';
import StyledUpdateVerificationStatusMinerSubmissionDialog from './UpdateVerificationStatusMinerSubmissionDialog.styled';
import Constants from '../../../utils/constants/Constants';
import { addressQueries } from '../../../apis/queries';
import { Alert } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { DATA_MINER_QA_STATUS } = Constants;
const { useUpdateAddrMotivationMinerSubMutation } = addressQueries;

export default function UpdateVerificationStatusMinerSubmissionDialog({
  newStatus,
  addressData,
  addAssessed,
  handleCancel,
}: UpdateVerificationStatusMinerSubmissionDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UpdateVerificationStatusMinerSubmissionDialog');
  const { closeDialog } = useContext(DialogsContext);
  const [verificationNote, setVerificationNote] = useState('');

  const { id: submissionId, verificationStatus, ownerFirstName, ownerLastName, propertyAddress, propertyCity, propertyState } = addressData;
  const { mutate: updateVerification, isLoading } = useUpdateAddrMotivationMinerSubMutation();

  const content = (
    <StyledUpdateVerificationStatusMinerSubmissionDialog>
      <Section contentClassName="im-dialog-content">
        <div className="im-dialog-row">
          <span className="im-caption">{t(path('SubmissionId'))}</span> {submissionId}
        </div>
        <div className="im-dialog-row">
          <span className="im-caption">{t(path('SubmissionRow'))}</span>
          {` ${ownerFirstName ?? ''} ${ownerLastName ?? ''} • ${propertyAddress ?? ''} • ${propertyState ?? ''}: ${propertyCity ?? ''}`}
        </div>
        <Section sectionTitle={t(path('Changes'))} contentClassName="im-dialog-changes">
          <div className="im-dialog-row-status-current">
            <Icon icon="cancel" />
            {DATA_MINER_QA_STATUS[verificationStatus as keyof typeof DATA_MINER_QA_STATUS] ?? t(path('Pending'))}
          </div>
          <Icon icon="arrowForward" />
          <div className="im-dialog-row-status-new">
            <Icon icon="add" />
            {DATA_MINER_QA_STATUS[newStatus as keyof typeof DATA_MINER_QA_STATUS] ?? t(path('Pending'))}
          </div>
        </Section>
        <TextArea
          label={t(path('VerificationNote'))}
          optionalLabel
          height="100px"
          onChange={(value) => setVerificationNote(value)}
          className="im-dialog-text-area"
          showError={false}
          placeholder={t(path('WriteNote'))}
          initialValue={addressData.verificationNote ?? ''}
        />
      </Section>
    </StyledUpdateVerificationStatusMinerSubmissionDialog>
  );

  const buttons: DialogButtons = [
    {
      icon: 'checkbox',
      text: t('Common.Subscribe'),
      loading: isLoading,
      onClick: () => {
        updateVerification({
          submissionId,
          payload: {
            verificationNote,
            verificationStatus: newStatus,
          },
          successCallback: () => {
            Alert.info(t(path('SuccessMessage'), { submissionId }));
            addAssessed({ ...addressData, verificationStatus: newStatus, verificationNote: verificationNote });
            closeDialog('UpdateVerificationStatusMinerSubmissionDialog');
          },
          errorCallback: () => Alert.error(t(path('Error'))),
        });
      },
    },
  ];

  return (
    <Dialog
      dialogId="UpdateVerificationStatusMinerSubmissionDialog"
      content={content}
      title={t(path('Title'))}
      buttons={buttons}
      width="600px"
      onCancel={handleCancel}
    />
  );
}
