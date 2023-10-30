import { AdSenseStatus } from '../../../apis/services/ad-sense-services/AdSense.services.types';
import Constants from '../../../utils/constants/Constants';

const { AD_SENSE_TYPE } = Constants;

export type AddAdAudienceConfigurationDialogProps = {
  customerId: number;
};

export type AddAdAudienceFormData = {
  type: (keyof typeof AD_SENSE_TYPE)[];
  status: AdSenseStatus;
  accountId: string;
};
