import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { userQueries } from '../../../../../../../../../apis/queries';
import { Button, Checkbox, Chip, ControlledTable } from '../../../../../../../../components';
import { useContext, useMemo, useState } from 'react';
import { SelectedRows, TableCell, TableColumn } from '../../../../../../../../components/modules/table/root-component/Table.types';
import StyledMultiplePostCards from './MultiplePostCards.styled';
import { GeneratePostCardsProps } from '../../GeneratePostCards.types';
import { ListCustomersSubscriptionsResponse } from '../../../../../../../../../apis/services/user-services/User.services.types';
import { DialogsContext } from '../../../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useCustomersSubscriptions } = userQueries;

export default function MultiplePostCards({ redirectProcessRunner }: GeneratePostCardsProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GeneratePostCards');
  const [selectedRows, setSelectedRows] = useState<SelectedRows>([]);
  const [byPassRowsIds, setByPassRowsIds] = useState<number[]>([]);

  const { openDialog } = useContext(DialogsContext);

  const { customersSubscriptions, customersSubscriptionsLoading } = useCustomersSubscriptions();

  const columns = useMemo(
    (): TableColumn<ListCustomersSubscriptionsResponse[number]>[] => [
      {
        Header: t(path('Customer')),
        accessor: 'customerUsername',
        Filter: true,
        width: 160,
      },
      {
        Header: t(path('Market')),
        Filter: true,
        width: 160,
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => `${row.original.county}: ${row.original.state}`,
      },
      {
        Header: t(path('Bypass')),
        width: 80,
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => {
          const checked = byPassRowsIds.includes(Number(row.original.id));
          return (
            <Checkbox
              checked={checked}
              disabled={!row.isSelected}
              onChange={() =>
                setByPassRowsIds((state) => {
                  const id = Number(row.original.id);

                  if (state.includes(id)) {
                    return [...state].filter((item) => item !== id);
                  }
                  return [...state, id];
                })
              }
            />
          );
        },
      },
      {
        Header: t(path('Ranking')),
        accessor: 'rankingsInProgress',
        width: 80,
        Cell: ({ value }: TableCell<ListCustomersSubscriptionsResponse[number], 'rankingsInProgress'>) =>
          Number(value) === 0 ? '' : <Chip text={value} variant="warning" centered size="small" />,
        disableSortBy: true,
      },
      {
        Header: t(path('SubscriptionType')),
        accessor: 'subscriptionTypeDisplayName',
        Filter: true,
        width: 100,
      },
    ],
    [byPassRowsIds, selectedRows]
  );

  const handleClick = () =>
    openDialog({ id: 'GenerateMultiplePostCardsDialog', props: { selectedRows, byPassRowsIds, redirectProcessRunner } });

  const handleRowSelect = (selection: SelectedRows) => {
    const ids = selection.map((item) => item.original.id);
    setByPassRowsIds((state) => state.filter((id) => ids.includes(id)));
    setSelectedRows(selection);
  };

  return (
    <StyledMultiplePostCards className="im-generate-multiple-post-cards">
      <ControlledTable
        data={customersSubscriptions}
        tableHeight="500px"
        columns={columns}
        selectableRows
        tableMaxWidth="1000px"
        loading={customersSubscriptionsLoading}
        onRowSelect={handleRowSelect}
        info={`${t(path('RowsSelected'))}: ${selectedRows.length}`}
      />
      {!!customersSubscriptions?.length && (
        <Button text={t(path('BulkGenerate'))} icon="process" onClick={handleClick} disabled={!selectedRows?.length} />
      )}
    </StyledMultiplePostCards>
  );
}
