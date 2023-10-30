import { TrainingWithThumbnail } from '../../../../../../../apis/queries/squidex/types';

export type ResourcesDialogProps = {
  training: TrainingWithThumbnail;
};

export type TrainingProps = {
  trainings: TrainingWithThumbnail[];
  trainingsIsLoading: boolean;
};
