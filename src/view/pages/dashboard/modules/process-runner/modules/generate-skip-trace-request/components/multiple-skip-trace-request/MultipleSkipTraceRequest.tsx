import { useTranslation } from 'react-i18next';
import { GenerateSkipTraceRequestProps } from '../../GenerateSkipTraceRequest.types';
import StyledMultipleSkipTraceRequest from './MultipleSkipTraceRequest.styled';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { useContext, useMemo, useState } from 'react';
import { SelectedRows, TableCell, TableColumn } from '../../../../../../../../components/modules/table/root-component/Table.types';
import { userQueries } from '../../../../../../../../../apis/queries';
import { Button, Checkbox, ControlledTable, InputNumber, Selector } from '../../../../../../../../components';
import { ListCustomersSubscriptionsResponse } from '../../../../../../../../../apis/services/user-services/User.services.types';
import Constants from '../../../../../../../../../utils/constants/Constants';
import { ChangedOwnerTypes, RowsCount, SelectedVendors } from './MultipleSkipTraceRequest.types';
import { DialogsContext } from '../../../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useCustomersSubscriptions } = userQueries;

export default function MultipleSkipTraceRequest({ redirectProcessRunner }: GenerateSkipTraceRequestProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GenerateSkipTraceRequest');
  const [selectedRows, setSelectedRows] = useState<SelectedRows>([]);
  const [undeliverableIds, setUndeliverableIds] = useState<number[]>([]);
  const [changedOwnerTypes, setChangedOwnerTypes] = useState<ChangedOwnerTypes>({});
  const [selectedVendors, setSelectedVendor] = useState<SelectedVendors>({});
  const [rowsCount, setRowsCount] = useState<RowsCount>({});

  const { openDialog } = useContext(DialogsContext);

  const { customersSubscriptions, customersSubscriptionsLoading } = useCustomersSubscriptions();

  const handleClick = () =>
    openDialog({
      id: 'GenerateMultipleSkipTraceRequestDialog',
      props: { selectedRows, undeliverableIds, redirectProcessRunner, changedOwnerTypes, selectedVendors, rowsCount },
    });

  const handleRowSelect = (selection: SelectedRows) => {
    const ids = selection.map((item) => item.original.id);
    setUndeliverableIds((state) => state.filter((id) => ids.includes(id)));
    setSelectedRows(selection);
  };

  const columns = useMemo(
    (): TableColumn<ListCustomersSubscriptionsResponse[number]>[] => [
      {
        Header: t(path('MultipleTable.Client')),
        accessor: 'customerUsername',
        Filter: true,
        width: 200,
      },
      {
        Header: t(path('MultipleTable.County')),
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => `${row.original.county}: ${row.original.state}`,
        Filter: true,
        width: 140,
      },
      {
        Header: t(path('MultipleTable.OwnerTypes')),
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => (
          <Selector
            allowSearch={false}
            allowReset={false}
            multiple
            options={Object.keys(Constants.OWNER_TYPES)}
            onSelect={(value) =>
              setChangedOwnerTypes((state) => ({
                ...state,
                [row.original.id]: value.map((item) => Constants.OWNER_TYPES[item as keyof typeof Constants.OWNER_TYPES]),
              }))
            }
            disabled={!row.isSelected}
            placeholder={!row.isSelected ? t(path('MultipleTable.EnableRow')) : undefined}
          />
        ),
        width: 160,
        disableSortBy: true,
      },
      {
        Header: t(path('MultipleTable.Vendor')),
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => (
          <Selector
            allowSearch={false}
            name="xx"
            allowClear={false}
            allowReset={false}
            initValue={['Skip Force']}
            onChange={(selectValue) =>
              setSelectedVendor((state) => ({
                ...state,
                [row.original.id]: Constants.SKIP_TRACE_VENDORS[selectValue[0] as keyof typeof Constants.SKIP_TRACE_VENDORS],
              }))
            }
            options={Object.keys(Constants.SKIP_TRACE_VENDORS)}
            disabled={!row.isSelected}
            placeholder={!row.isSelected ? t(path('MultipleTable.EnableRow')) : undefined}
          />
        ),
        width: 160,
        disableSortBy: true,
      },
      {
        Header: t(path('MultipleTable.Undeliverable')),
        width: 100,
        disableSortBy: true,
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => {
          const checked = undeliverableIds.includes(Number(row.original.id));
          return (
            <Checkbox
              checked={checked}
              disabled={!row.isSelected}
              onChange={() =>
                setUndeliverableIds((state) => {
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
        Header: t(path('MultipleTable.Count')),
        Cell: ({ row }: TableCell<ListCustomersSubscriptionsResponse[number]>) => (
          <InputNumber
            min={1}
            disabled={!row.isSelected}
            allowClear={false}
            allowReset={false}
            showError={false}
            onChange={(value) => setRowsCount((state) => ({ ...state, [row.original.id]: value }))}
          />
        ),
        width: 120,
        disableSortBy: true,
      },
    ],
    [undeliverableIds, selectedRows]
  );

  return (
    <StyledMultipleSkipTraceRequest className="im-generate-multiple-skip-trace-requests">
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
    </StyledMultipleSkipTraceRequest>
  );
}
