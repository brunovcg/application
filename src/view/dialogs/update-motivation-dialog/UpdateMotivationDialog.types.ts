import { MappedMotivation } from '../../../apis/queries/motivations/types';

export type UpdateMotivationDialogProps = {
  motivation: MappedMotivation;
};

export type UpdateMotivationSourceFormData = {
  definition: string;
  expirationMonths: number;
  motivationGroup: string[];
  value: number;
  motivationAliasList: string[];
};
