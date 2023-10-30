import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { useMemo } from 'react';
import { DateTimeHelper } from '../../.././../../../../../../utils/helpers';
import { TableColumn } from '../../../../../../../../components/modules/table/root-component/Table.types';
import { GetLastSkipTraceStatus } from '../../../../../../../../../apis/services/skip-trace-services/SkipTrace.services.types';

export default function useSingleSkipTraceRequestFilterColumns() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GenerateSkipTraceRequest.SingleSkipTraceRequestFilters.LastRequestTable');

  return useMemo(
    (): TableColumn<GetLastSkipTraceStatus>[] => [
      {
        Header: t(path('StartDate')),
        accessor: 'createDate',
        disableSortBy: true,
        width: 160,
        Cell: ({ value }) => DateTimeHelper.formatDate(value, { format: 'dateAndHourDisplay', ignoreClientTimeZone: true }),
      },
      {
        Header: t(path('EndDate')),
        accessor: 'finishedDate',
        disableSortBy: true,
        width: 160,
        Cell: ({ value }) => DateTimeHelper.formatDate(value, { format: 'dateAndHourDisplay', ignoreClientTimeZone: true }),
      },
      {
        Header: t(path('Duration')),
        disableSortBy: true,
        width: 160,
        Cell: ({ row }) => DateTimeHelper.formatTimeFromDelta(row.original.createDate, row.original.finishedDate),
      },
      {
        Header: t(path('Vendor')),
        accessor: 'vendor',
        disableSortBy: true,
        width: 120,
      },
      {
        Header: t(path('StatusMessage')),
        accessor: 'message',
        disableSortBy: true,
        width: 200,
      },
      {
        Header: t(path('AlreadyTried')),
        accessor: 'totalRecords',
        disableSortBy: true,
        width: 110,
      },
      {
        Header: t(path('GeneratedRequests')),
        accessor: 'processedRecords',
        disableSortBy: true,
        width: 110,
      },
    ],
    []
  );
}
