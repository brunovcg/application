import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { InboundCallScorePayload } from './InboundCallScore.services.types';

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

abstract class InboundCallScoreServices {
  static saveInboundCallScore(payload: InboundCallScorePayload) {
    return http.post({
      URL: '/save-inbound-call-score',
      payload,
    });
  }
}

export default InboundCallScoreServices;
