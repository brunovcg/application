import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import GeneratePostCards from './modules/generate-post-cards/GeneratePostCards';
import ProcessStatus from './modules/process-status/ProcessStatus';
import { useRef } from 'react';
import { DashboardLayoutTabRef } from '../../../../layouts/modules/dashboard-layout/DashboardLayout.types';
import DefaultParameters from './modules/default-parameters/DefaultParameters';
import useProcessRunnerPermissions from './ProcessRunner.permissions';
import GenerateSkipTraceRequest from './modules/generate-skip-trace-request/GenerateSkipTraceRequest';

export default function ProcessRunner() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner');

  const generatePostCards = t(path('GeneratePostCards.Title'));
  const generateSkipTraceRequest = t(path('GenerateSkipTraceRequest.Title'));
  const processStatus = t(path('ProcessStatus.Title'));
  const defaultParameters = t(path('DefaultParameters.Title'));

  const tabsRef = useRef<DashboardLayoutTabRef<string>>(null);

  const redirectProcessRunner = () => tabsRef.current?.selectTab(processStatus);

  const permit = useProcessRunnerPermissions();

  const modules = [
    {
      name: generatePostCards,
      component: <GeneratePostCards redirectProcessRunner={redirectProcessRunner} />,
      hide: !permit.generatePostCards,
    },
    {
      name: generateSkipTraceRequest,
      component: <GenerateSkipTraceRequest redirectProcessRunner={redirectProcessRunner} />,
      hide: !permit.generateSkipTraceRequest,
    },
    { name: processStatus, component: <ProcessStatus />, hide: !permit.processStatus },
    { name: defaultParameters, component: <DefaultParameters />, hide: !permit.defaultParameters },
  ];

  return (
    <div className="im-process-runner">
      <DashboardLayout modules={modules} ref={tabsRef} />
    </div>
  );
}
