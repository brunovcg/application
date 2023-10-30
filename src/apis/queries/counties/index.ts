import { useQuery } from 'react-query';
import { CountiesServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { useMemo } from 'react';
import { LetterCaseHelper } from '../../../utils/helpers';
import { USState } from '../../services/states-services/States.services.types';
import { MappedCountyByCustomer, MappedCountyByState, OriginalCountyByState } from './types';

const { regularToTitleCase } = LetterCaseHelper;
const { LIST_COUNTIES_BY_CUSTOMER, LIST_COUNTIES_BY_STATES } = Constants.QUERIES;

const useListCountiesByCustomerQuery = (username: string) => {
  const { data, isLoading } = useQuery(`${LIST_COUNTIES_BY_CUSTOMER}-${username}`, () => CountiesServices.listByCustomer(username), {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!username,
    retry: false,
  });

  const mappedCounties = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          const stateCountyName = `${current.state}: ${regularToTitleCase(current.county)}`;

          acc.stateCountyNames.push(stateCountyName);
          acc.original.push({
            ...current,
            countyState: `${current.county} - ${current.state}`,
            stateCounty: `${current.state}: ${regularToTitleCase(current.county)}`,
          });

          return acc;
        },
        { original: [], stateCountyNames: [] } as MappedCountyByCustomer
      ),

    [data, username]
  ) ?? { original: [], stateCountyNames: [] };

  const customerStateCountyNames = useMemo(() => [...mappedCounties.stateCountyNames].sort((a, b) => a.localeCompare(b)), [mappedCounties]);

  return {
    customerCounties: mappedCounties.original ?? [],
    customerCountiesIsLoading: isLoading,
    customerStateCountyNames,
  };
};

const useListCountiesByStatesQuery = (states: USState[] | null) => {
  const mappedStates = states?.sort((a, b) => a.localeCompare(b)).toString() ?? '';

  const { data, isLoading } = useQuery(
    [`${LIST_COUNTIES_BY_STATES}-${mappedStates}`, states],
    () => CountiesServices.listByStates(mappedStates),
    {
      refetchOnWindowFocus: false,
      enabled: !!states?.length,
    }
  );

  const mappedData = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          acc.statesCounties.push(`${current.state}: ${current.county}`);
          acc.original.push({
            stateCounty: `${current.state}: ${current.county}`,
            countyState: `${current.county} - ${current.state}`,
            state: current.state,
            county: current.county,
            fips: current.fips as number,
          });

          return acc;
        },
        { statesCounties: [], original: [] } as MappedCountyByState
      ),

    [data]
  ) ?? { statesCounties: [] as string[], original: [] as OriginalCountyByState[] };

  return {
    statesCounties: mappedData?.original ?? [],
    statesCountiesNames: mappedData?.statesCounties,
    statesCountiesIsLoading: isLoading,
  };
};

export default { useListCountiesByCustomerQuery, useListCountiesByStatesQuery };
