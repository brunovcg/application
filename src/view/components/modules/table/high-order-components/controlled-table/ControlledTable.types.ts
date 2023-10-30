/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllTableSize, SelectedRows, TableColumn, TableProps } from '../../root-component/Table.types';

type OnSelectRows = (rows: SelectedRows) => void;

export type UseControlledTableInstanceProps = {
  selectableRows?: boolean;
  memoizedColumns: any[];
  memoizedData: any;
  paginate?: (number | AllTableSize)[];
  onRowSelect?: OnSelectRows;
};

type CustomProps =
  | {
      selectableRows?: boolean;
      onRowSelect?: OnSelectRows;
    }
  | {
      selectableRows?: never;
      onRowSelect?: never;
    };

export type ControlledTableProps<Data> = Omit<TableProps, 'tableType'> &
  CustomProps & {
    columns: TableColumn<Data>[];
    data?: Data[];
  };
