import { OwnerTypeMapped, OwnerTypes } from '../../../../../../../../../apis/queries/user/types';

export type TypeOfOwnerRef = {
  changeTypeOfOwner: (ownerTypes: OwnerTypes, priority: number) => void;
};
export type TypeOfOwnerProps = { data?: OwnerTypeMapped };
