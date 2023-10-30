import { OriginalCountyByCustomer } from '../../../apis/queries/counties/types';
import { CustomerPreferencesFormData } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/CustomerPreferencesForm.types';
import { CustomerPreferenceSubmissionPayload } from '../../../apis/services/user-services/User.services.types';
import { RefObject } from 'react';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { SelectorRef } from '../../components/modules/form-group/selector/Selector.types';

export type ApplyPreferencesToOthersDialogProps = {
  county: OriginalCountyByCustomer;
  customerUsername: string;
  formatFormData: (data: CustomerPreferencesFormData, countyId: string) => CustomerPreferenceSubmissionPayload;
  formRef: RefObject<FormRef>;
  customerRef: RefObject<SelectorRef>;
};
