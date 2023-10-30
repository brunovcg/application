import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { PurchasedPropertiesPayload, PurchasedPropertiesResponse } from './PurchasedProperties.services.types';

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

abstract class PurchasedPropertiesServices {
  static listByCustomer(customerId: number | string) {
    return http.get<PurchasedPropertiesResponse>({ URL: `purchased-property/customer/${customerId}` });
  }

  static add(payload: PurchasedPropertiesPayload) {
    return http.post({ URL: '/purchased-property', payload });
  }
}

export default PurchasedPropertiesServices;
