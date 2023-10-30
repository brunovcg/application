import { MotivationsPrioritiesMapped } from '../../../../../../../../../apis/queries/user/types';

export type MotivationsPreferencesRef = {
  changeMotivations: (motivationName: string, priority: number, rowValue: number) => void;
};

export type MotivationsPreferencesProps = { data?: MotivationsPrioritiesMapped[] };
