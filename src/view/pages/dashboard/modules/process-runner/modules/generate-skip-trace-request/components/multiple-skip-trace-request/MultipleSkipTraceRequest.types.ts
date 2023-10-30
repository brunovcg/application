import Constants from '../../../../../../../../../utils/constants/Constants';

export type ChangedOwnerTypes = Record<string, (typeof Constants.OWNER_TYPES)[keyof typeof Constants.OWNER_TYPES][]>;

export type SelectedVendors = Record<string, (typeof Constants.SKIP_TRACE_VENDORS)[keyof typeof Constants.SKIP_TRACE_VENDORS]>;

export type RowsCount = Record<string, number>;
