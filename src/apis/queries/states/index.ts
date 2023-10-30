import { useQuery } from 'react-query';
import { StatesServices } from '../../services';
import Constants from '../../../utils/constants/Constants';

const { LIST_STATES } = Constants.QUERIES;

const useListStatesQuery = () => {
  const { data, isLoading } = useQuery(LIST_STATES, StatesServices.list, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { states: data ?? [], statesIsLoading: isLoading };
};

export default { useListStatesQuery };
