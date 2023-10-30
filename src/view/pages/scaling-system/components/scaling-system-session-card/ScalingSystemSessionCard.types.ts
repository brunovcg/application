import { SignatureSolutionTrainingSession } from '../../../../../apis/services/squidex-services/Squidex.services.types';

import Constants from '../../../../../utils/constants/Constants';

const { SCALING_SYSTEM_CATEGORIES } = Constants;

export type ScalingSystemSessionCardProps = {
  trainingSession: SignatureSolutionTrainingSession[];
  group: string;
  category: (typeof SCALING_SYSTEM_CATEGORIES)[keyof typeof SCALING_SYSTEM_CATEGORIES];
};
