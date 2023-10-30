import { useMutation, useQuery, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { useMemo } from 'react';
import { MotivationServices } from '../../services';
import { LetterCaseHelper } from '../../../utils/helpers';
import {
  ListMotivationSourcesArgs,
  ToggleMotivationSourceGroupStatusArgs,
  ToggleMotivationSourceStatusArgs,
  UpdateMotivationArgs,
  UpdateSourceArgs,
  UpdateSourceGroupArgs,
  UpdateSourceGroupSourcesArgs,
} from '../../services/motivation-services/Motivation.services.types';
import { MappedMotivation, MappedMotivationGroupData, MappedMotivationSource } from './types';

const {
  LIST_MOTIVATIONS,
  LIST_MOTIVATION_SOURCES,
  DRIVING_FOR_DOLLARS,
  MOTIVATION_SOURCE,
  LIST_MOTIVATION_SOURCE_GROUPS,
  LIST_MOTIVATION_GROUPS,
} = Constants.QUERIES;

const { replaceDashUnderscoreDot, capitalize } = LetterCaseHelper;

const useListMotivationsQuery = () => {
  const { data, isLoading } = useQuery(LIST_MOTIVATIONS, MotivationServices.list, { refetchOnWindowFocus: false, refetchOnMount: false });

  const mappedData: MappedMotivation[] = useMemo(
    () => data?.map((item) => ({ ...item, mappedName: capitalize(replaceDashUnderscoreDot(item.name)) })) ?? [],
    [data]
  );

  return { motivations: mappedData, motivationsIsLoading: isLoading };
};

const useListMotivationSourcesQuery = (args: ListMotivationSourcesArgs) => {
  const { data, isLoading } = useQuery(LIST_MOTIVATION_SOURCES, () => MotivationServices.listSources(args), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mappedData: MappedMotivationSource[] = useMemo(
    () => data?.map((item) => ({ ...item, mappedName: capitalize(replaceDashUnderscoreDot(item.name)) })) ?? [],
    [data]
  );

  return { motivationSources: mappedData, motivationSourcesIsLoading: isLoading };
};

const useDrivingForDollarsMotivationQuery = () => {
  const { data, isLoading } = useQuery(DRIVING_FOR_DOLLARS, MotivationServices.getDrivingForDollars, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { motivationForDollars: data, motivationForDollarsIsLoading: isLoading };
};

const useMotivationSourceQuery = (motivation: string) => {
  const { data, isLoading } = useQuery(`${MOTIVATION_SOURCE}-${motivation}`, () => MotivationServices.getSource(motivation), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { customerMotivationSource: data, customerMotivationSourceIsLoading: isLoading };
};

const useListMotivationSourceGroups = () => {
  const { data, isLoading } = useQuery(LIST_MOTIVATION_SOURCE_GROUPS, MotivationServices.listSourceGroups);

  return { motivationSourceGroups: data ?? [], motivationSourceGroupsLoading: isLoading };
};

const useMotivationGroupsQuery = () => {
  const { data, isLoading } = useQuery(LIST_MOTIVATION_GROUPS, MotivationServices.listGroups);

  const mappedData = useMemo(
    () =>
      data?.reduce(
        (acc, current) => {
          acc.original[current.name] = current;
          acc.list.push(current.name);

          return acc;
        },
        { original: {}, list: [] } as MappedMotivationGroupData
      ),
    [data]
  );

  return { motivationGroups: mappedData?.original, groupList: mappedData?.list ?? [], isLoading };
};

const useUpdateMotivationsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateMotivationArgs) => MotivationServices.update(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATIONS);
    },
  });
};

const useToggleMotivationSourceStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: ToggleMotivationSourceStatusArgs) => MotivationServices.toggleMotivationSourceStatus(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATION_SOURCES);
    },
  });
};

const useUpdateMotivationSourcesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateSourceArgs) => MotivationServices.updateSource(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATION_SOURCES);
    },
  });
};

const useToggleMotivationSourceGroupStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: ToggleMotivationSourceGroupStatusArgs) => MotivationServices.toggleMotivationSourceGroupStatus(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATION_SOURCE_GROUPS);
    },
  });
};

const useUpdateSourceGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateSourceGroupArgs) => MotivationServices.updateSourceGroup(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATION_SOURCE_GROUPS);
    },
  });
};

const useUpdateSourceGroupSourcesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateSourceGroupSourcesArgs) => MotivationServices.updateSourceGroupSources(args),
    onSuccess: () => {
      queryClient.refetchQueries(LIST_MOTIVATION_SOURCE_GROUPS);
    },
  });
};

export default {
  useListMotivationsQuery,
  useListMotivationSourcesQuery,
  useDrivingForDollarsMotivationQuery,
  useMotivationSourceQuery,
  useListMotivationSourceGroups,
  useMotivationGroupsQuery,
  useUpdateMotivationsMutation,
  useToggleMotivationSourceStatusMutation,
  useUpdateMotivationSourcesMutation,
  useToggleMotivationSourceGroupStatusMutation,
  useUpdateSourceGroupMutation,
  useUpdateSourceGroupSourcesMutation,
};
