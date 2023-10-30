import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  UploadAttachmentResponse,
  EffectiveDatesResponse,
  CreateTicketPayload,
  UploadAttachmentArgs,
  CreateTicketArgs,
} from './CustomerSupport.services.types';

const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;

const APPLICATION_JSON = 'application/json';

const baseURL = Environment.configServiceBaseURL({
  production: `${production}/customer-support`,
  staging: `${staging}/customer-support`,
  development: `${development}/customer-support`,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
});

abstract class CustomerSupportServices {
  static uploadAttachment(args: UploadAttachmentArgs) {
    const { payload, ...rest } = args;
    return http.post<FormData, UploadAttachmentResponse>({
      URL: 'upload-attachment',
      payload,
      ...rest,
    });
  }

  static createTicket(args: CreateTicketArgs) {
    const { payload, ...rest } = args;
    return http.post<CreateTicketPayload, Record<never, never>>({
      URL: 'create-ticket',
      payload,
      overrideHeaders: {
        'Content-Type': APPLICATION_JSON,
        'Accept': APPLICATION_JSON,
      },
      ...rest,
    });
  }

  static listEffectiveDates() {
    return http.get<EffectiveDatesResponse>({
      URL: 'effective-dates',
      overrideHeaders: {
        'Content-Type': APPLICATION_JSON,
        'Accept': APPLICATION_JSON,
      },
    });
  }
}

export default CustomerSupportServices;
