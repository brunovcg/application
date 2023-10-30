import { USState } from '../../services/states-services/States.services.types';
import { UserObject, UserSubscription } from '../../services/user-services/User.services.types';

export type CategoriesWeight = {
  livingArea: number;
  lotSize: number;
  ltv: number;
  ownerType: number;
  propertyType: number;
  totalValue: number;
  yearsOld: number;
  yrsOwned: number;
  zipCode: number;
};

export type CategoriesWeightTypes =
  | 'livingArea'
  | 'lotSize'
  | 'ltv'
  | 'ownerType'
  | 'propertyType'
  | 'totalValue'
  | 'yearsOld'
  | 'yrsOwned'
  | 'zipCode';

export type ZipCodePriorities = {
  city: string;
  countyId: number;
  createdDate: Date;
  id: number;
  modifiedDate: Date;
  priority: number;
  zipCode: string;
}[];

export type OwnerTypes = 'company' | 'estate' | 'individual' | 'noClassification' | 'trust';

export type OwnerTypeMapped = {
  [key in OwnerTypes]: { ownerType: string; priority: number; initialPriority: number };
};

export type YrsOwnedTypes = '-1' | '0' | '2' | '5' | '8' | '15' | '25';

export type YrsOwnedMapped = { [key in YrsOwnedTypes]: { yrsOwned: number; priority: number; initialPriority: number } };

export type LtvPrioritiesTypes = '-1' | '0' | '50' | '70' | '85' | '100';

export type LtvPrioritiesMapped = { [key in LtvPrioritiesTypes]: { ltv: number; priority: number; initialPriority: number } };

export type YearsOldPrioritiesTypes = '-1' | '0' | '3' | '6' | '10' | '20' | '40' | '60' | '100';

export type YearsOldPrioritiesMapped = {
  [key in YearsOldPrioritiesTypes]: { yearsOld: number; priority: number; initialPriority: number };
};

export type PropertyTypeNames = 'sfh' | 'units' | 'condo' | 'commercial' | 'land' | 'others';

export type PropertyTypePrioritiesMapped = {
  [key in PropertyTypeNames]: { propertyType: string; priority: number; initialPriority: number };
};

export type LotSizePrioritiesMapped = {
  [key in PropertyTypeNames]: {
    id: number;
    priority: number;
    propertyType: PropertyTypeNames;
    lotSize: number;
    index: number;
    initialValue: number;
    initialPriority: number;
  }[];
};

export type LotSizePriorities = {
  countyId: number;
  createdDate: Date;
  id: number;
  modifiedDate: Date;
  priority: number;
  propertyType: PropertyTypeNames;
  lotSize: number;
};

export type LivingAreaPrioritiesMapped = {
  [key in PropertyTypeNames]: {
    id: number;
    priority: number;
    propertyType: PropertyTypeNames;
    livingArea: number;
    index: number;
    initialPriority: number;
    initialValue: number;
  }[];
};

export type LivingAreaPriorities = {
  countyId: number;
  createdDate: Date;
  id: number;
  modifiedDate: Date;
  priority: number;
  propertyType: PropertyTypeNames;
  livingArea: number;
};

export type TotalValuePrioritiesMapped = {
  [key in PropertyTypeNames]: {
    id: number;
    priority: number;
    propertyType: PropertyTypeNames;
    totalValue: number;
    index: number;
    initialValue: number;
    initialPriority: number;
  }[];
};

export type TotalValuePriorities = {
  countyId: number;
  createdDate: Date;
  id: number;
  modifiedDate: Date;
  priority: number;
  propertyType: PropertyTypeNames;
  totalValue: number;
};

export type CategoriesWeightMapped = {
  livingArea: number;
  lotSize: number;
  ltv: number;
  ownerType: number;
  propertyType: number;
  totalValue: number;
  yearsOld: number;
  yrsOwned: number;
  zipCode: number;
};

export type ZipCodePrioritiesMapped = {
  city: string;
  countyId: number;
  id: number;
  priority: number;
  zipCode: string;
  initialPriority: number;
};

export type PropertyType = {
  id: number;
  priority: number;
  propertyType: PropertyTypeNames;
};
export type OneToFive = 1 | 2 | 3 | 4 | 5;

export type MotivationsPrioritiesMapped = {
  countyId: number;
  id: number;
  motivationId: number;
  name: string;
  initialPriority: number;
  priority: number;
  value: number;
  effectiveValue: string;
};

export type Tier = 'gold-tier' | 'platinum-tier';

export type LotSize = PropertyType & { lotSize: number; initialPriority: number; initialValue: number };

export type LivingArea = PropertyType & { livingArea: number; initialPriority: number; initialValue: number };

export type TotalValue = PropertyType & { totalValue: number; initialPriority: number; initialValue: number };

export type MappedUserSubscription = UserSubscription & {
  initialActive: boolean;
  initialSubscriptionTypeName: Tier;
  initialSubscriptionTypeDisplayName: 'Gold Tier' | 'Platinum Tier';
  subscribe?: boolean;
  unsubscribe?: boolean;
};

export type SubscriptionsByState = { [key in USState]: MappedUserSubscription[] };

export type SubscriptionsData = {
  byState: SubscriptionsByState;
  countiesNames: string[];
};

export type MappedCustomer = UserObject & {
  subscriptionsData: SubscriptionsData;
};

export type UserObjectWithMappedSubs = Omit<UserObject, 'subscriptions'> & {
  subscriptions: MappedUserSubscription[];
};

export type CalculateWeightedAverageArgs = {
  value: number;
  middlePoint: number;
  priority: number;
};
