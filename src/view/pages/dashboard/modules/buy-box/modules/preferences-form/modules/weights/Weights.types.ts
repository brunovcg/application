import { Dispatch, SetStateAction } from 'react';
import { CategoriesWeightMapped } from '../../../../../../../../../apis/queries/user/types';

export type WeightsRef = {
  resetWeights: () => void;
};

export type WeightsProps = { data?: CategoriesWeightMapped; setValidWeightSum: Dispatch<SetStateAction<boolean>> };
