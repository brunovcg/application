import { useQuery } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { DemographicsServices } from '../../services';
import { ListDemographicsByUserIdAndDateArgs } from '../../services/demographics-services/Demographics.services.types';
import { useMemo } from 'react';
import { MappedDemographicsStateAndCounty } from './types';

const { LIST_DEMOGRAPHICS_BY_USER_DATE } = Constants.QUERIES;

const emptyMappedDemographicMarket = { marketNames: [], markets: {} as MappedDemographicsStateAndCounty['markets'] };

const useListDemographicsByUserDate = (args: ListDemographicsByUserIdAndDateArgs) => {
  const { data, isLoading, isSuccess } = useQuery(
    [LIST_DEMOGRAPHICS_BY_USER_DATE, args.userId, args.dateFrom, args.dateTo],
    () => DemographicsServices.listByUserIdAndDate(args),
    {
      refetchOnWindowFocus: false,
      enabled: !!args.userId && !!args.dateTo && !!args.dateFrom,
    }
  );

  const mappedData = useMemo(
    () =>
      data?.reduce((acc, current, index) => {
        if (index === 0) {
          acc.marketNames = [];
        }

        const marketName = `${current.state}: ${current.county.toUpperCase()}`;

        acc.marketNames = [...acc.marketNames, marketName];
        acc.markets = { ...acc.markets, [marketName]: current };

        return acc;
      }, emptyMappedDemographicMarket as MappedDemographicsStateAndCounty),
    [data]
  );

  return { data: mappedData ?? emptyMappedDemographicMarket, isLoading, isSuccess };
};

export default { useListDemographicsByUserDate };
