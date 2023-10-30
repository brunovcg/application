import { MotivationSourceGroupsResponse } from '../../../apis/services/motivation-services/Motivation.services.types';

export type UpdateMotivationSourceGroupDialogProps = {
  motivationSourceGroup: MotivationSourceGroupsResponse[number];
  type: 'info' | 'sources';
};

export type UpdateMotivationSourceGroupFormData = {
  description: string | null;
  displayName: string;
  sources: string[];
};
