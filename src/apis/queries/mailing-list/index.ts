import { useQuery } from 'react-query';
import { AddressServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { ListAddressesByAddressInfo, ListAddressesByOwnerInfo } from '../../services/address-services/Address.services.types';

const { MAILING_LIST } = Constants.QUERIES;

const useMailingListQuery = (
  search: string,
  searchCriteria: ListAddressesByAddressInfo | ListAddressesByOwnerInfo,
  signal?: AbortSignal
) => {
  const service =
    searchCriteria === 'properties-addresses' || searchCriteria === 'mailing-addresses'
      ? () => AddressServices.listByAddressInfo(search, searchCriteria, signal)
      : () => AddressServices.listByOwnerInfo(search, searchCriteria, signal);

  const { data, isLoading, refetch, isRefetching } = useQuery(
    [`${MAILING_LIST}-${searchCriteria}-${search}`, search, searchCriteria],
    service,
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return { addressList: data ?? [], addressListIsLoading: isLoading || isRefetching, refetchList: refetch };
};

export default { useMailingListQuery };
