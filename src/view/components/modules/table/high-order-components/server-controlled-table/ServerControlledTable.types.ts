import { ChangeEvent } from 'react';
import { AllTableSize, SelectedRows, TableColumn, TableProps } from '../../root-component/Table.types';
import { ServerTableController } from './server-table-controller/useServerTableController.types';

export type SortBy = { id: string; desc: boolean }[];

export type Controller = {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentPage: number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  limit: number | string;
  handleSorting: (sortBy: SortBy) => void;
  handleParams: (parameters: Record<string, string | (number | string)[]>) => void;
  manualSortBy: { id: string; desc: boolean }[];
  initialSorting: { id: string; desc: boolean }[];
};
type OnSelectRows = (rows: SelectedRows) => void;

export type UseServerControlledTableInstance<Data> = {
  selectableRows?: boolean;
  memoizedColumns: TableColumn<Data>[];
  memoizedData: Data[];
  paginate?: (number | AllTableSize)[];
  onRowSelect?: OnSelectRows;
  controller: Controller | undefined;
};

export type ServerControlledTableProps<Data> = Omit<TableProps, 'tableType' | 'loading'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: TableColumn<any>[];
  data?: Data[];
  defaultColumnConfigs?: unknown;
  selectableRows?: boolean;
  controller: ServerTableController | undefined;
};

export type ServerControlledTableRef = { resetSortBy: () => void };
