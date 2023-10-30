import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UserServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import {
  CategoriesWeightMapped,
  LivingAreaPriorities,
  LivingAreaPrioritiesMapped,
  LotSizePriorities,
  LotSizePrioritiesMapped,
  LtvPrioritiesMapped,
  OwnerTypeMapped,
  PropertyTypePrioritiesMapped,
  TotalValuePriorities,
  TotalValuePrioritiesMapped,
  UserObjectWithMappedSubs,
  YearsOldPrioritiesMapped,
  YrsOwnedMapped,
} from './types';
import { useMemo } from 'react';
import { LetterCaseHelper } from '../../../utils/helpers';
import { calculateWeightedAverage, mapLivingAreaPriorities, mapLotSizePriorities, mapTotalValuePriorities } from './functions';
import {
  ListUsersResponse,
  RegisterUserPayload,
  UpdateCustomerPayload,
  UpdateUserGroupsPayload,
  UpdateUserInfoPayload,
  UpdateUserStatusPayload,
  User,
} from '../../services/user-services/User.services.types';

const { snakeToCapitalize } = LetterCaseHelper;

const { TYPES_DISPLAY, TYPES, STATUS } = Constants.USER;
const { CUSTOMER, INTERNAL_USER } = TYPES;
const { ACTIVE, INACTIVE } = STATUS;

const { LIST_CUSTOMERS, CUSTOMER_PREFERENCE_FOR_COUNTY, GET_CUSTOMER, LIST_ALL_USERS, USER, LIST_CUSTOMERS_SUBSCRIPTIONS } =
  Constants.QUERIES;

const useListCustomersQuery = ({ enabled = false }: { enabled?: boolean } = {}) => {
  const { data, isLoading } = useQuery([LIST_CUSTOMERS, enabled], () => UserServices.listUsers(CUSTOMER), {
    refetchOnWindowFocus: false,
    enabled,
    retry: false,
  });

  const mappedUsernames = useMemo(() => data?.map((customer) => customer.username), [data]);

  return { customerList: data ?? [], customerListIsLoading: isLoading, mappedUsernames };
};

const useListAllUsersQuery = () => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(LIST_ALL_USERS, () => UserServices.listUsers(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const mappedUsers = useMemo(() => data?.map((user) => ({ ...user, userTypeDisplay: TYPES_DISPLAY[user.userType] })), [data, isFetching]);

  const usersByType = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          acc[current.userType].push(current);

          if (current.status === ACTIVE) {
            if (current.userType === CUSTOMER) {
              acc.Active.C.push(current);
            } else if (current.userType === INTERNAL_USER) {
              acc.Active.I.push(current);
            }
            return acc;
          }

          if (current.status === INACTIVE) {
            if (current.userType === CUSTOMER) {
              acc.Inactive.C.push(current);
            } else if (current.userType === INTERNAL_USER) {
              acc.Inactive.I.push(current);
            }
          }

          return acc;
        },
        {
          C: [] as User[],
          I: [] as User[],
          Active: {
            C: [] as User[],
            I: [] as User[],
          },
          Inactive: {
            C: [] as User[],
            I: [] as User[],
          },
        }
      ),
    [data]
  );

  return { usersList: mappedUsers ?? [], usersByType, usersListLoading: isLoading, userListIsSuccess: isSuccess };
};

