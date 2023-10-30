import { useQuery } from 'react-query';
import { PropertiesServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { LivingAreaPriorities, LotSizePriorities, PropertyTypeNames, TotalValuePriorities } from '../user/types';
import { userQueries } from '..';
import { useMemo } from 'react';

const { GET_DEFAULT_PRIORITIES_FOR_PROPERTY } = Constants.QUERIES;

const { useGetCustomerPreferenceForCountyQuery } = userQueries;

const useGetDefaultPrioritiesForPropertyQuery = (
  countyId: number,
  customerUsername: string,
  typeOfProperty: PropertyTypeNames,
  priority?: number
) => {
  const { data, isLoading } = useQuery(
    [
      `${GET_DEFAULT_PRIORITIES_FOR_PROPERTY}-${countyId}-${customerUsername}-${typeOfProperty}`,
      customerUsername,
      typeOfProperty,
      countyId,
    ],
    () => PropertiesServices.getDefaultPriorities(countyId, customerUsername, typeOfProperty),
    {
      refetchOnWindowFocus: false,
      enabled: priority === 0 && !!countyId && !!customerUsername && !!typeOfProperty,
    }
  );

  const { mapLivingAreaPriorities, mapLotSizePriorities, mapTotalValuePriorities } = useGetCustomerPreferenceForCountyQuery(
    customerUsername,
    countyId
  );

  const { livingAreaPriorities, lotSizePriorities, totalValuePriorities } = data ?? {};

  const mappedDefaultPriorities = useMemo(
    () => ({
      livingAreaPriorities: mapLivingAreaPriorities((livingAreaPriorities ?? []) as LivingAreaPriorities[]),
      lotSizePriorities: mapLotSizePriorities((lotSizePriorities ?? []) as LotSizePriorities[]),
      totalValuePriorities: mapTotalValuePriorities((totalValuePriorities ?? []) as TotalValuePriorities[]),
    }),
    [livingAreaPriorities, lotSizePriorities, totalValuePriorities, countyId, customerUsername]
  );

  return { defaultPriorities: mappedDefaultPriorities, defaultPrioritiesIsLoading: isLoading };
};

export default { useGetDefaultPrioritiesForPropertyQuery };
