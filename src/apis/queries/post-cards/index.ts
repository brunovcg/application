import { useMutation, useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { PostCardsServices } from '../../services';
import { GenerateMultiplePostCardsArgs } from '../../services/post-cards-services/PostCards.services.types';

const { LIST_CUSTOMERS_SUBSCRIPTIONS } = Constants.QUERIES;

const useGenerateMultiplePostCardsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, onSuccess: onSuccessArgs, onError }: GenerateMultiplePostCardsArgs) =>
      PostCardsServices.generateMultiple({
        payload,
        onError,
        onSuccess: () => {
          queryClient.refetchQueries([LIST_CUSTOMERS_SUBSCRIPTIONS]);
          onSuccessArgs();
        },
      }),
  });
};

export default { useGenerateMultiplePostCardsMutation };
