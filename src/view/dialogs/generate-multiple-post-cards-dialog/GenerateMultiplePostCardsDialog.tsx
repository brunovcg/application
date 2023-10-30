import { useTranslation } from 'react-i18next';
import { Dialog, LoadingSpinner, Section } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import { postCardsQueries } from '../../../apis/queries';
import { DialogState, GenerateMultiplePostCardsDialogProps } from './GenerateMultiplePostCardsDialog.types';
import { useContext, useEffect, useState } from 'react';
import MessageContainer from '../../components/modules/message-container/MessageContainer';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useGenerateMultiplePostCardsMutation } = postCardsQueries;

export default function GenerateMultiplePostCardsDialog({
  selectedRows,
  byPassRowsIds,
  redirectProcessRunner,
}: GenerateMultiplePostCardsDialogProps) {
  const [dialogState, setDialogState] = useState<DialogState>('loading');
  const { closeDialog } = useContext(DialogsContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.GenerateMultiplePostCardsDialog');

  const { mutate } = useGenerateMultiplePostCardsMutation();
  const content = (
    <Section width="100%">
      {dialogState === 'loading' && <LoadingSpinner message={t(path('Requesting'))} />}
      {dialogState === 'success' && <MessageContainer variant="valid" fontSize="medium" text={t(path('Success'))} />}
      {dialogState === 'error' && <MessageContainer variant="error" fontSize="medium" text={t(path('Error'))} />}
    </Section>
  );

  const onSuccess = () => setDialogState('success');

  const onError = () => setDialogState('error');

  useEffect(() => {
    const payload = selectedRows?.map((item) => {
      const data = item?.original;
      return {
        county: `${data.county} - ${data.state}`,
        countyId: data.id,
        postCardCount: '',
        rankingsInProgress: data.rankingsInProgress,
        skipTrack: byPassRowsIds.includes(data.id),
        username: data.customerName,
      };
    });

    mutate({ payload, onSuccess, onError });
  }, []);

  const buttons: DialogButtons = [
    {
      text: t(path('ProcessStatus')),
      icon: 'status',
      onClick: () => {
        closeDialog('GenerateMultiplePostCardsDialog');
        redirectProcessRunner();
      },
    },
  ];

  return <Dialog dialogId="GenerateMultiplePostCardsDialog" content={content} title={t(path('Title'))} width="700px" buttons={buttons} />;
}
