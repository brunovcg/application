import { SelectedRows } from '../../components/modules/table/root-component/Table.types';
import {
  ChangedOwnerTypes,
  RowsCount,
  SelectedVendors,
} from '../../pages/dashboard/modules/process-runner/modules/generate-skip-trace-request/components/multiple-skip-trace-request/MultipleSkipTraceRequest.types';

export type GenerateMultipleSkipTraceRequestDialogProps = {
  selectedRows: SelectedRows;
  undeliverableIds: number[];
  redirectProcessRunner: () => void;
  changedOwnerTypes: ChangedOwnerTypes;
  selectedVendors: SelectedVendors;
  rowsCount: RowsCount;
};

export type DialogState = 'loading' | 'success' | 'error';
