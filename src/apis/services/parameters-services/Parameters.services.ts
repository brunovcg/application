import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { OptionalIMParameters, UpdateParametersArgs, IMParametersWithID } from './Parameters.services.types';

const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;

const baseURL = Environment.configServiceBaseURL({
  production: `${production}/admin`,
  staging: `${staging}/admin`,
  development: `${development}/admin`,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class ParametersServices {
  static get() {
    return http.get<IMParametersWithID>({ URL: '/parameters' });
  }

  static update({ params, ...args }: UpdateParametersArgs) {
    return http.patch<OptionalIMParameters, IMParametersWithID>({ URL: `/parameters/${params.id}`, ...args });
  }
}

export default ParametersServices;
