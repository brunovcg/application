import useServerControlledTableInstance from './server-controlled-table-instance/useServerControlledTableInstance';
import Table from '../../root-component/Table';
import { useMemo, useImperativeHandle, ForwardedRef, forwardRef } from 'react';
import { TableColumn } from '../../root-component/Table.types';
import { ServerControlledTableProps, ServerControlledTableRef } from './ServerControlledTable.types';
import { SortingRule } from 'react-table';

function ServerControlledTable<Data>(props: ServerControlledTableProps<Data>, ref: ForwardedRef<ServerControlledTableRef>) {
  const { selectableRows, columns, data, defaultColumnConfigs, paginate, controller, customHeader, info, ...rest } = props;

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo((): TableColumn<Data>[] => columns, [columns]);

  const { tableInstance } = useServerControlledTableInstance<Data>({
    selectableRows,
    memoizedColumns,
    memoizedData: memoizedData as Data[],
    paginate,
    controller,
  });

  const resetSortBy = () => {
    tableInstance.setSortBy(controller?.initialSorting as SortingRule<object>[]);
  };

  useImperativeHandle(ref, () => ({ resetSortBy }));

  return (
    <Table
      loading={controller?.loading}
      tableInstance={tableInstance}
      paginate={paginate}
      showGlobalFilter={false}
      customHeader={customHeader}
      info={info}
      tableType="serverControlled"
      {...rest}
    />
  );
}

export default forwardRef(ServerControlledTable);