const useGetCustomerPreferenceForCountyQuery = (username: string, countyId: number) => {
  const { data, isLoading } = useQuery(
    `${CUSTOMER_PREFERENCE_FOR_COUNTY}-${username}-${countyId}`,
    () => UserServices.getCustomerPreferenceForCounty(username, countyId),
    {
      enabled: !!username && !!countyId,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const mappedData = useMemo(() => {
    const {
      categoriesWeight,
      zipCodePriorities,
      ownerTypePriorities,
      yrsOwnedPriorities,
      ltvPriorities,
      yearsOldPriorities,
      propertyTypePriorities,
      motivationPriorities,
      lotSizePriorities,
      livingAreaPriorities,
      totalValuePriorities,
      lastUpdated,
    } = data ?? {};

    if (!data) {
      return {};
    }

    const mappedOwnerTypePriorities = ownerTypePriorities?.reduce((acc, current) => {
      acc[current.ownerType as keyof typeof acc] = {
        ownerType: current.ownerType,
        priority: current.priority,
        initialPriority: current.priority,
      };
      return acc;
    }, {} as OwnerTypeMapped);

    const mappedYrsOwnedPriorities = yrsOwnedPriorities?.reduce((acc, current) => {
      acc[current.yrsOwned as unknown as keyof typeof acc] = {
        yrsOwned: current.yrsOwned,
        priority: current.priority,
        initialPriority: current.priority,
      };
      return acc;
    }, {} as YrsOwnedMapped);

    const mappedLtvPriorities = ltvPriorities?.reduce((acc, current) => {
      acc[current.ltv as unknown as keyof typeof acc] = { ltv: current.ltv, priority: current.priority, initialPriority: current.priority };
      return acc;
    }, {} as LtvPrioritiesMapped);

    const mappedYearsOldPriorities = yearsOldPriorities?.reduce((acc, current) => {
      acc[current.yearsOld as unknown as keyof typeof acc] = {
        yearsOld: current.yearsOld,
        priority: current.priority,
        initialPriority: current.priority,
      };
      return acc;
    }, {} as YearsOldPrioritiesMapped);

    const mappedPropertyTypePriorities = propertyTypePriorities?.reduce((acc, current) => {
      acc[current.propertyType as keyof typeof acc] = {
        propertyType: current.propertyType,
        priority: current.priority,
        initialPriority: current.priority,
      };
      return acc;
    }, {} as PropertyTypePrioritiesMapped);

    const mappedLotSizePriorities: LotSizePrioritiesMapped = mapLotSizePriorities(lotSizePriorities as LotSizePriorities[]);

    const mappedLivingAreaPriorities: LivingAreaPrioritiesMapped = mapLivingAreaPriorities(livingAreaPriorities as LivingAreaPriorities[]);

    const mappedTotalValuePriorities: TotalValuePrioritiesMapped = mapTotalValuePriorities(totalValuePriorities as TotalValuePriorities[]);

    const mappedCategoriesWeight = {
      livingArea: categoriesWeight?.livingArea,
      lotSize: categoriesWeight?.lotSize,
      ltv: categoriesWeight?.ltv,
      ownerType: categoriesWeight?.ownerType,
      propertyType: categoriesWeight?.propertyType,
      totalValue: categoriesWeight?.totalValue,
      yearsOld: categoriesWeight?.yearsOld,
      yrsOwned: categoriesWeight?.yrsOwned,
      zipCode: categoriesWeight?.zipCode,
    };

    const mappedZipCodePriorities =
      zipCodePriorities
        ?.sort((a, b) => Number(a.zipCode) - Number(b.zipCode))
        .map((item) => ({
          ...item,
          initialPriority: item.priority,
        })) ?? [];

    const mappedMotivationPriorities = motivationPriorities?.map((motivation) => ({
      ...motivation,
      formattedName: snakeToCapitalize(motivation.name),
      initialPriority: motivation.priority * 100,
      priority: motivation.priority * 100,
      effectiveValue: calculateWeightedAverage({ value: motivation.value, middlePoint: 100, priority: motivation.priority * 100 }),
    }));

    return {
      categoriesWeight: mappedCategoriesWeight ?? ({} as CategoriesWeightMapped),
      zipCodePriorities: mappedZipCodePriorities ?? [],
      motivationPriorities: mappedMotivationPriorities ?? [],
      ownerTypePriorities: mappedOwnerTypePriorities ?? ({} as OwnerTypeMapped),
      yrsOwnedPriorities: mappedYrsOwnedPriorities ?? ({} as YrsOwnedMapped),
      ltvPriorities: mappedLtvPriorities ?? ({} as LtvPrioritiesMapped),
      yearsOldPriorities: mappedYearsOldPriorities ?? ({} as YearsOldPrioritiesMapped),
      propertyTypePriorities: mappedPropertyTypePriorities ?? ({} as PropertyTypePrioritiesMapped),
      lotSizePriorities: mappedLotSizePriorities ?? [],
      livingAreaPriorities: mappedLivingAreaPriorities ?? [],
      totalValuePriorities: mappedTotalValuePriorities ?? [],
      lastUpdated: lastUpdated,
    };
  }, [data, countyId]);

  return {
    userPreferencesForCounty: mappedData,
    userPreferencesForCountyIsLoading: isLoading,
    mapLotSizePriorities,
    mapLivingAreaPriorities,
    mapTotalValuePriorities,
  };
};

const useGetCustomerQuery = (customerUsername: string) => {
  const { data, isLoading } = useQuery(`${GET_CUSTOMER}-${customerUsername}`, () => UserServices.getCustomer(customerUsername), {
    enabled: !!customerUsername,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mappedCustomer = useMemo(() => {
    const customer = data;

    return {
      ...customer,
      subscriptions: customer?.subscriptions.map((item) => ({
        ...item,
        initialActive: item.active,
        initialSubscriptionTypeName: item.subscriptionTypeName,
        initialSubscriptionTypeDisplayName: item.subscriptionTypeDisplayName,
      })),
    };
  }, [data]);

  return { customer: mappedCustomer as UserObjectWithMappedSubs, customerIsLoading: isLoading };
};

const useCustomerProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateCustomerPayload; onSuccess: () => void; onComplete: () => void }) =>
      UserServices.updateCustomerSubscriptions(args.payload),
    onSuccess: (_data, variables) => {
      const query = `${GET_CUSTOMER}-${variables.payload.username}`;
      queryClient.invalidateQueries([query]);
      queryClient.refetchQueries([query]);
      variables.onSuccess();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useUserInfoQuery = (userId: number) => {
  const { data, isLoading } = useQuery(`${USER}-${userId}`, () => UserServices.getUser(userId ?? 0), { enabled: !!userId });
  return { userInfo: data, userInfoLoading: isLoading };
};

const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateUserStatusPayload; onSuccess?: () => void; onComplete?: () => void }) =>
      UserServices.updateUserStatus(args.payload),
    onMutate: async (variables) => {
      await queryClient.cancelQueries(LIST_ALL_USERS);
      const previousData = queryClient.getQueryData(LIST_ALL_USERS) as ListUsersResponse;
      queryClient.setQueryData<ListUsersResponse>(LIST_ALL_USERS, (oldData) => {
        const modifiedIndex = previousData.findIndex((user) => user.id === variables.payload.id);
        const updatedUser = (oldData as ListUsersResponse)[modifiedIndex as number];
        (oldData as ListUsersResponse).splice(modifiedIndex, 1, { ...updatedUser, status: variables.payload.status });
        return oldData as ListUsersResponse;
      });
      return { previousData };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([LIST_ALL_USERS]);
      queryClient.refetchQueries([LIST_ALL_USERS]);
      variables.onSuccess?.();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useUpdateUserGroupsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateUserGroupsPayload; onSuccess: () => void; onComplete?: () => void }) =>
      UserServices.updateUserGroups(args.payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([LIST_ALL_USERS]);
      queryClient.refetchQueries([LIST_ALL_USERS]);
      variables.onSuccess();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useUserRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: RegisterUserPayload; onSuccess: (data: { id: number }) => void; onComplete?: () => void }) =>
      UserServices.registerUser(args.payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([LIST_ALL_USERS]);
      queryClient.refetchQueries([LIST_ALL_USERS]);
      variables.onSuccess(data);
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateUserInfoPayload; onSuccess?: () => void; onComplete?: () => void }) =>
      UserServices.updateUserInfo(args.payload),
    onMutate: async (variables) => {
      await queryClient.cancelQueries(LIST_ALL_USERS);
      const previousData = queryClient.getQueryData(LIST_ALL_USERS) as ListUsersResponse;
      queryClient.setQueryData<ListUsersResponse>(LIST_ALL_USERS, (oldData) => {
        const modifiedIndex = previousData.findIndex((user) => user.id === variables.payload.id);
        const updatedUser = (oldData as ListUsersResponse)[modifiedIndex as number];
        (oldData as ListUsersResponse).splice(modifiedIndex, 1, { ...updatedUser, ...variables.payload });
        return oldData as ListUsersResponse;
      });
      return { previousData };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([LIST_ALL_USERS]);
      queryClient.refetchQueries([LIST_ALL_USERS]);
      variables.onSuccess?.();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useCustomersSubscriptions = () => {
  const { data, isLoading, isRefetching } = useQuery(LIST_CUSTOMERS_SUBSCRIPTIONS, UserServices.listCustomersSubscriptions, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { customersSubscriptions: data, customersSubscriptionsLoading: isLoading || isRefetching };
};

export default {
  useListCustomersQuery,
  useGetCustomerPreferenceForCountyQuery,
  useGetCustomerQuery,
  useCustomerProfileMutation,
  useListAllUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserGroupsMutation,
  useUserInfoQuery,
  useUserRegisterMutation,
  useUpdateUserInfoMutation,
  useCustomersSubscriptions,
};
