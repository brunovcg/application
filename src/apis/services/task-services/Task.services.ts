// admin

import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { TaskProcess } from '../process-status-services/ProcessStatus.services.types';
import { CheckTaskStatusArgs } from './Task.services.types';

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

abstract class TaskServices {
  static checkStatus({ params, onSuccess }: CheckTaskStatusArgs) {
    return http.get<TaskProcess>({ URL: `/admin/check-task-status?taskId=${params.taskId}`, onSuccess });
  }
}

export default TaskServices;
