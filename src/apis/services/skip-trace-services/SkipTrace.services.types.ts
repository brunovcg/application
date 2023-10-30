import { Completed, Pending } from '../../../types';
import Constants from '../../../utils/constants/Constants';

const { SKIP_TRACE_VENDORS, OWNER_TYPES } = Constants;

type SkipTraceVendor = (typeof SKIP_TRACE_VENDORS)[keyof typeof SKIP_TRACE_VENDORS];
type SkipTracerOwnerTypes = (typeof OWNER_TYPES)[keyof typeof OWNER_TYPES][];

export type GetLastSkipTraceStatus = {
  batchId: number;
  county: string;
  createDate: string;
  customerName: string;
  customerNameFormatted: string;
  durationSeconds: number;
  filename: string;
  finishedDate: string;
  id: number;
  message: string;
  modifiedDate: string;
  name: 'Skip Trace Request';
  processedRecords: number;
  progress: number;
  queue: null | string;
  queueOrdinal: null | string;
  status: Pending | Completed;
  totalRecords: number;
  userId: number;
  username: null | string;
};

export type GetSkipTraceResponse = {
  id: number;
  taskName: 'Skip Trace Request';
  taskStatus: Pending | Completed;
  statusMessage: string;
  parameter1: string;
  parameter2: string;
  parameter3: string;
  parameter4: number;
  parameter5: number;
  parameter6: number;
  totalRecords: number;
  processedRecords: number;
  taskFinishDate: string;
  userId: number;
  createdDate: string;
  modifiedDate: string;
};

export type GetLastRequestStatusByUserCountiesArgs = {
  params: { username: string; counties: (string | number)[] };
  onSuccess: (res: GetLastSkipTraceStatus) => void;
};

export type GenerateMultipleSkipTracePayload = {
  county: string;
  countyId: number;
  ownerTypes: SkipTracerOwnerTypes;
  rankingsInProgress: number;
  skipTraceCount: string;
  undeliverable: boolean;
  username: string;
  vendor: SkipTraceVendor;
}[];

export type GenerateMultipleSkipTraceResponse = {
  id: number;
  taskName: 'Bulk Generate Skip Trace Requests';
  taskStatus: Pending | Completed;
  statusMessage: null | string;
  parameter1: unknown;
  parameter2: unknown;
  parameter3: unknown;
  parameter4: unknown;
  parameter5: unknown;
  parameter6: unknown;
  totalRecords: number;
  processedRecords: number;
  taskFinishDate: null;
  userId: number;
  createdDate: string;
  modifiedDate: string;
};

export type GenerateMultipleSkipTraceArgs = {
  payload: GenerateMultipleSkipTracePayload;
  onSuccess: (res: GenerateMultipleSkipTraceResponse) => void;
  onError: () => void;
};

export type GetOneSkipTraceArgs = {
  params: {
    username: string;
    counties: (string | number)[];
    ownerType: SkipTracerOwnerTypes;
    vendor: SkipTraceVendor;
    count: number;
    undeliverable: boolean;
  };
  onSuccess: (res: GetSkipTraceResponse) => void;
  onError: () => void;
};
