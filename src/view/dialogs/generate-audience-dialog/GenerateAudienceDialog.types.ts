import Constants from '../../../utils/constants/Constants';

export type GenerateAudienceFormData = {
  audienceName: string;
  attachment: File[];
  adSenseTypes: (keyof typeof Constants.AD_SENSE_TYPE)[];
};

export type GenerateAudienceDialogProps = {
  customerId: number;
};
