/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CountDown,
  DateRangePicker,
  Form,
  InputText,
  Section,
  Selector,
  ServerControlledTable,
  UserFeedback,
} from '../../../../../../components';
import useProcessStatusColumns from './hooks/useProcessStatusColumns';
import { processStatusQueries } from '../../../../../../../apis/queries';
import StyledProcessStatus from './ProcessStatus.styled';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { QueueList } from '../../../../../../../apis/services/process-status-services/ProcessStatus.services.types';
import Constants from '../../../../../../../utils/constants/Constants';
import useProcessStatusFilters from './hooks/use-process-status-filters/useProcessStatusFilters';
import DateTimeHelper from '../../../../../../../utils/helpers/modules/DateTime.helper';
import { DatePickerDates } from '../../../../../../components/modules/form-group/date-picker/DatePicker.types';
import { DataHelper } from '../../../../../../../utils/helpers';
import { object } from 'yup';

const { toStartOfDay, toEndOfTheDay } = DateTimeHelper;
const { useListProcessStatus } = processStatusQueries;
const { PROCESS_STATUS } = Constants;

export default function ProcessStatus() {
  const columns = useProcessStatusColumns();

  const { filters, updateFilter, isEmptyFilter } = useProcessStatusFilters();
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.ProcessStatus');

  const { data, controller, fetchProcessStatus, appliedFilters, loading } = useListProcessStatus({ filters, onError: () => {} });

  const handleDate = (value: DatePickerDates, type: 'start' | 'end') => {
    if (!Array.isArray(value)) {
      return '';
    }

    if (type === 'start' && value[0] instanceof Date) {
      return toStartOfDay(value[0]).toISOString();
    }

    if (type === 'end' && value[1] instanceof Date) {
      return toEndOfTheDay(value[1]).toISOString();
    }
  };

  const isRefreshable = !isEmptyFilter && !!data?.length && DataHelper.areObjectsDeepEqual(appliedFilters, filters);
  const isSubmitable = !isEmptyFilter && !DataHelper.areObjectsDeepEqual(appliedFilters, filters);

  return (
    <StyledProcessStatus className="im-process-status">
      <Form schema={object()} onSubmit={() => {}} formName={'process-status'} defaultSubmit={false}>
        <Section contentClassName="im-process-status-filter" sectionTitle={t('Common.Filters')}>
          <InputText
            label={t(path('Filters.ProcessId'))}
            maxWidth="140px"
            onBlur={(payload) => updateFilter({ type: 'processId', payload })}
            name="processId"
            showError={false}
          />
          <InputText
            label={t(path('Filters.UserId'))}
            maxWidth="140px"
            onBlur={(payload) => updateFilter({ type: 'userId', payload })}
            name="userId"
            showError={false}
          />
          <InputText
            label={t(path('Filters.Name'))}
            maxWidth="240px"
            onBlur={(payload) => updateFilter({ type: 'taskName', payload })}
            name="name"
            showError={false}
          />
          <Selector
            options={Object.keys(PROCESS_STATUS)}
            label={t(path('Filters.Status'))}
            allowSearch={false}
            onSelect={([payload]) => updateFilter({ type: 'taskStatus', payload: PROCESS_STATUS[payload as keyof typeof PROCESS_STATUS] })}
            name="status"
            showError={false}
          />
          <Selector
            options={QueueList as unknown as string[]}
            label={t(path('Filters.Queue'))}
            allowSearch={false}
            onSelect={([payload]) => updateFilter({ type: 'queue', payload })}
            name="queue"
            showError={false}
          />
          <DateRangePicker
            label={t(path('Filters.CreatedDate'))}
            initNull
            onSelect={(value) => {
              updateFilter({ type: 'createDateStart', payload: handleDate(value, 'start') });
              updateFilter({ type: 'createDateEnd', payload: handleDate(value, 'end') });
            }}
            name="createDate"
            showError={false}
          />
          <DateRangePicker
            label={t(path('Filters.FinishedDate'))}
            initNull
            onSelect={(value) => {
              updateFilter({ type: 'finishedDateStart', payload: handleDate(value, 'start') });
              updateFilter({ type: 'finishedDateEnd', payload: handleDate(value, 'end') });
            }}
            name="finishedDate"
            showError={false}
          />
          <InputText
            label={t(path('Filters.CustomerName'))}
            maxWidth="240px"
            onBlur={(payload) => updateFilter({ type: 'customerName', payload })}
            name="customerName"
            showError={false}
          />

          <Button text={t('Common.Submit')} icon="done" disabled={!isSubmitable} onClick={fetchProcessStatus} />
          <Button text={t('Common.Refresh')} icon="retry" disabled={!isRefreshable} onClick={fetchProcessStatus} />
          {isSubmitable ||
            (isRefreshable && <CountDown seconds={30} timeUpCallback={fetchProcessStatus} blink label={t(path('Refreshing'))} />)}
        </Section>
      </Form>
      <Section>
        <ServerControlledTable
          info={t(path('Download'))}
          columns={columns}
          data={data}
          paginate={[10, 25, 50]}
          controller={controller}
          allowExportCSV={false}
          allowExportExcel={false}
        />
        {isEmptyFilter && !loading && <UserFeedback message={t(path('SelectFilter'))} variant="warning" />}
        {!isEmptyFilter && !data && !loading && <UserFeedback message={t(path('SubmitFilter'))} variant="warning" />}
      </Section>
    </StyledProcessStatus>
  );
}
