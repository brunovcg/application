import { SelectedRows } from '../../components/modules/table/root-component/Table.types';

export type GenerateMultiplePostCardsDialogProps = {
  selectedRows: SelectedRows;
  byPassRowsIds: number[];
  redirectProcessRunner: () => void;
};

export type DialogState = 'loading' | 'success' | 'error';
