import { useQuery } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { CustomerSupportServices } from '../../services';

const { SUPPORT_EFFECTIVE_DATES } = Constants.QUERIES;

const useSupportEffectiveDates = () => {
  const { data, isLoading } = useQuery(SUPPORT_EFFECTIVE_DATES, CustomerSupportServices.listEffectiveDates, {
    refetchOnWindowFocus: false,
  });

  return { effectiveDates: data?.effectiveDates ?? [], effectiveDatesIsLoading: isLoading };
};

export default { useSupportEffectiveDates };
