import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  ControlledTable,
  InputNumber,
  Section,
  Selector,
  SelectorCustomer,
  UserFeedback,
} from '../../../../../../../../components';
import { countiesQueries, parametersQueries } from '../../../../../../../../../apis/queries';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { InputNumberRef } from '../../../../../../../../components/modules/form-group/input-number/InputNumber.types';
import Constants from '../../../../../../../../../utils/constants/Constants';
import { SelectedOwnerTypes, SelectedVendor } from './SingleSkipTraceRequestFilters.types';
import { SkipTracesServices } from '../../../../../../../../../apis/services';
import { SelectorCustomerRef } from '../../../../../../../../components/modules/form-group/selector-customer/SelectorCustomer.types';
import StyledLastRequestedKipTrace from './SingleSkipTraceRequestFilters.styled';
import useSingleSkipTraceRequestFilterColumns from './SingleSkipTraceRequestFilter.columns';
import { GetLastSkipTraceStatus } from '../../../../../../../../../apis/services/skip-trace-services/SkipTrace.services.types';
import CheckTaskStatusAlert from '../../../../../../../../alerts/check-task-status-alert/CheckTaskStatusAlert';
import { Alert } from '../../../../../../../../../utils/helpers';

const { useListCountiesByCustomerQuery } = countiesQueries;
const { useGetParametersQuery } = parametersQueries;
const { SKIP_TRACE_VENDORS, OWNER_TYPES } = Constants;

