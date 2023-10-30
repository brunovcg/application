import { useTranslation } from 'react-i18next';
import { Section, Selector, SelectorCustomer } from '../../../../../../../../components';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { memo, useContext, useRef } from 'react';
import './CustomerCounty.scss';
import { countiesQueries, userQueries } from '../../../../../../../../../apis/queries';
import { CustomerCountyProps } from './CustomerCounty.types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { OriginalCountyByCustomer } from '../../../../../../../../../apis/queries/counties/types';

const { useListCountiesByCustomerQuery } = countiesQueries;
const { useListCustomersQuery } = userQueries;

function CustomerCounty({ username, setUsername, setCounty, customerRef }: CustomerCountyProps) {
  const { setValue, reset, getValues } = useContext(FormContext);

  const countiesSelectRef = useRef<SelectorRef>(null);

  const { customerCounties, customerCountiesIsLoading, customerStateCountyNames } = useListCountiesByCustomerQuery(username);
  const { customerListIsLoading } = useListCustomersQuery();

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.CustomerMarket');

  const handleCountyStateChange = (value: string[]) => {
    const selectedCounty = customerCounties.find((county) => county.stateCounty === value[0]);
    setCounty(selectedCounty as OriginalCountyByCustomer);
    setValue('countyId', selectedCounty?.id);
  };

  const handleChangeCustomer = (selectedUser: string[]) => {
    setUsername(selectedUser[0]);
    countiesSelectRef.current?.clearSelector();
    reset?.();
  };

  const { customer } = getValues();

  return (
    <Section sectionTitle={t(path('Title'))} contentClassName="im-preferences-customer-county" icon="filter">
      <SelectorCustomer
        width="240px"
        name="customer"
        outputFormat="username"
        onSelect={handleChangeCustomer}
        showError={false}
        ref={customerRef}
      />
      <Selector
        ref={countiesSelectRef}
        loading={customerCountiesIsLoading || customerListIsLoading}
        disabled={!username || customerCounties.length === 0}
        width="240px"
        options={customerStateCountyNames}
        name="county"
        label={t(path('Market'))}
        onSelect={handleCountyStateChange as (value: unknown) => void}
        showError={false}
        placeholder={!customer?.length ? t(path('SelectCustomer')) : ''}
      />
    </Section>
  );
}

export default memo(CustomerCounty);
