import { Environment, ServicesEndpointsConfigs } from '../../../configs';

import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { ListDemographicsByUserIdAndDateArgs, ListDemographicsByUserIdAndDateResponse } from './Demographics.services.types';

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class DemographicsServices {
  static listByUserIdAndDate(args: ListDemographicsByUserIdAndDateArgs) {
    return http.get<ListDemographicsByUserIdAndDateResponse>({
      URL: `demographics?userId=${args.userId}&fromDate=${args.dateFrom}&toDate=${args.dateTo}`,
    });
  }
}

export default DemographicsServices;