export default function SingleSkipTraceRequestFilters() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GenerateSkipTraceRequest.SingleSkipTraceRequestFilters');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedOwnerTypes, setSelectedOwnerTypes] = useState<SelectedOwnerTypes | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<SelectedVendor | null>(null);
  const [undeliverable, setUndeliverable] = useState(false);
  const [count, setCount] = useState(0);
  const [countiesIds, setCountiesIds] = useState<number[]>([]);
  const { customerStateCountyNames, customerCounties, customerCountiesIsLoading } = useListCountiesByCustomerQuery(
    selectedCustomer as string
  );
  const { parameters } = useGetParametersQuery();
  const countiesRef = useRef<SelectorRef>(null);
  const countRef = useRef<InputNumberRef>(null);
  const vendorRef = useRef<SelectorRef>(null);
  const ownerTypesRef = useRef<SelectorRef>(null);
  const customerRef = useRef<SelectorCustomerRef>(null);
  const [lastSkipTraceRequest, setLastSkipTraceRequest] = useState<GetLastSkipTraceStatus>(null as unknown as GetLastSkipTraceStatus);
  const [lastSkipTraceState, setLastSkipTraceState] = useState<'loading' | 'complete' | 'empty'>('empty');
  const initialCount = parameters?.skipTraceCount !== undefined ? String(parameters?.skipTraceCount) : undefined;

  const columns = useSingleSkipTraceRequestFilterColumns();

  const handleSelectCounties = async (countiesNames: string[]) => {
    if (!countiesNames.length) {
      return;
    }

    setLastSkipTraceState('loading');
    const mappedCountiesIds = countiesNames.map(
      (countyName) => customerCounties.find((county) => county.stateCounty === countyName)?.id
    ) as number[];

    setCountiesIds(mappedCountiesIds);
    await SkipTracesServices.getLastRequestStatusByUserCounties({
      params: {
        username: selectedCustomer as string,
        counties: mappedCountiesIds,
      },
      onSuccess: setLastSkipTraceRequest,
    });

    setLastSkipTraceState('complete');
  };

  const handleSelectVendors = (selection: string[]) => setSelectedVendor(selection[0] as SelectedVendor);

  const handleSelectOwnerTypes = (selection: string[]) => setSelectedOwnerTypes(selection as SelectedOwnerTypes);

  const isDisabledButton = !selectedCustomer || !count || !countiesIds.length || !selectedVendor || !selectedOwnerTypes?.length;

  const reset = () => {
    setUndeliverable(false);
    countiesRef.current?.clearSelector();
    customerRef.current?.clearSelector();
    vendorRef.current?.clearSelector();
    ownerTypesRef.current?.clearSelector();
    countRef.current?.resetInputValue();
    setSelectedVendor(null);
    setCountiesIds([]);
    setSelectedOwnerTypes(null);
    setSelectedCustomer(null);
  };

  const handleClick = () => {
    if (!selectedVendor || !selectedCustomer || !selectedOwnerTypes) {
      return;
    }

    SkipTracesServices.getOne({
      params: {
        username: selectedCustomer,
        counties: countiesIds,
        ownerType: selectedOwnerTypes.map((item) => OWNER_TYPES[`${item}`]),
        vendor: SKIP_TRACE_VENDORS[`${selectedVendor}`],
        count,
        undeliverable,
      },
      onSuccess: (res) => {
        Alert.info(
          <CheckTaskStatusAlert
            taskId={res.id}
            loadingMessage={t(path('Loading'), { taskId: res.id })}
            successMessage={t(path('Completed'), { taskId: res.id })}
          />
        );
        reset();
      },
      onError: () => Alert.error(t(path('RequestError'))),
    });
  };

  useEffect(() => {
    countiesRef.current?.clearSelector();

    if (!selectedCustomer) {
      setLastSkipTraceState('empty');
    }

    setCountiesIds([]);
  }, [selectedCustomer]);

  useEffect(() => {
    if (!countiesIds.length) {
      setLastSkipTraceState('empty');
    }
  }, [countiesIds]);

  useEffect(() => {
    if (parameters?.skipTraceCount) {
      setCount(parameters?.skipTraceCount);
    }
  }, [parameters?.skipTraceCount]);

  const customerPlaceholder = () => {
    if (!selectedCustomer) {
      return t(path('SelectACostumer'));
    }

    if (!customerStateCountyNames.length) {
      return t('Common.NoCountiesForCustomer');
    }

    return undefined;
  };

  return (
    <>
      <SelectorCustomer showError={false} onSelect={([value]) => setSelectedCustomer(value)} outputFormat="username" ref={customerRef} />
      <Selector
        options={customerStateCountyNames}
        showError={false}
        label={t(path('Counties'))}
        multiple
        onSelect={handleSelectCounties}
        ref={countiesRef}
        disabled={!selectedCustomer}
        placeholder={customerPlaceholder()}
        loading={customerCountiesIsLoading}
      />
      <InputNumber
        key={initialCount}
        width="150px"
        allowReset={false}
        label={t(path('Count'))}
        onChange={(value) => setCount(Number(value))}
        ref={countRef}
        initialValue={initialCount}
        showError={false}
      />
      <Selector
        options={Object.keys(OWNER_TYPES)}
        allowSearch={false}
        showError={false}
        label={t(path('OwnerTypes'))}
        multiple
        onSelect={handleSelectOwnerTypes}
        ref={ownerTypesRef}
        disabled={!selectedCustomer}
      />
      <Selector
        allowSearch={false}
        options={Object.keys(SKIP_TRACE_VENDORS)}
        showError={false}
        label={t(path('Vendor'))}
        onSelect={handleSelectVendors}
        ref={vendorRef}
        disabled={!selectedCustomer}
      />

      <Checkbox
        label={t(path('UndeliverableMailingAddress'))}
        onClick={() => setUndeliverable((state) => !state)}
        checked={undeliverable}
      />
      <Button text={t('Common.Download')} icon="fileDownload" onClick={handleClick} disabled={isDisabledButton} />
      <StyledLastRequestedKipTrace className="im-last-requested-skip-trace">
        {lastSkipTraceState === 'loading' && (
          <UserFeedback height="140px" fontSize="small" variant="loading" message={t(path('CheckingLastRequest'))} />
        )}
        {lastSkipTraceState === 'complete' && !lastSkipTraceRequest && (
          <UserFeedback height="140px" fontSize="small" variant="info" message={t(path('NoRequest'))} />
        )}
        {lastSkipTraceState === 'empty' && <UserFeedback height="140px" fontSize="small" variant="warning" message={t(path('Empty'))} />}
        {lastSkipTraceRequest && lastSkipTraceState === 'complete' && (
          <Section sectionTitle={t(path('LastRequestTable.Title'))}>
            <ControlledTable
              data={[lastSkipTraceRequest]}
              columns={columns}
              showGlobalFilter={false}
              showCleanFilters={false}
              showColumnSelection={false}
              allowExportCSV={false}
              allowExportExcel={false}
            />
          </Section>
        )}
      </StyledLastRequestedKipTrace>
    </>
  );
}
