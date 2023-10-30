import { TaskProcess } from '../process-status-services/ProcessStatus.services.types';

export type CheckTaskStatusArgs = {
  params: {
    taskId: number | string;
  };
  onSuccess: (res: TaskProcess) => void;
};
