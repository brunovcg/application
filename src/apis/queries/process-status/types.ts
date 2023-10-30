import { Completed, Pending } from '../../../types';
import { UseListProcessStatusFilters } from '../../../view/pages/dashboard/modules/process-runner/modules/process-status/hooks/use-process-status-filters/useProcessStatusFilters.types';
import { ProcessQueue } from '../../services/process-status-services/ProcessStatus.services.types';

export type UseListProcessStatusParams = {
  taskStatus?: Pending | Completed | '';
  taskName?: string;
  queue?: ProcessQueue | '';
  userId?: string;
  processId?: string;
  createDateEnd?: string | null;
  createDateStart?: string | null;
  finishedDateEnd?: string | null;
  finishedDateStart?: string | null;
  customerName?: string;
  page: number;
  size: number;
  sort?: string;
};

export type UseListProcessStatusArgs = {
  filters: UseListProcessStatusFilters;
  onError: () => void;
};
