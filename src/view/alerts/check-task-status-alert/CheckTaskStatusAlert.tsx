import { useEffect, useState } from 'react';
import StyledTaskStatusAlert from './CheckTaskStatusAlert.styled';
import { Button, Icon, LoadingSpinner } from '../../components';
import { SkipTracesServices, TaskServices } from '../../../apis/services';
import { CheckTaskStatusAlertProps } from './CheckTaskStatusAlert.types';
import { useTranslation } from 'react-i18next';
import Constants from '../../../utils/constants/Constants';

export default function CheckTaskStatusAlert({ taskId, loadingMessage, successMessage }: CheckTaskStatusAlertProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { t } = useTranslation();

  const debouncedCheckProcessStatus = () => {
    if (isCompleted) {
      return;
    }
    setTimeout(
      () =>
        TaskServices.checkStatus({
          params: { taskId },
          onSuccess: (res) => {
            if (res.status === Constants.PROCESS_STATUS.Pending) {
              debouncedCheckProcessStatus();
            } else {
              setIsCompleted(true);
            }
          },
        }),
      10000
    );
  };

  useEffect(() => {
    debouncedCheckProcessStatus();
  }, []);

  const handleDownload = () => SkipTracesServices.downloadByTaskId(taskId);

  return (
    <StyledTaskStatusAlert className="im-task-status-alert">
      {!isCompleted && <LoadingSpinner size="tiny" message={loadingMessage} />}
      {isCompleted && (
        <div className="im-task-status-alert-success">
          <div className="im-task-status-alert-success-message">
            <Icon icon="done" variant="valid" size="medium" />
            <p className="im-task-status-alert-success-text"> {successMessage}</p>
          </div>
          <Button text={t('Common.Download')} onClick={handleDownload} styling="text" small />
        </div>
      )}
    </StyledTaskStatusAlert>
  );
}
