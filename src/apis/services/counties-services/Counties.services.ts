import { ServicesEndpointsConfigs, Environment } from '../../../configs';

import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { CountiesResponse } from './Counties.services.types';

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

abstract class CountiesServices {
  static listByCustomer(username: string) {
    return http.get<CountiesResponse>({ URL: `counties?username=${username}` });
  }

  static listByStates(states: string) {
    return http.get<CountiesResponse>({ URL: `admin/counties-by-states?states=${states}` });
  }
}

export default CountiesServices;
