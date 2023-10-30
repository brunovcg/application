import { useMutation, useQuery, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { AddressServices } from '../../services';
import { useEffect, useMemo, useState } from 'react';
import { DateTimeHelper, LetterCaseHelper } from '../../../utils/helpers';
import { AddressMotivationSubmission, MotivationSubmissionByAddress } from '../../services/address-services/Address.services.types';
import useServerTableController from '../../../view/components/modules/table/high-order-components/server-controlled-table/server-table-controller/useServerTableController';
import HttpHelper from '../../../utils/http/Http.helper';
import {
  MappedMinerSubmissionsByAddress,
  UseListAddressMinerSubmissionsQueryArgs,
  UseListMinerSubmissionsByAddressQueryArgs,
  UseUpdateAddrMotivationMinerSubMutationArgs,
} from './types';

const { LIST_ADDRESS_MOTIVATIONS, LIST_ADDRESS_MINER_SUBMISSION, LIST_MINER_SUBMISSION_BY_ADDRESS } = Constants.QUERIES;

const { capitalize } = LetterCaseHelper;
const { getLastWeekRange, toEndOfTheDay, toStartOfDay } = DateTimeHelper;
const { end, start } = getLastWeekRange();

const useListAddressMotivationsQuery = (propertyId: number) => {
  const { data, isLoading, isSuccess } = useQuery(
    `${LIST_ADDRESS_MOTIVATIONS}-${propertyId}`,
    () => AddressServices.listMotivationsByAddress(propertyId),
    {
      enabled: !!propertyId,
      retry: false,
    }
  );

  const mappedData = useMemo(
    () =>
      data?.map((item) => ({
        name: item.motivation.name,
        description: item.motivation.definition,
        capitalized: capitalize(item.motivation.name),
      })) ?? [],
    [data]
  );

  return { propertyMotivations: mappedData, propertyMotivationsIsLoading: isLoading, isSuccess };
};

const useListAddressMinerSubmissionsQuery = (args: UseListAddressMinerSubmissionsQueryArgs) => {
  const initialParamsRegister = {
    userId: args.userId ? String(args.userId) : '',
    page: '0',
    size: '10',
    fromDate: args.fromDate ?? toStartOfDay(new Date(start)).toISOString(),
    toDate: args.toDate ?? toEndOfTheDay(new Date(end)).toISOString(),
    county: args.county ?? '',
    state: args.state ?? '',
  };

  const [stringifiedParams, setStringifiedParams] = useState(HttpHelper.setParamsString(initialParamsRegister));

  const { data, isLoading, isSuccess, refetch, isFetching, isRefetching } = useQuery(
    LIST_ADDRESS_MINER_SUBMISSION,
    () => AddressServices.listMotivationMinerSubmissions(stringifiedParams),
    {
      retry: false,
      enabled: stringifiedParams.includes('userId'),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { totalElements, pageable, totalPages } = data ?? {};
  const { pageSize } = pageable ?? {};

  const { controller, params } = useServerTableController<AddressMotivationSubmission>({
    result: data?.content,
    size: String(pageSize),
    count: String(totalElements),
    initialParamsRegister,
    loading: isLoading || isFetching || isRefetching,
    customParams: args,
    totalPages,
  });

  useEffect(() => {
    if (!Number(args.userId)) {
      return;
    }

    setStringifiedParams(HttpHelper.setParamsString(params));
  }, [HttpHelper.setParamsString(params)]);

  useEffect(() => {
    if (stringifiedParams.includes('userId')) {
      refetch();
    }
  }, [stringifiedParams]);

  return {
    minerSubmissions: data?.content,
    minerSubmissionLoading: isLoading || isFetching || isRefetching,
    controller,
    minerSubmissionsIsSuccess: isSuccess,
    stringifiedParams,
  };
};

const useListMinerSubmissionsByAddressQuery = (args: UseListMinerSubmissionsByAddressQueryArgs) => {
  const initialParamsRegister = {
    search: args.search ?? '',
    page: '0',
    size: '10',
    fromDate: args.fromDate ?? toStartOfDay(new Date(start)).toISOString(),
    toDate: args.toDate ?? toEndOfTheDay(new Date(end)).toISOString(),
    county: args.county ?? '',
    state: args.state ?? '',
  };

  const [stringifiedParams, setStringifiedParams] = useState(HttpHelper.setParamsString(initialParamsRegister));

  const { data, isLoading, isSuccess, refetch, isRefetching, isFetching } = useQuery(
    LIST_MINER_SUBMISSION_BY_ADDRESS,
    () => AddressServices.listMotivationMinerSubmissionsByAddress(args.criteria, stringifiedParams),
    {
      retry: false,
      enabled: stringifiedParams.includes('search'),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { totalElements, pageable, totalPages } = data ?? {};
  const { pageSize } = pageable ?? {};

  const { controller, params } = useServerTableController<MotivationSubmissionByAddress>({
    result: data?.content,
    size: String(pageSize),
    count: String(totalElements),
    initialParamsRegister,
    loading: isLoading || isRefetching || isFetching,
    customParams: args,
    totalPages,
  });

  useEffect(() => {
    if (!args.search) {
      setStringifiedParams(HttpHelper.setParamsString({ ...params, search: '' }));
      return;
    }

    setStringifiedParams(HttpHelper.setParamsString(params));
  }, [HttpHelper.setParamsString(params)]);

  useEffect(() => {
    if (['search', 'state', 'county', 'fromDate', 'toDate'].every((item) => stringifiedParams.includes(item))) {
      refetch();
    }
  }, [stringifiedParams]);

  const mappedMinerSubmissionAddresses = data?.content.reduce(
    (acc, current) => {
      const {
        taxId,
        propertyAddress,
        propertyCity,
        mailingState,
        mailingZip,
        id,
        addressMotivationMinerSubmissionTestDTOS: submissions,
      } = current;

      const submissionsCount = `Submissions: ${submissions.length}`;
      const taxIdString = `Tax ID: ${taxId}`;
      const propertyIdString = `Property ID: ${id}`;
      const stateCountyString = `${mailingState}: ${propertyCity}`;
      const addressDisplayList = [propertyAddress, stateCountyString, mailingZip, propertyIdString, taxIdString, submissionsCount];

      const addressDisplay = addressDisplayList.join(' • ');

      acc.addressesDisplay.push(addressDisplay);

      acc.addressesList[`${addressDisplay}`] = current;

      return acc;
    },
    {
      addressesList: {},
      addressesDisplay: [],
    } as MappedMinerSubmissionsByAddress
  );

  return {
    mappedMinerSubmissionAddresses: mappedMinerSubmissionAddresses,
    addressesSubmissionsLoading: isLoading || isRefetching || isFetching,
    controller,
    addressesSubmissionsIsSuccess: isSuccess,
    stringifiedParams,
  };
};

const useUpdateAddrMotivationMinerSubMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UseUpdateAddrMotivationMinerSubMutationArgs) =>
      AddressServices.updateMotivationMinerSubmission(args.submissionId, args.payload),

    onSuccess: (_data, variables) => {
      variables.successCallback();
      queryClient.refetchQueries([LIST_MINER_SUBMISSION_BY_ADDRESS, LIST_ADDRESS_MINER_SUBMISSION]);
    },
    onError: (_data, variables) => {
      variables.errorCallback();
    },
  });
};

export default {
  useListAddressMotivationsQuery,
  useListAddressMinerSubmissionsQuery,
  useUpdateAddrMotivationMinerSubMutation,
  useListMinerSubmissionsByAddressQuery,
};
