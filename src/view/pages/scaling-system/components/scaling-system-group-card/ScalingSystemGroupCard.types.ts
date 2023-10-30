import { MappedSignatureSolutionData } from '../../../../../apis/services/squidex-services/Squidex.services.types';

export type StyledScalingSystemGroupCardProps = {
  isClickable: boolean;
};

export type ScalingSystemGroupCardProps = {
  item: MappedSignatureSolutionData;
  onClick?: (solution: MappedSignatureSolutionData | null) => void;
  isAdditionalTraining: boolean;
};
