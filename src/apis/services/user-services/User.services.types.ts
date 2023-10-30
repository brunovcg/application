import { LtvPrioritiesTypes, OwnerTypes, PropertyTypeNames, YearsOldPrioritiesTypes, YrsOwnedTypes } from '../../queries/user/types';
import { USState } from '../states-services/States.services.types';
import Constants from '../../../utils/constants/Constants';

const { TYPES, STATUS } = Constants.USER;

export type UserType = (typeof TYPES)[keyof typeof TYPES];

export type UserStatus = (typeof STATUS)[keyof typeof STATUS];

export type RegisterUserPayload = {
  username: string;
  type: UserType;
  phone?: string;
  name: string;
};

type SubscriptionTier = 'gold-tier' | 'platinum-tier';

export type UserSubscription = {
  id: number;
  state: USState;
  county: string;
  customerId: number;
  subscriptionTypeName: SubscriptionTier;
  active: boolean;
  subscriptionTypeDisplayName: 'Gold Tier' | 'Platinum Tier';
  rankingsInProgress: null | number;
};

export type UserObject = {
  city: string;
  customerPurchase: { addressCost: number; purchaseAmount: number };
  id: number;
  name: string;
  password: null;
  phone: string;
  state: USState;
  status: string;
  streetName: string;
  subscriptions: UserSubscription[];
  username: string;
  zipCode: string;
};

export type CustomerResponse = UserObject | Record<string, never>;

export type SubscriptionPayload = { active: boolean; county: string; state: USState; subscriptionTypeName: SubscriptionTier };

export type UpdateCustomerPayload = Omit<UserObject, 'subscriptions'> & {
  subscriptions: SubscriptionPayload[];
};

export type CustomerPreferenceSubmissionPayload = {
  step: string;
  username: string;
  countyId: string;
  categoriesWeight: {
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

  livingAreaPriorities: {
    id: number;
    propertyType: PropertyTypeNames;
    livingArea: number;
    priority: number;
    initialValue: number;
    initialPriority: number;
  }[];
  lotSizePriorities: {
    id: number;
    propertyType: PropertyTypeNames;
    lotSize: number;
    priority: number;
    initialPriority: number;
    initialValue: number;
  }[];
  ltvPriorities: { ltv: LtvPrioritiesTypes; priority: number; initialPriority: number }[];
  motivationPriorities: {
    id: null | string;
    name: string;
    motivationId: number;
    priority: number;
    initialPriority: number;
    value: number;
    countyId: number;
  }[];
  ownerTypePriorities: { ownerType: OwnerTypes; priority: number; initialPriority: number }[];
  propertyTypePriorities: { propertyType: PropertyTypeNames; priority: number; initialPriority: number }[];
  totalValuePriorities: {
    id: number;
    propertyType: PropertyTypeNames;
    totalValue: number;
    priority: number;
    initialPriority: number;
    initialValue: number;
  }[];
  yearsOldPriorities: { yearsOld: YearsOldPrioritiesTypes; priority: number; initialPriority: number }[];
  yrsOwnedPriorities: { yrsOwned: YrsOwnedTypes; priority: number; initialPriority: number }[];
  zipCodePriorities: {
    city: string;
    countyId: number;
    id: number;
    initialPriority: number;
    modifiedDate?: string;
    priority: number;
    zipCode: string;
  }[];
};

export type CustomerPreferencesResponse = {
  step: string;
  duplicateBuyBox: boolean;
  username: string;
  countyId: number;
  livingAreaPriorities: {
    id: number;
    livingArea: number;
    propertyType: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  ltvPriorities: {
    id: number;
    ltv: number;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  ownerTypePriorities: {
    id: number;
    ownerType: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  zipCodePriorities: {
    id: number;
    zipCode: string;
    city: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  propertyTypePriorities: {
    id: number;
    propertyType: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  totalValuePriorities: {
    id: number;
    totalValue: number;
    propertyType: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  yearsOldPriorities: {
    id: number;
    yearsOld: number;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  yrsOwnedPriorities: {
    id: number;
    yrsOwned: number;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  lotSizePriorities: {
    id: number;
    lotSize: number;
    propertyType: string;
    countyId: number;
    priority: number;
    createdDate: Date;
    modifiedDate: Date;
  }[];
  categoriesWeight: {
    id: number;
    ltv: number;
    zipCode: number;
    ownerType: number;
    propertyType: number;
    yrsOwned: number;
    totalValue: number;
    livingArea: number;
    yearsOld: number;
    lotSize: number;
    countyId: number;
    createdDate: Date;
    modifiedDate: Date;
  };
  motivationPriorities: {
    id: number;
    name: string;
    motivationId: number;
    priority: number;
    value: number;
    countyId: number;
  }[];
  lastUpdated: Date;
};

export type User = {
  groupsCount: number;
  id: number;
  name: string;
  status: UserStatus;
  username: string;
  userType: UserType;
};

export type ListUsersResponse = User[];

export type RegisterUserResponse = {
  id: number;
};

export type UpdateUserStatusPayload = { id: number; status: UserStatus };

export type UpdateUserGroupsPayload = {
  id: number;
  groupIds: number[];
};

export type GetUserResponse = {
  id: number;
  username: string;
  name: string;
  status: UserStatus;
  groups: {
    id: number;
    name: string;
  }[];
};

export type UpdateMyAccountPayload = {
  id: number;
  username: string;
  name: string;
  phone: string;
  city: string;
  state: USState;
  streetName: string;
  zipCode: string;
};

export type UpdateMyAccountArgs = {
  payload: UpdateMyAccountPayload;
  onSuccess: () => void;
  onComplete: () => void;
};

export type UpdateInternalMyAccountPayload = {
  id: number;
  username: string;
  name: string;
};

export type UpdateInternalMyAccountArgs = {
  payload: UpdateInternalMyAccountPayload;
  onSuccess: () => void;
  onComplete: () => void;
};

export type UpdateUserInfoPayload = {
  id: number;
  username: string;
  name: string;
  phone?: string;
  city?: string;
  state?: USState;
  streetName?: string;
  zipCode?: string;
};

export type ListCustomersSubscriptionsResponse = {
  active: boolean;
  county: string;
  customerId: number;
  customerName: string;
  customerUsername: string;
  id: number;
  rankingsInProgress: number;
  state: USState;
  subscriptionTypeDisplayName: string;
  subscriptionTypeName: string;
}[];
