import { Ascending, Completed, Descending, Pending, WithPrefix } from '../../../types';

export const QueueList = ['Single List Queue', 'Batch List Queue', 'Batch Rank Queue', 'Single Rank Queue'] as const;

export type ProcessQueue = (typeof QueueList)[number];

export type ListProcessStatusFilter = {
  processId?: number;
  name?: string;
  taskName?: string;
  taskStatus?: string;
  createDateStart?: string;
  createDateEnd?: string;
  finishedDateStart?: string;
  finishedDateEnd?: string;
  queue?: string;
  customerName?: string;
};

export type ProcessStatusSortableProperty =
  | 'created_date'
  | 'queue_ordinal'
  | 'task_finish_date'
  | 'modified_date'
  | 'queue'
  | 'customer_name';

export type ListProcessStatusPayload = {
  filter: ListProcessStatusFilter;
  pageRequest: {
    page: number;
    size: number;
    sorts?: {
      direction: Descending | Ascending;
      property: ProcessStatusSortableProperty;
    }[];
  };
};

export type TaskProcess = {
  batchId: null | number;
  county: string;
  createDate: string;
  customerName: string;
  customerNameFormatted: string;
  durationSeconds: number;
  filename: null;
  finishedDate: string;
  id: number;
  message: string;
  modifiedDate: string;
  name: string;
  processedRecords: number;
  progress: number;
  queue: ProcessQueue;
  queueOrdinal: number;
  status: Completed | Pending;
  totalRecords: number;
  userId: number;
  username: string;
};

export type ListProcessStatusArgs = {
  payload: ListProcessStatusPayload;
  onError: () => void;
  onComplete: () => void;
};

export type ListProcessStatusResponse = {
  content: TaskProcess[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: { sort: { empty: boolean; sorted: boolean; unsorted: boolean }; offset: number; pageNumber: number; pageSize: number };
  size: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  totalElements: number;
  totalPages: number;
};

export type GetListDownloadLink = { taskId: number; onSuccess: (res: WithPrefix<'http'>) => void };
