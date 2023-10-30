import Http from '../../../utils/http/Http';
import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import {
  GetListDownloadLink,
  ListProcessStatusArgs,
  ListProcessStatusPayload,
  ListProcessStatusResponse,
} from './ProcessStatus.services.types';
import { WithPrefix } from '../../../types';

const { getIMToken } = JWTHelper;

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const applicationJson = 'application/json';

const http = new Http({
  baseURL,
  setToken: getIMToken,
  headers: {
    'Content-Type': applicationJson,
    'Accept': applicationJson,
  },
});

abstract class ProcessStatusService {
  static list(args: ListProcessStatusArgs) {
    return http.post<ListProcessStatusPayload, ListProcessStatusResponse>({
      URL: '/admin/process-status',
      ...args,
    });
  }

  static getListDownloadLink({ taskId, ...rest }: GetListDownloadLink) {
    return http.get<WithPrefix<'http'>>({
      URL: `/admin/get-list-download-link?taskId=${taskId}`,
      responseType: 'text',
      overrideHeaders: {
        'Accept': ['text/plain', 'application/json'],
        'Content-Type': 'text/plain',
      },
      ...rest,
    });
  }
}

export default ProcessStatusService;
