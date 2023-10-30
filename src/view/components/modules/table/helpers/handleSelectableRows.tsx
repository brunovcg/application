import { t } from 'i18next';
import TableCheckbox from '../components/table-checkbox/TableCheckbox';
import { GetToggleAllRowsSelectedProps, RowProp } from '../root-component/Table.types';

export default function handleSelectableRows({
  selectableRows,
  renderedColumns,
  stickFromColumn,
}: {
  selectableRows?: boolean;
  renderedColumns: unknown[];
  stickFromColumn?: string;
}) {
  if (selectableRows) {
    renderedColumns.unshift({
      id: t('Components.Table.Selection'),
      Header: ({ getToggleAllRowsSelectedProps }: GetToggleAllRowsSelectedProps) => <TableCheckbox {...getToggleAllRowsSelectedProps()} />,
      Cell: ({ row }: RowProp) => <TableCheckbox {...row.getToggleRowSelectedProps()} />,
      sticky: stickFromColumn && 'left',
      width: 30,
      disableSortBy: true,
    });
  }
}
