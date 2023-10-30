import { useQuery } from 'react-query';
import { RolesServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { useMemo } from 'react';
import { MappedDataMiners } from './types';

const { LIST_ROLES } = Constants.QUERIES;

const useListDataMinersQuery = () => {
  const { data, isLoading } = useQuery(LIST_ROLES, RolesServices.listDataMiners, { retry: false, refetchOnWindowFocus: false });

  const mappedData = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          const minerDisplay = `${current.userId} - ${current.customerName}`;

          acc.dataMinerList = { ...acc.dataMinerList, [minerDisplay]: current };
          acc.dataMinersNames.push(minerDisplay);
          return acc;
        },
        { dataMinersNames: [], dataMinerList: {} } as MappedDataMiners
      ),
    [data]
  );

  return { data: mappedData, isLoading };
};

export default { useListDataMinersQuery };
