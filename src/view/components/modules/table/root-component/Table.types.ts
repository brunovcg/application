/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObject } from 'styled-components';
import { Column, ColumnInstance, FilterValue, HeaderGroup, IdType, Row, TableToggleHideAllColumnProps } from 'react-table';
import Constants from '../../../../../utils/constants/Constants';
import { ChangeEvent, ReactNode, RefAttributes } from 'react';
import { SelectorFilter } from '../components/table-column-filters/selector-filter/SelectorFilter.types';

export type RowStyles = { odd: CSSObject; even: CSSObject; hover: CSSObject; row: CSSObject };

export type SelectedRows = {
  cells: { row: Record<string, any>; Column: Column };
  id: string;
  index: number;
  isSelected: boolean;
  original: Record<string, any>;
}[];

export type StyledTableTypes = {
  tableHeight: string;
  tableMaxWidth?: string;
  tableWidth?: string;
  manualWidth: boolean;
  stickHeader: boolean;
  rowStyles?: RowStyles;
  headerStyles?: CSSObject;
  clickableRow: boolean;
};

export type ColumnAlignment = 'left' | 'center' | 'right' | 'justify';

export type StyledColumnHeaderTypes = {
  width?: string | number;
  manualWidth: boolean;
};

export type StyledColumnDataTypes = {
  width?: string | number;
  alignment?: ColumnAlignment;
};

export type TableCell<Data, Value extends keyof Data = any> = {
  value: Value extends keyof Data ? Data[Value] : any;
  row: Row<{ id: string; type: string }> & { original: Data };
};

type ColumnCustom<Data> =
  | { Cell: (cell: TableCell<Data>) => string | ReactNode; accessor?: string; alignment?: never }
  | { Cell?: (cell: TableCell<Data>) => string | ReactNode; accessor: string; alignment?: never }
  | { Cell?: never; accessor: string; alignment?: ColumnAlignment };

type ColumnFilter =
  | {
      Filter?: boolean;
      SelectorFilter?: never;
    }
  | {
      Filter?: never;
      selectorFilter?: SelectorFilter;
    };

export type TableColumn<Data> = ColumnCustom<Data> &
  ColumnFilter & {
    id?: string;
    Header: string;
    Footer?: string;
    sort?: boolean;
    width?: number;
    disableSortBy?: boolean;
  };

export type AllTableSize = typeof Constants.COMPONENTS.table.ALL_TABLE_SIZE;

export type TableProps = {
  className?: string;
  loading?: boolean;
  showGlobalFilter?: boolean;
  paginate?: (number | AllTableSize)[];
  columnOrder?: string[];
  noData?: string | ReactNode;
  stickHeader?: boolean;
  headerStyles?: CSSObject;
  rowStyles?: RowStyles;
  onRowClick?: (rowData: any) => void;
  tableHeight?: string;
  tableMaxWidth?: string;
  tableWidth?: string;
  allowExportExcel?: boolean;
  allowExportCSV?: boolean;
  label?: string;
  filename?: string;
  tableInstance?: any;
  customHeader?: ReactNode;
  info?: string | ReactNode;
  onResetFilters?: () => void;
  showColumnSelection?: boolean;
  showCleanFilters?: boolean;
  tableType: 'controlled' | 'serverControlled';
};

export type ColumnFilterProps = {
  column: ColumnInstance;
};

export type TableCheckboxProps = {
  indeterminate?: unknown;
  label?: string;
  dataTestId?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type RowProp = {
  row: Row;
};

export type GetToggleAllRowsSelectedProps = {
  getToggleAllRowsSelectedProps: () => TableCheckboxProps & RefAttributes<unknown>;
};

export type CustomColumnType = ColumnInstance & {
  sticky: string;
};

export type ExportToExcelColumnType = {
  totalHeaderCount: number;
  Header: string;
};

export type ExportToExcelHeaderRowType = {
  value: string;
  type: string;
};

export type TablePaginationProps = {
  currentPage: number;
  pageCount: number;
  limit: number | AllTableSize;
  handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  canNextPage: boolean;
  nextPage: () => void;
  paginate?: (number | AllTableSize)[];
  totalResults: number;
  isUncontrolled: boolean;
  totalFilteredRows: number;
};

export type TableMenuProps = {
  allColumns: ColumnInstance[];
  allowExportExcel: boolean;
  allowExportCSV: boolean;
  renderRows: Row<object>[];
  headerGroups: HeaderGroup<object>[];
  getToggleHideAllColumnsProps: (props?: Partial<TableToggleHideAllColumnProps>) => TableToggleHideAllColumnProps;
  showGlobalFilter: boolean;
  isUncontrolled?: boolean;
  globalFilter: ((rows: Array<Row<object>>, columnIds: Array<IdType<object>>, filterValue: FilterValue) => Array<Row<object>>) | string;
  setGlobalFilter: (filterValue: FilterValue) => void;
  label?: string;
  filename?: string;
  hasFilteredValues: boolean;
  clearAllFilters: () => void;
  customHeader?: ReactNode;
  onResetFilters?: () => void;
  showColumnSelection: boolean;
  showCleanFilters: boolean;
};

export type SortBy = { id: string; desc: boolean };
