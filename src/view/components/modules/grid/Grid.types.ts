/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type Alignment = 'left' | 'center' | 'right';

export type StyledGridHeadProps = {
  headerAlignment: Alignment;
};

type Value = string | number | null | undefined | ReactNode;

export type Row = { id?: string | number; [key: string]: string | ReactNode | any };

export type GridCell = { id: string | number; value: Value; cellAlignment?: Alignment; isTemplate: boolean; accessor?: string };

export type GridRow = {
  id: string | number;
  cells: GridCell[];
  row: Row;
};
export type StyledGripProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  loading?: boolean | number;
  zIndex?: number;
  rowHeight?: string;
};
export type GridTemplateArgs = { row: Row; value: Value; rows: Row[]; index: number };

export type StyledGridCellProps = {
  cellAlignment: Alignment;
  clickable?: boolean;
};

export type GridColumn = {
  id?: string | number;
  accessor?: string;
  component?: string;
  headerAlignment?: Alignment;
  cellAlignment?: Alignment;
  template?: (data: GridTemplateArgs) => ReactNode;
};

export type GridProps = Omit<StyledGripProps, 'zIndex'> & {
  loading?: boolean;
  className?: string;
  noData?: string | ReactNode;
  search?: boolean;
  columns: GridColumn[] | undefined;
  rows?: Row[];
  onRowClick?: (row: Row) => void;
  rowHeight?: string;
  rowPK?: string | number;
};
