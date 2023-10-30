import { UnknownObject } from '../../../../../../../types';
import { ZipCodePrioritiesMapped } from '../../../../../../../apis/queries/user/types';

export type CustomerPreferencesFormData = {
  categoriesWeight: UnknownObject;
  countyId: number;
  livingAreaPriorities: UnknownObject;
  lotSizePriorities: UnknownObject;
  ltvPriorities: UnknownObject;
  motivationPriorities: UnknownObject[];
  ownerTypePriorities: UnknownObject;
  propertyTypePriorities: UnknownObject;
  totalValuePriorities: UnknownObject;
  username: string;
  yearsOldPriorities: UnknownObject;
  yrsOwnedPriorities: UnknownObject;
  zipCodePriorities: ZipCodePrioritiesMapped[];
};
