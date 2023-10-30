import Constants from '../../../../../../../../../utils/constants/Constants';

const { SKIP_TRACE_VENDORS, OWNER_TYPES } = Constants;

export type SelectedOwnerTypes = (keyof typeof OWNER_TYPES)[];

export type SelectedVendor = keyof typeof SKIP_TRACE_VENDORS;
