import { useMutation, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { SkipTracesServices } from '../../services';
import { GenerateMultipleSkipTraceArgs } from '../../services/skip-trace-services/SkipTrace.services.types';

const { LIST_CUSTOMERS_SUBSCRIPTIONS } = Constants.QUERIES;

const useGenerateMultipleSkipTraceRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, onSuccess: onSuccessArgs, onError }: GenerateMultipleSkipTraceArgs) =>
      SkipTracesServices.generateMultiple({
        payload,
        onError,
        onSuccess: (res) => {
          queryClient.refetchQueries([LIST_CUSTOMERS_SUBSCRIPTIONS]);
          onSuccessArgs(res);
        },
      }),
  });
};

export default { useGenerateMultipleSkipTraceRequestMutation };
