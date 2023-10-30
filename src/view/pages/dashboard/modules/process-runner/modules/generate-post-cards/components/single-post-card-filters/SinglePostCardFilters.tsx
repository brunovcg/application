import { useTranslation } from 'react-i18next';
import { Button, Checkbox, InputNumber, Selector, SelectorCustomer } from '../../../../../../../../components';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { countiesQueries, parametersQueries } from '../../../../../../../../../apis/queries';
import { useEffect, useRef, useState } from 'react';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { InputNumberRef } from '../../../../../../../../components/modules/form-group/input-number/InputNumber.types';
import { PostCardsServices } from '../../../../../../../../../apis/services';
import { SelectorCustomerRef } from '../../../../../../../../components/modules/form-group/selector-customer/SelectorCustomer.types';
import CheckTaskStatusAlert from '../../../../../../../../alerts/check-task-status-alert/CheckTaskStatusAlert';
import { Alert } from '../../../../../../../../../utils/helpers';

const { useListCountiesByCustomerQuery } = countiesQueries;

const { useGetParametersQuery } = parametersQueries;

export default function SinglePostCardFilters() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GeneratePostCards');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [byPass, setByPass] = useState(false);
  const [countiesIds, setCountiesIds] = useState<number[]>([]);
  const { parameters } = useGetParametersQuery();

  const { customerStateCountyNames, customerCounties, customerCountiesIsLoading } = useListCountiesByCustomerQuery(
    selectedCustomer as string
  );

  const countiesRef = useRef<SelectorRef>(null);
  const countRef = useRef<InputNumberRef>(null);
  const customerRef = useRef<SelectorCustomerRef>(null);

  const handleSelectCounties = (countiesNames: string[]) =>
    setCountiesIds(countiesNames.map((countyName) => customerCounties.find((county) => county.stateCounty === countyName)?.id) as number[]);

  const reset = () => {
    setByPass(false);
    countRef.current?.resetInputValue();
    countiesRef.current?.clearSelector();
    customerRef.current?.clearSelector();
    setSelectedCustomer(null);
    setCountiesIds([]);
  };

  const handleClick = () => {
    if (!selectedCustomer) {
      return;
    }

    PostCardsServices.getOne({
      params: { customerUsername: selectedCustomer, countiesIds: countiesIds, count, bypassABFilter: byPass },
      onSuccess: (res) => {
        Alert.process(
          <CheckTaskStatusAlert
            taskId={res.id}
            loadingMessage={t(path('SinglePostCardFilters.Loading'), { taskId: res.id })}
            successMessage={t(path('SinglePostCardFilters.Completed'), { taskId: res.id })}
          />
        );
        reset();
      },
      onError: () => Alert.error(t(path('SinglePostCardFilters.RequestError'))),
    });

    reset();
  };

  const isDisabledButton = !countiesIds.length || !count || !selectedCustomer;
  const initialCount = parameters?.postCardCount !== undefined ? String(parameters?.postCardCount) : undefined;

  useEffect(() => {
    countiesRef.current?.clearSelector();
  }, [selectedCustomer]);

  useEffect(() => {
    if (parameters?.postCardCount) {
      setCount(parameters?.postCardCount);
    }
  }, [parameters?.postCardCount]);

  const customerPlaceholder = () => {
    if (!selectedCustomer) {
      return t(path('SinglePostCardFilters.SelectACostumer'));
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
      <Checkbox label={t(path('Bypass'))} onClick={() => setByPass((state) => !state)} checked={byPass} />
      <Button text={t('Common.Download')} icon="fileDownload" onClick={handleClick} disabled={isDisabledButton} />
    </>
  );
}
