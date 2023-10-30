import { USState } from '../states-services/States.services.types';

export type DemographicsStateAndCounty = {
  county: string;
  state: USState;
};

export type ListDemographicsByUserIdAndDateResponse = DemographicsStateAndCounty[];

export type ListDemographicsByUserIdAndDateArgs = { userId: number | null; dateTo: string; dateFrom: string };
