/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useColumnOrder, Hooks, useFilters, Column } from 'react-table';
import TextFilter from '../../../components/table-column-filters/TextFilter';
import { Controller, SortBy, UseServerControlledTableInstance } from '../ServerControlledTable.types';
import { useEffect, useState } from 'react';
import handleSelectableRows from '../../../helpers/handleSelectableRows';

export default function useServerControlledTableInstance<Data>({
  selectableRows,
  memoizedColumns,
  memoizedData,
  controller,
}: UseServerControlledTableInstance<Data>) {
  const hasManualWidthColumns = memoizedColumns.some((column: any) => column.width);
  const totalResults = memoizedData?.length;

  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    handleLimitChange,
    currentPage,
    goToFirstPage,
    goToLastPage,
    limit,
    handleSorting,
    manualSortBy,
  } = controller ?? ({} as Controller);

  const [serverSortBy, setServerSortBy] = useState(manualSortBy);

  const handleServerSortBy = (id: string) => {
    const isSorted = serverSortBy.find((item) => item.id === id);
    if (!isSorted) {
      return setServerSortBy((state) => [...state, { id, desc: false }]);
    }
    const isDesc = isSorted?.desc;
    if (isDesc) {
      return setServerSortBy((state) => state.filter((item) => item.id !== id));
    }
    return setServerSortBy((state) => {
      const searchedIndex = state.findIndex((item) => item.id === id);
      const newState = [...state];
      newState.splice(searchedIndex, 1, { id, desc: true });
      return newState;
    });
  };

  const tableInstanceConfigs = [
    useFilters,
    useGlobalFilter,
    useSortBy,
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

  const serverControlledTableInstance = useTable(
    {
      columns: memoizedColumns as Column[],
      data: (memoizedData as any[]) ?? [],
      autoResetFilters: false,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetSelectedRows: false,
      initialState: { sortBy: manualSortBy },
    },
    ...tableInstanceConfigs
  );

  const {
    state,
    rows,
    allColumns,
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    headerGroups,
    prepareRow,
    getToggleHideAllColumnsProps,
    setSortBy,
    setAllFilters,
    ...rest
  } = serverControlledTableInstance;

  const clearAllFilters = () => setAllFilters([]);
  const { globalFilter, pageIndex } = state;
  const renderRows = rows;
  const isUncontrolled = true;

  const hasFilteredValues = allColumns.some((column) => column.filterValue) || globalFilter;

  useEffect(() => {
    handleSorting(serverSortBy as SortBy);
  }, [serverSortBy]);

  return {
    tableInstance: {
      ...rest,
      state,
      globalFilter,
      allColumns,
      pageIndex,
      clearAllFilters,
      memoizedData,
      setSortBy,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      renderRows,
      currentPage,
      limit,
      goToFirstPage,
      goToLastPage,
      hasFilteredValues,
      handleLimitChange,
      getTableProps,
      getTableBodyProps,
      setGlobalFilter,
      headerGroups,
      prepareRow,
      getToggleHideAllColumnsProps,
      hasManualWidthColumns,
      totalResults,
      isUncontrolled,
      serverSortBy,
      handleServerSortBy,
    },
  };
}
