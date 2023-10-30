import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../utils/hooks';
import { ButtonIcon, Chip, ProgressBar, Tooltip } from '../../../../../../../components';
import { TableCell, TableColumn } from '../../../../../../../components/modules/table/root-component/Table.types';
import { TaskProcess } from '../../../../../../../../apis/services/process-status-services/ProcessStatus.services.types';
import { DOMHelper, DataHelper, DateTimeHelper } from '../../../../../../../../utils/helpers';
import Constants from '../../../../../../../../utils/constants/Constants';
import { ProcessStatusService } from '../../../../../../../../apis/services';

function handleDate(accessor: 'createDate' | 'modifiedDate' | 'finishedDate') {
  return ({ value }: TableCell<TaskProcess, typeof accessor>) =>
    DateTimeHelper.formatDate(value, { format: 'dateAndHourDisplay', ignoreClientTimeZone: true });
}

export default function useProcessStatusColumns() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.ProcessStatus.Table');

  return useMemo(
    (): TableColumn<TaskProcess>[] => [
      {
        Header: t(path('Id')),
        accessor: 'id',
        disableSortBy: true,
        width: 140,
        Cell: ({ row }: TableCell<TaskProcess>) => {
          const { id, batchId } = row.original;
          const mappedBatchId = batchId ? `: (${row.original.batchId})` : '';
          return id + mappedBatchId;
        },
      },
      { Header: t(path('UserId')), accessor: 'userId', width: 100, disableSortBy: true },
      { Header: t(path('Name')), accessor: 'name', width: 150, disableSortBy: true },
      {
        Header: t(path('Status')),
        accessor: 'status',
        width: 120,
        disableSortBy: true,
        Cell: ({ value }: TableCell<TaskProcess, 'status'>) => {
          const { PROCESS_STATUS } = Constants;

          const displayValue = DataHelper.invertObjectKeysValues(PROCESS_STATUS)[value as keyof typeof PROCESS_STATUS];

          const variants = {
            Pending: 'warning',
            Error: 'error',
            Completed: 'valid',
          } as const;

          return <Chip text={displayValue} centered size="small" variant={variants[displayValue as keyof typeof variants]} width="100%" />;
        },
      },
      {
        Header: t(path('Progress')),
        accessor: 'progress',
        disableSortBy: true,
        Cell: ({ value }: TableCell<TaskProcess, 'progress'>) => <ProgressBar max={100} min={0} value={value} unit="%" showLabel={false} />,
      },
      {
        Header: t(path('Duration')),
        accessor: 'durationSeconds',
        disableSortBy: true,
        width: 100,
        Cell: ({ row }: TableCell<TaskProcess>) => DateTimeHelper.formatTimeFromDelta(row.original.createDate, row.original.finishedDate),
      },
      {
        Header: t(path('StatusMessage')),
        accessor: 'message',
        width: 180,
        disableSortBy: true,
        Cell: ({ value }: TableCell<TaskProcess, 'message'>) => <Tooltip content={value} trigger={value} />,
      },
      { Header: t(path('Queue')), accessor: 'queue' },
      { Header: t(path('Position')), accessor: 'queueOrdinal', width: 90 },
      {
        Header: t(path('File')),
        accessor: 'filename',
        width: 60,
        disableSortBy: true,
        Cell: ({ row }: TableCell<TaskProcess>) => {
          if (row.original.status !== Constants.PROCESS_STATUS.Completed) {
            return null;
          }
          return (
            <ButtonIcon
              icon="fileDownload"
              onClick={() =>
                ProcessStatusService.getListDownloadLink({ taskId: row.original.id, onSuccess: (res) => DOMHelper.openLink(res) })
              }
            />
          );
        },
      },
      { Header: t(path('CreatedDate')), accessor: 'createDate', Cell: handleDate('createDate') },
      { Header: t(path('ModifiedDate')), accessor: 'modifiedDate', Cell: handleDate('modifiedDate') },
      { Header: t(path('FinishedDate')), accessor: 'finishedDate', Cell: handleDate('finishedDate') },
      { Header: t(path('CustomerName')), accessor: 'customerName' },
      { Header: t(path('AmountRequested')), accessor: 'totalRecords', width: 100, disableSortBy: true },
      { Header: t(path('AmountReceived')), accessor: 'processedRecords', width: 100, disableSortBy: true },
    ],
    []
  );
}
