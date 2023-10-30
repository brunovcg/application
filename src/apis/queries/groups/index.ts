import { useMutation, useQuery, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { GroupsServices } from '../../services';
import { Group, UpdateGroupPermissionsPayload, UpdateGroupUsersPayload } from '../../services/groups-services/Group.services.types';
import { useMemo } from 'react';

const { LIST_GROUPS } = Constants.QUERIES;

const useListGroupsQuery = () => {
  const { data, isLoading, isSuccess } = useQuery(LIST_GROUPS, GroupsServices.list, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const groupsList = data ?? [];

  const groupsByType = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          acc[current.userType].push(current);

          return acc;
        },
        {
          C: [] as Group[],
          I: [] as Group[],
        }
      ),
    [data]
  );

  return { groupsList, groupsByType, groupsListLoading: isLoading, groupsListSuccess: isSuccess };
};

const useGroupQuery = (groupId: number) => {
  const { data, isLoading } = useQuery(`group-${groupId}`, () => GroupsServices.getOne(groupId), {
    refetchOnWindowFocus: false,
  });

  return { group: data, groupIsLoading: isLoading };
};

const useUpdateGroupUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateGroupUsersPayload; onSuccess: () => void; onComplete?: () => void }) =>
      GroupsServices.updateAssignedUsers(args.payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([LIST_GROUPS]);
      queryClient.refetchQueries([LIST_GROUPS]);
      variables.onSuccess();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

const useUpdateGroupPermissionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { payload: UpdateGroupPermissionsPayload; onSuccess: () => void; onComplete?: () => void }) =>
      GroupsServices.updatePermissions(args.payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([LIST_GROUPS]);
      queryClient.refetchQueries([LIST_GROUPS]);
      variables.onSuccess();
    },
    onSettled: (_data, _error, variables) => {
      variables.onComplete?.();
    },
  });
};

export default { useListGroupsQuery, useGroupQuery, useUpdateGroupUsersMutation, useUpdateGroupPermissionsMutation };
