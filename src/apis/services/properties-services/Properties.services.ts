import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { PropertyTypeNames } from '../../queries/user/types';
import { DefaultPropertyPrioritiesResponse } from './Properties.services.types';

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

abstract class PropertiesServices {
  static getDefaultPriorities(countyId: number, customerUsername: string, typeOfProperty: PropertyTypeNames) {
    return http.get<DefaultPropertyPrioritiesResponse>({
      URL: `get-default-priorities2?countyId=${countyId}&username=${customerUsername}&type=${typeOfProperty}`,
    });
  }
}

export default PropertiesServices;
