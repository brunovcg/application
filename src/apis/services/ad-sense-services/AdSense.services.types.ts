import Constants from '../../../utils/constants/Constants';
import { RequestErrorHandling } from '../../../utils/http/Http.types';

const { AD_SENSE_TYPE, STATUS } = Constants;

export type AdSenseType = (typeof AD_SENSE_TYPE)[keyof typeof AD_SENSE_TYPE];
export type AdSenseStatus = (typeof STATUS)[keyof typeof STATUS];

export type AddConfigurationPayload = {
  type: AdSenseType;
  status: AdSenseStatus;
  customerId: number;
  accountId: string;
};

export type AddConfigurationArgs = {
  payload: AddConfigurationPayload;
  onSuccess: () => void;
};

export type AdSense = {
  id: number;
  customerId: number;
  type: AdSenseType;
  accountId: string;
  status: AdSenseStatus;
};

export type UpdateConfigurationPayload = Omit<Partial<AdSense>, 'id' | 'customerId'>;

export type UpdateConfigurationArgs = {
  payload: UpdateConfigurationPayload;
  params: {
    adSenseId: number;
  };
  onSuccess: () => void;
};

export type ListCustomerConfigurationsArgs = {
  params: {
    customerId: number;
  };
};

export type GenerateAudienceArgs = {
  params: {
    customerId: number;
    adSenseTypes: AdSenseType[];
    audienceName: string;
  };
  payload: FormData;
  onSuccess: () => void;
  errorHandling: RequestErrorHandling[];
};

export type ListCustomerAudiencesArgs = {
  params: {
    customerId: number;
  };
};

export type AdAudience = {
  id: string;
  name: string;
  creationDate: string;
  adSenseType: AdSenseType;
};

export type ConfiguredCustomer = {
  id: number;
  name: string;
  adSenseConfigurations: AdSense[];
};

export type DeleteAudienceArgs = {
  params: {
    audienceType: AdSenseType;
    audienceId: string;
  };
  onSuccess: () => void;
};

export type ListConfiguredCustomers = ConfiguredCustomer[];
