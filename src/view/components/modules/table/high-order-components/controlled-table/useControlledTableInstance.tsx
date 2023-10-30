/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, Hooks } from 'react-table';
import TextFilter from '../../components/table-column-filters/TextFilter';
import Constants from '../../../../../../utils/constants/Constants';
import { useEffect, ChangeEvent } from 'react';
import { UseControlledTableInstanceProps } from './ControlledTable.types';
import handleSelectableRows from '../../helpers/handleSelectableRows';
import { SelectedRows } from '../../root-component/Table.types';

const { ALL_TABLE_SIZE } = Constants.COMPONENTS.table;

export default function useControlledTableInstance({
  selectableRows,
  memoizedColumns,
  memoizedData,
  paginate,
  onRowSelect,
}: UseControlledTableInstanceProps) {
  const hasManualWidthColumns = memoizedColumns.some((column: any) => column.width);
  const totalResults = memoizedData?.length;

  const tableInstanceConfigs = [
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks: Hooks) => {
      hooks.visibleColumns.push((rawColumns: any[]) => {
        const mappedColumns = rawColumns.reduceRight((acc, current) => {
          const column = { ...current };
          column.Filter = column.Filter && TextFilter;
          acc.unshift(column);
          return acc;
        }, []);

        const renderedColumns = [...mappedColumns];

        handleSelectableRows({ selectableRows, renderedColumns });

        return renderedColumns;
      });
    },
  ];

  const controlledTableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData ?? [],
      autoResetFilters: false,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetSelectedRows: false,
    },
    ...tableInstanceConfigs
  );

  const { state, setAllFilters, page, setPageSize, rows, gotoPage, pageCount, allColumns, setFilter, ...rest } = controlledTableInstance;
  const { globalFilter, pageIndex, pageSize, filters } = state;

  const clearAllFilters = () => setAllFilters([]);
  const renderRows = paginate ? page : rows;
  const currentPage = pageIndex + 1;
  const limit = pageSize;
  const goToFirstPage = () => {
    gotoPage(0);
  };
  const goToLastPage = () => {
    gotoPage(pageCount - 1);
  };

  const hasFilteredValues = allColumns.some((column) => column.filterValue) || globalFilter;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target ?? {};
    if (value === ALL_TABLE_SIZE) {
      setPageSize(totalResults);
    }

    setPageSize(Number(value));
  };

  useEffect(() => {
    if (paginate?.length) {
      const initialPageSize = paginate[0] === ALL_TABLE_SIZE ? totalResults : paginate[0];
      setPageSize(initialPageSize);
    }
  }, []);

  useEffect(() => {
    const rowsSelectedIds = Object.keys(state.selectedRowIds);

    const selectedRows = rows.filter((item) => rowsSelectedIds.includes(String(item.index)));

    onRowSelect?.(selectedRows as unknown as SelectedRows);
  }, [state.selectedRowIds]);

  return {
    tableInstance: {
      state,
      memoizedData,
      globalFilter,
      allColumns,
      pageIndex,
      clearAllFilters,
      pageCount,
      renderRows,
      currentPage,
      limit,
      goToFirstPage,
      goToLastPage,
      hasFilteredValues,
      handleLimitChange,
      hasManualWidthColumns,
      totalResults,
      setFilter,
      filters,
      ...rest,
    },
  };
}
