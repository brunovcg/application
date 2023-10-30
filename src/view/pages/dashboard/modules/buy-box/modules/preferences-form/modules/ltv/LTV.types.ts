import { LtvPrioritiesMapped, LtvPrioritiesTypes } from '../../../../../../../../../apis/queries/user/types';

export type LTVRef = {
  changeLTV: (ltv: LtvPrioritiesTypes, priority: number) => void;
};

export type LTVProps = { data?: LtvPrioritiesMapped };
