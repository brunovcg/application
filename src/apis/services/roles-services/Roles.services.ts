import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { ListDataMinersResponse } from './Roles.services.types';

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

abstract class RolesServices {
  static listDataMiners() {
    return http.get<ListDataMinersResponse>({ URL: '/roles/DATA_MINING_ROLE/users' });
  }
}

export default RolesServices;
