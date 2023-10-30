import { DemographicsStateAndCounty } from '../../services/demographics-services/Demographics.services.types';

export type MappedDemographicsStateAndCounty = {
  marketNames: string[];
  markets: { [key: string]: DemographicsStateAndCounty };
};
