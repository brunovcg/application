import { County } from '../../services/counties-services/Counties.services.types';
import { USState } from '../../services/states-services/States.services.types';

export type StatesCounty = { state: USState; fips: number; county: string };

export type MappedCounty = StatesCounty & { countyState: string; stateCounty: string };

export type OriginalCountyByState = { stateCounty: string; countyState: string; state: USState; county: string; fips: number };

export type MappedCountyByState = {
  statesCounties: string[];
  original: OriginalCountyByState[];
};

export type OriginalCountyByCustomer = County & {
  stateCounty: string;
  countyState: string;
};

export type MappedCountyByCustomer = {
  stateCountyNames: string[];
  original: OriginalCountyByCustomer[];
};
