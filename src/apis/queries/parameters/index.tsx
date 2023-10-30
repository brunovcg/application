import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ParametersServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { UpdateParametersArgs } from '../../services/parameters-services/Parameters.services.types';

const { GET_PARAMETERS } = Constants.QUERIES;

const useGetParametersQuery = () => {
  const { data, isLoading } = useQuery(GET_PARAMETERS, ParametersServices.get, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { parameters: data, parametersIsLoading: isLoading };
};

const useUpdateParametersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: UpdateParametersArgs) =>
      ParametersServices.update({
        params: args.params,
        payload: args.payload,
        onSuccess: () => {
          args.onSuccess();
          queryClient.refetchQueries([GET_PARAMETERS]);
        },
        onError: args.onError,
      }),
  });
};

export default { useGetParametersQuery, useUpdateParametersMutation };
