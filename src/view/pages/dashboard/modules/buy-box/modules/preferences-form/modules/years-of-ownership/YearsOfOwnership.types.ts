import { YrsOwnedMapped, YrsOwnedTypes } from '../../../../../../../../../apis/queries/user/types';

export type YrsOwnedRef = {
  changeYrsOwned: (yrsOwned: YrsOwnedTypes, priority: number) => void;
};
export type TypeOfOwnerProps = { data?: YrsOwnedMapped };
