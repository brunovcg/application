import { Dispatch, RefObject, SetStateAction } from 'react';
import {
  LtvPrioritiesTypes,
  OwnerTypes,
  YrsOwnedTypes,
  YearsOldPrioritiesTypes,
  CategoriesWeightTypes,
  ZipCodePrioritiesMapped,
  PropertyTypeNames,
  CategoriesWeightMapped,
} from '../../../apis/queries/user/types';
import { PropertyTypeRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/type-of-property/TypeOfProperty.types';
import { CustomerPreferencesFormData } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/CustomerPreferencesForm.types';
import { OriginalCountyByCustomer } from '../../../apis/queries/counties/types';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { CustomerPreferenceSubmissionPayload } from '../../../apis/services/user-services/User.services.types';
import { SelectorRef } from '../../components/modules/form-group/selector/Selector.types';
import { LTVRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/ltv/LTV.types';
import { MotivationsPreferencesRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/motivations-preferences/MotivationsPreferences.types';
import { PropertyAgeRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/property-age/PropertyAge.types';
import { TypeOfOwnerRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/type-of-owner/TypeOfOwner.types';
import { WeightsRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/weights/Weights.types';
import { YrsOwnedRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/years-of-ownership/YearsOfOwnership.types';
import { ZipCodeRef } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/zip-code/ZipCode.types';

type TypeOfOwnerChanges = { ownerType: OwnerTypes; priority: number; initialPriority: number }[];

export type TypeOfOwnerChangesProps = {
  typeOfOwnerChanges: TypeOfOwnerChanges;
  setTypeOfOwnerChanges: Dispatch<SetStateAction<TypeOfOwnerChanges>>;
  typeOfOwnerRef: RefObject<TypeOfOwnerRef>;
};

type LtvPrioritiesChanges = { ltv: LtvPrioritiesTypes; priority: number; initialPriority: number }[];

export type LTVChangesProps = {
  ltvChanges: LtvPrioritiesChanges;
  setLtvChanges: Dispatch<SetStateAction<LtvPrioritiesChanges>>;
  ltvRef: RefObject<LTVRef>;
};

type YearsOwnedChanges = { yrsOwned: YrsOwnedTypes; priority: number; initialPriority: number }[];

export type YearsOfOwnershipChangesProps = {
  yearsOwnedChanges: YearsOwnedChanges;
  setYearsOwnedChangesChanges: Dispatch<SetStateAction<YearsOwnedChanges>>;
  yrsOwnedRef: RefObject<YrsOwnedRef>;
};

type PropertyAgeChanges = { yearsOld: YearsOldPrioritiesTypes; priority: number; initialPriority: number }[];

export type PropertyAgeChangesProps = {
  propertyAgeChanges: PropertyAgeChanges;
  setPropertyAgeChanges: Dispatch<SetStateAction<PropertyAgeChanges>>;
  propertyAgeRef: RefObject<PropertyAgeRef>;
};

type WeightChanges = { category: CategoriesWeightTypes; priority: number; initialPriority: number }[];
export type WeightsChangesProps = {
  weightChanges: WeightChanges;
  setWeightChanges: Dispatch<SetStateAction<WeightChanges>>;
  weightsRef: RefObject<WeightsRef>;
};

export type ZipCodeChangesProps = {
  zipCodeChanges: ZipCodePrioritiesMapped[];
  setZipCodeChanges: Dispatch<SetStateAction<ZipCodePrioritiesMapped[]>>;
  zipCodeRef: RefObject<ZipCodeRef>;
};

type PropertyTypeChanges = { propertyType: PropertyTypeNames; priority: number; initialPriority: number }[];

type DefaultGridChanges = {
  id: number;
  propertyType: PropertyTypeNames;
  priority: number;
  initialPriority: number;
  initialValue: number;
};

type LotSizeChanges = (DefaultGridChanges & { lotSize: number })[];
type LivingAreaChanges = (DefaultGridChanges & { livingArea: number })[];
type TotalValueChanges = (DefaultGridChanges & { totalValue: number })[];

export type PropertyTypeChangesProps = {
  propertyTypeChanges: PropertyTypeChanges;
  setPropertyTypeChanges: Dispatch<SetStateAction<PropertyTypeChanges>>;
  lotSizeChanges: LotSizeChanges;
  setLotSizeChanges: Dispatch<SetStateAction<LotSizeChanges>>;
  livingAreaChanges: LivingAreaChanges;
  setLivingAreaChanges: Dispatch<SetStateAction<LivingAreaChanges>>;
  totalValueChanges: TotalValueChanges;
  setTotalValueChanges: Dispatch<SetStateAction<TotalValueChanges>>;
  type: PropertyTypeNames;
  typeRef: RefObject<PropertyTypeRef>;
};

type MotivationsChanges = {
  id: null | string;
  name: string;
  motivationId: number;
  priority: number;
  initialPriority: number;
  value: number;
  countyId: number;
}[];

export type MotivationsChangesProps = {
  motivationsChanges: MotivationsChanges;
  setMotivationsChanges: Dispatch<SetStateAction<MotivationsChanges>>;
  motivationsRef: RefObject<MotivationsPreferencesRef>;
};

export type SubmissionState = null | 'loading' | 'success' | 'error';

export type CustomerPreferencesSubmissionDialogProps = {
  categoriesWeight: CategoriesWeightMapped;
  formatFormData: (data: CustomerPreferencesFormData) => CustomerPreferenceSubmissionPayload;
  singleFamilyRef: RefObject<PropertyTypeRef>;
  multiFamilyRef: RefObject<PropertyTypeRef>;
  condoRef: RefObject<PropertyTypeRef>;
  commercialRef: RefObject<PropertyTypeRef>;
  othersRef: RefObject<PropertyTypeRef>;
  landRef: RefObject<PropertyTypeRef>;
  county: OriginalCountyByCustomer;
  customerUsername: string;
  formRef: RefObject<FormRef>;
  customerRef: RefObject<SelectorRef>;
  ltvRef: RefObject<LTVRef>;
  motivationsRef: RefObject<MotivationsPreferencesRef>;
  propertyAgeRef: RefObject<PropertyAgeRef>;
  typeOfOwnerRef: RefObject<TypeOfOwnerRef>;
  weightsRef: RefObject<WeightsRef>;
  yrsOwnedRef: RefObject<YrsOwnedRef>;
  zipCodeRef: RefObject<ZipCodeRef>;
};
