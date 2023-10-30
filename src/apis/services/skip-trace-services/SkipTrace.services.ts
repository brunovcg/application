import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { DOMHelper, JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  GenerateMultipleSkipTraceArgs,
  GenerateMultipleSkipTracePayload,
  GenerateMultipleSkipTraceResponse,
  GetLastRequestStatusByUserCountiesArgs,
  GetLastSkipTraceStatus,
  GetOneSkipTraceArgs,
  GetSkipTraceResponse,
} from './SkipTrace.services.types';

const { downloadFile } = DOMHelper;

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

abstract class SkipTracesServices {
  static getLastRequestStatusByUserCounties({ params, ...rest }: GetLastRequestStatusByUserCountiesArgs) {
    return http.get<GetLastSkipTraceStatus>({
      URL: `/admin/get-last-skip-trace-request-status?username=${params.username}&counties=${params.counties.join(',')}`,
      ...rest,
    });
  }

  static async downloadByTaskId(taskId: number) {
    const file = await http.get<File>({ URL: `/admin/download-skip-trace-request?taskId=${taskId}`, responseType: 'blob' });
    downloadFile({ file, filename: `Post Cards - Task ${taskId}.csv` });
  }

  static getOne({ params, ...rest }: GetOneSkipTraceArgs) {
    return http.get<GetSkipTraceResponse>({
      URL: `/skip-trace-requests?username=${params.username}&counties=${params.counties.join(',')}&ownerTypes=${params.ownerType.join(
        ','
      )}&vendor=${params.vendor}&skipTraceCount=${params.count}&undeliverable=${params.undeliverable}&allowRankingsInProgress=false`,
      ...rest,
    });
  }

  static generateMultiple(args: GenerateMultipleSkipTraceArgs) {
    return http.post<GenerateMultipleSkipTracePayload, GenerateMultipleSkipTraceResponse>({
      URL: '/skip-trace-requests?allowRankingsInProgress=false',
      ...args,
    });
  }
}

export default SkipTracesServices;
