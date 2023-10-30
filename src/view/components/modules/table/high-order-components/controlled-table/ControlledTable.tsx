import { useMemo } from 'react';
import useControlledTableInstance from './useControlledTableInstance';
import Table from '../../root-component/Table';
import { TableColumn } from '../../root-component/Table.types';
import { ControlledTableProps } from './ControlledTable.types';

export default function ControlledTable<Data>(props: ControlledTableProps<Data>) {
  const { selectableRows, columns, data, paginate, loading, onRowSelect, ...rest } = props;

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo((): TableColumn<Data>[] => columns, [columns]);

  const { tableInstance } = useControlledTableInstance({
    selectableRows,
    memoizedColumns,
    memoizedData,
    paginate,
    onRowSelect,
  });

  return <Table tableInstance={tableInstance} paginate={paginate} loading={loading ?? false} {...rest} tableType="controlled" />;
}
