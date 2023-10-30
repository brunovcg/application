import { useTranslation } from 'react-i18next';
import { Dialog, LoadingSpinner, Section } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import { skipTraceQueries } from '../../../apis/queries';
import { DialogState, GenerateMultipleSkipTraceRequestDialogProps } from './GenerateMultipleSkipTraceRequestDialog.types';
import { useContext, useEffect, useState } from 'react';
import MessageContainer from '../../components/modules/message-container/MessageContainer';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useGenerateMultipleSkipTraceRequestMutation } = skipTraceQueries;

export default function GenerateMultipleSkipTraceRequestDialog({
  selectedRows,
  undeliverableIds,
  changedOwnerTypes,
  selectedVendors,
  rowsCount,
  redirectProcessRunner,
}: GenerateMultipleSkipTraceRequestDialogProps) {
  const [dialogState, setDialogState] = useState<DialogState>('loading');
  const { closeDialog } = useContext(DialogsContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.GenerateMultipleSkipTraceRequestDialog');

  const { mutate } = useGenerateMultipleSkipTraceRequestMutation();
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
        ownerTypes: changedOwnerTypes[data.id],
        rankingsInProgress: data.rankingsInProgress,
        skipTraceCount: String(rowsCount[data.id]),
        undeliverable: undeliverableIds.includes(data.id),
        username: data.username,
        vendor: selectedVendors[data.id],
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

  return (
    <Dialog dialogId="GenerateMultipleSkipTraceRequestDialog" content={content} title={t(path('Title'))} width="700px" buttons={buttons} />
  );
}
