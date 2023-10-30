import { Dispatch, SetStateAction } from 'react';
import Constants from '../../../../../../../../../utils/constants/Constants';

const { GOLD_TIER, PLATINUM_TIER } = Constants.TIERS;

export type SubscriptionsFiltersProps = {
  setFilteredCounty: Dispatch<SetStateAction<string>>;
  setMarkedTiersFilter: Dispatch<SetStateAction<(typeof GOLD_TIER.name | typeof PLATINUM_TIER.name)[]>>;
  markedTiersFilter: (typeof GOLD_TIER.name | typeof PLATINUM_TIER.name)[];
  setMarkedActiveFilter: Dispatch<SetStateAction<boolean[]>>;
};

export type SubscriptionsFiltersRef = {
  resetFilters: () => void;
};
