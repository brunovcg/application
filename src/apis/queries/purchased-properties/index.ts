import { useQuery, useMutation, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { PurchasedPropertiesServices } from '../../services';
import { PurchasedPropertyArgs } from './types';
import { PurchasedProperty } from '../../services/purchased-properties-services/PurchasedProperties.services.types';
import { DateTimeHelper } from '../../../utils/helpers';

const { formatDate } = DateTimeHelper;
const { CUSTOMER_PURCHASED_PROPERTIES } = Constants.QUERIES;

const usePurchasedPropertiesQuery = (customerId: number | string) => {
  const { data, isLoading } = useQuery(
    `${CUSTOMER_PURCHASED_PROPERTIES}-${customerId}`,
    () => PurchasedPropertiesServices.listByCustomer(customerId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!customerId,
    }
  );

  return { purchasedProperties: data, purchasedPropertiesIsLoading: isLoading };
};

const useAddPurchasedPropertiesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: PurchasedPropertyArgs) => PurchasedPropertiesServices.add(args.data),
    onSuccess: (_data, variables) => {
      const query = `${CUSTOMER_PURCHASED_PROPERTIES}-${variables.data.customerId}`;
      queryClient.setQueryData(query, (oldData?: PurchasedProperty[]) => [
        ...(oldData ?? []),
        {
          ...(variables.data as unknown as PurchasedProperty),
          purchaseDate: formatDate(variables.data.purchaseDate, { format: 'onlyDate' }),
        },
      ]);

      variables.onSuccess();
    },
    onError: (_error, variables) => {
      variables.onError?.();
    },
  });
};

export default { usePurchasedPropertiesQuery, useAddPurchasedPropertiesMutation };
