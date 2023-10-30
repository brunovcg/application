import { USState } from '../states-services/States.services.types';

export type County = {
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
  fips?: number;
};

export type CountiesResponse = County[];
