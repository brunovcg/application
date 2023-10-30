import { MappedMotivationSource } from '../../../apis/queries/motivations/types';

export type UpdateMotivationSourcesDialogProps = {
  motivationSource: MappedMotivationSource;
};

export type UpdateMotivationSourceFormData = {
  displayName: string;
  description: string;
};
