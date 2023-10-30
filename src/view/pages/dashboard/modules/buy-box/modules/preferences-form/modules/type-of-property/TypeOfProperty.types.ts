import { LivingArea, LotSize, PropertyTypeNames, TotalValue } from '../../../../../../../../../apis/queries/user/types';

export type PropertyTypesProps = {
  priority?: number;
  totalValueList?: TotalValue[];
  livingAreaList?: LivingArea[];
  lotSizeList?: LotSize[];
};

export type TypeOfPropertyProps = PropertyTypesProps & {
  PropertyTypeLabel: 'Condo' | 'Commercial' | 'Land' | 'MultiFamily' | 'SingleFamily' | 'Others';
  propertyType: PropertyTypeNames;
  customerUsername: string;
  countyId: number;
  className: string;
};

export type TypeOfPropertyGrids = 'lotSize' | 'livingArea' | 'totalValue';

export type PropertyTypeRef = {
  resetAll: () => void;
};

export type MappedInitialList = { initialValue: number; initialPriority: number; index: number }[];

export type DefaultPriority = LotSize | LivingArea | TotalValue;

export type DefaultPriorityIndex = DefaultPriority & { index: number };
