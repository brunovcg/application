import i18next from 'i18next';
import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import Constants from '../../../utils/constants/Constants';
import { Alert, JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { ListAddressAutocompleteResponse } from './SmartyStreets.services.types';

const { baseUrl: smartyStreetsBaseURL } = ServicesEndpointsConfigs.smartyStreets;
const { UNPROCESSABLE_CONTENT } = Constants.HTTP_STATUS;

const baseURL = Environment.configServiceBaseURL({
  production: smartyStreetsBaseURL,
  staging: smartyStreetsBaseURL,
  development: smartyStreetsBaseURL,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class SmartyStreetsServices {
  static listAutocompleteAddress(address: string) {
    return http.get<ListAddressAutocompleteResponse>({
      URL: `/lookup?key=${Environment.getVariable('SMARTY_STREETS_KEY')}&search=${address}`,
      errorHandling: [{ code: UNPROCESSABLE_CONTENT, handler: () => Alert.error(i18next.t('HTTP.Errors.NetworkError')) }],
    });
  }
}

export default SmartyStreetsServices;
