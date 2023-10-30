import { YearsOldPrioritiesMapped, YearsOldPrioritiesTypes } from '../../../../../../../../../apis/queries/user/types';

export type PropertyAgeRef = {
  changeYearsOld: (yrsOld: YearsOldPrioritiesTypes, priority: number) => void;
};
export type PropertyAgeProps = { data?: YearsOldPrioritiesMapped };
