import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  AdAudience,
  AddConfigurationArgs,
  AddConfigurationPayload,
  AdSense,
  GenerateAudienceArgs,
  ListCustomerAudiencesArgs,
  ListCustomerConfigurationsArgs,
  ListConfiguredCustomers,
  UpdateConfigurationArgs,
  UpdateConfigurationPayload,
  DeleteAudienceArgs,
} from './AdSense.services.types';

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

abstract class AdSenseServices {
  static addConfiguration({ payload, ...rest }: AddConfigurationArgs) {
    return http.post<AddConfigurationPayload, AdSense>({ URL: '/adsense-configuration', payload, ...rest });
  }

  static updateConfiguration({ payload, params, ...rest }: UpdateConfigurationArgs) {
    return http.patch<UpdateConfigurationPayload, AdSense>({ URL: `/adsense-configuration/${params.adSenseId}`, payload, ...rest });
  }

  static listCustomerConfigurations({ params, ...rest }: ListCustomerConfigurationsArgs) {
    return http.get<AdSense[]>({ URL: `/adsense-configuration/customer/${params.customerId}`, ...rest });
  }

  static generateAudience(args: GenerateAudienceArgs) {
    const { params, ...rest } = args;
    const { customerId, audienceName } = params;

    /* // TODO: we will need to implement "adSenseType" param once we activate Bing or Google as a AD platform
      const mappedAdSenseTypes = adSenseTypes.map((item) => `adSenseType=${item}`).join('&');
     const adSenseTypesParams = mappedAdSenseTypes ? `&${mappedAdSenseTypes}` : '';
    */

    return http.post<FormData, Record<never, never>>({
      URL: `/adsense/create-audience?customerId=${customerId}&audienceName=${audienceName}`,
      overrideHeaders: {},
      ...rest,
    });
  }

  static listCustomerAudiences(args: ListCustomerAudiencesArgs) {
    return http.get<AdAudience[]>({ URL: `/adsense/get-audiences/${args.params.customerId}` });
  }

  static listConfiguredCustomers() {
    return http.get<ListConfiguredCustomers>({ URL: 'admin/customer/adsense' });
  }

  static deleteAudience(args: DeleteAudienceArgs) {
    const { params, ...rest } = args;
    const { audienceType, audienceId } = params;
    return http.delete<Record<never, never>>({ URL: `/adsense/delete-audience/${audienceType}/${audienceId}`, ...rest });
  }
}

export default AdSenseServices;
