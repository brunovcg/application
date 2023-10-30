import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AdSenseServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import {
  AdSense,
  AddConfigurationArgs,
  GenerateAudienceArgs,
  UpdateConfigurationArgs,
} from '../../services/ad-sense-services/AdSense.services.types';
import {
  ActiveConfiguredCustomer,
  ListActiveConfiguredCustomers,
  UseDeleteAudienceMutation,
  UseListCustomerAdSenseConfigurationsQuery,
  UseListCustomerAudiencesQuery,
} from './types';
import { useMemo } from 'react';

const { LIST_CUSTOMER_AD_SENSE_CONFIGS, LIST_CUSTOMER_AUDIENCES, LIST_CUSTOMER_WITH_ACTIVE_AUDIENCES } = Constants.QUERIES;
const { ACTIVE } = Constants.STATUS;

const useListCustomerAdSenseConfigurationsQuery = (args: UseListCustomerAdSenseConfigurationsQuery) => {
  const { customerId } = args;
  const { data, isLoading, isRefetching } = useQuery(
    `${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${customerId}`,
    () => AdSenseServices.listCustomerConfigurations({ params: { customerId: customerId as number } }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!customerId,
    }
  );

  return { audienceConfigurations: data, audienceConfigurationsLoading: isLoading || isRefetching };
};

const useAddConfigurationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: AddConfigurationArgs) => AdSenseServices.addConfiguration(args),
    onMutate: (variables) => {
      const { customerId, accountId, type, status } = variables.payload;
      const queryKey = `${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${customerId}`;

      const previousData = queryClient.getQueryData<AdSense[]>([queryKey]) as AdSense[];
      queryClient.setQueriesData<AdSense[]>(queryKey, (oldData) => {
        const newInput: AdSense = { id: Number(new Date()), customerId, accountId, status, type };

        return [...(oldData as AdSense[]), newInput];
      });
      return { previousData };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.payload.customerId}`]);
      queryClient.refetchQueries([`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.payload.customerId}`]);
    },
  });
};

const useUpdateConfigurationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateConfigurationArgs & { customerId: number }) => AdSenseServices.updateConfiguration(args),
    onMutate: (variables) => {
      const previousData = queryClient.getQueryData<AdSense[]>([`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.customerId}`]) as AdSense[];
      queryClient.setQueriesData<AdSense[]>(`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.customerId}`, (oldData) => {
        const modifiedIndex = previousData.findIndex((configuration) => configuration.id === variables.params.adSenseId);

        const updated = (oldData as AdSense[])[modifiedIndex as number];
        (oldData as AdSense[]).splice(modifiedIndex, 1, {
          ...updated,
          status: variables.payload.status as 'I' | 'A',
          accountId: variables.payload.accountId as string,
        });
        return oldData as AdSense[];
      });
      return { previousData };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.customerId}`]);
      queryClient.refetchQueries([`${LIST_CUSTOMER_AD_SENSE_CONFIGS}-${variables.customerId}`]);
    },
  });
};

const useListCustomerAudiencesQuery = (args: UseListCustomerAudiencesQuery) => {
  const { customerId } = args;

  const { data, isLoading } = useQuery(
    `${LIST_CUSTOMER_AUDIENCES}-${customerId}`,
    () =>
      AdSenseServices.listCustomerAudiences({
        params: {
          customerId: customerId as number,
        },
      }),
    {
      enabled: !!customerId,
    }
  );
  return { customerAudiences: data, customerAudiencesIsLoading: isLoading };
};

const useGenerateAudienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: Omit<GenerateAudienceArgs, 'onComplete'>) => AdSenseServices.generateAudience(args),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(`${LIST_CUSTOMER_AUDIENCES}-${variables.params.customerId}`);
      queryClient.refetchQueries(`${LIST_CUSTOMER_AUDIENCES}-${variables.params.customerId}`);
    },
  });
};

const useListConfiguredCustomersQuery = () => {
  const { data, isLoading } = useQuery(LIST_CUSTOMER_WITH_ACTIVE_AUDIENCES, AdSenseServices.listConfiguredCustomers);

  const mappedData = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          const hasActive = current.adSenseConfigurations.filter((adSense) => adSense.status === ACTIVE).length > 0;

          if (hasActive && current.adSenseConfigurations) {
            acc.ids.push(current.id);
            acc.original.push(current as ActiveConfiguredCustomer);
          }

          return acc;
        },
        { original: [] as ListActiveConfiguredCustomers, ids: [] as number[] }
      ),
    [data]
  );

  return { customersWithActiveConfigurations: mappedData, customersWithActiveConfigurationsIsLoading: isLoading };
};

const useDeleteAudienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UseDeleteAudienceMutation) => AdSenseServices.deleteAudience(args),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(`${LIST_CUSTOMER_AUDIENCES}-${variables.customerId}`);
      queryClient.refetchQueries(`${LIST_CUSTOMER_AUDIENCES}-${variables.customerId}`);
    },
  });
};

export default {
  useListCustomerAdSenseConfigurationsQuery,
  useAddConfigurationMutation,
  useUpdateConfigurationMutation,
  useGenerateAudienceMutation,
  useListCustomerAudiencesQuery,
  useListConfiguredCustomersQuery,
  useDeleteAudienceMutation,
};
