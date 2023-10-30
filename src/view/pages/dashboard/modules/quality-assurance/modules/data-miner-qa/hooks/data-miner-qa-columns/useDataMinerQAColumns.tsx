import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { TableCell, TableColumn } from '../../../../../../../../components/modules/table/root-component/Table.types';
import { DataHelper, DateTimeHelper } from '../../../../../../../../../utils/helpers';
import { ButtonIcon, Tooltip } from '../../../../../../../../components';
import { WithPrefix } from '../../../../../../../../../types';
import { useMemo } from 'react';
import { UseDataMinerQAColumnsProps } from './useDataMinerQAColumns.types';
import MinerQASelectStatus from './MinerQASelectStatus';
import { AddressMotivationSubmission } from '../../../../../../../../../apis/services/address-services/Address.services.types';

const { formatDate } = DateTimeHelper;
const { sliceFromWord, sliceUntilWord } = DataHelper;

export default function useDataMinerQAColumns({ addAssessed, instance }: UseDataMinerQAColumnsProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA');

  const showFilter = instance === 'assessed';

  return useMemo(
    (): TableColumn<AddressMotivationSubmission>[] => [
      {
        Header: t(path('Table.SubmissionId')),
        accessor: 'id',
        width: 150,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.AddressId')),
        accessor: 'addressId',
        width: 150,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.County')),
        accessor: 'county',
        width: 180,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.TaxId')),
        accessor: 'taxId',
        width: 120,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.PropertyAddress')),
        accessor: 'propertyAddress',
        width: 300,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.PropertyCity')),
        accessor: 'propertyCity',
        width: 180,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.PropertyState')),
        accessor: 'propertyState',
        width: 120,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.PropertyZip')),
        accessor: 'propertyZip',
        width: 100,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.MailingAddress')),
        accessor: 'mailingAddress',
        width: 300,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.MailingCity')),
        accessor: 'mailingCity',
        width: 180,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.MailingState')),
        accessor: 'mailingState',
        width: 120,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.MailingZip')),
        accessor: 'mailingZip',
        width: 100,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.OwnerFirstName')),
        accessor: 'ownerFirstName',
        width: 140,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.OwnerLastName')),
        accessor: 'ownerLastName',
        width: 140,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.OwnerMiddleName')),
        accessor: 'ownerMiddleName',
        width: 110,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Motivation')),
        accessor: 'motivationName',
        width: 140,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.SourceName')),
        accessor: 'sourceName',
        width: 140,
        Filter: showFilter,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Notes')),
        accessor: 'notes',
        width: 400,
        disableSortBy: true,
        Cell: ({ value }: TableCell<AddressMotivationSubmission, 'notes'>) => {
          const note = sliceUntilWord(value, 'http');
          return <Tooltip content={note} trigger={note} />;
        },
      },
      {
        id: 'notesLinks',
        Header: t(path('Table.NotesLink')),
        width: 60,
        accessor: 'notes',
        Cell: ({ row }: TableCell<AddressMotivationSubmission>) => {
          const href = sliceFromWord(row.original.notes, 'http');
          if (!href) {
            return <div className="im-not-available" />;
          }

          return <ButtonIcon icon="link" href={href as WithPrefix<'http'>} showBorder variant="primary" size="small" />;
        },
        disableSortBy: true,
      },
      {
        Header: t(path('Table.SubmissionDate')),
        width: 110,
        accessor: 'createdDate',
        disableSortBy: true,
        Cell: ({ value }) => formatDate(value, { format: 'onlyDate' }),
      },
      {
        Header: t(path('Table.VerificationStatus')),
        width: 180,
        accessor: 'verificationStatus',
        disableSortBy: true,
        Cell: ({ value, row }: TableCell<AddressMotivationSubmission, 'verificationStatus'>) => (
          <MinerQASelectStatus value={value} row={row} addAssessed={addAssessed} />
        ),
      },
      {
        Header: t(path('Table.VerificationNotes')),
        width: 200,
        accessor: 'verificationNote',
        disableSortBy: true,
      },
    ],
    []
  );
}
