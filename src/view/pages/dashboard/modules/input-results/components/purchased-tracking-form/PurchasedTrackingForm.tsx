import {
  DatePicker,
  Form,
  CheckboxGroup,
  InputCurrency,
  MessageContainer,
  Button,
  SelectorCustomer,
  Autocomplete,
  Readonly,
} from '../../../../../../components';
import { useRef, useState } from 'react';
import { purchasedPropertiesQueries } from '../../../../../../../apis/queries';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import './PurchasedTrackingForm.scss';
import Constants from '../../../../../../../utils/constants/Constants';
import { FormRef } from '../../../../../../components/modules/form-group/form/Form.types';
import { InputTextRef } from '../../../../../../components/modules/form-group/input-text/InputText.types';
import { DatePickerRef } from '../../../../../../components/modules/form-group/date-picker/DatePicker.types';
import { CheckboxGroupRef } from '../../../../../../components/modules/form-group/checkbox-group/CheckboxGroup.types';
import Section from '../../../../../../components/modules/section/Section';
import { SelectorRef } from '../../../../../../components/modules/form-group/selector/Selector.types';
import { purchasedTrackingFormSchema, schemaFields } from './PurchasedTrackingForm.schema';
import { PurchasedPropertiesPayload } from '../../../../../../../apis/services/purchased-properties-services/PurchasedProperties.services.types';
import { SessionUser } from '../../../../../../../contexts/modules/user-session/UserSessionContext.types';
import { AddressSuggestion } from '../../../../../../../apis/services/smarty-streets-services/SmartyStreets.services.types';
import { SmartyStreetsServices } from '../../../../../../../apis/services';
import { MappedAutocompleteOptions } from './PurchasedTrackingForm.types';
import { AutocompleteRef } from '../../../../../../components/modules/form-group/autocomplete/Autocomplete.types';
import { Alert } from '../../../../../../../utils/helpers';

const { useAddPurchasedPropertiesMutation } = purchasedPropertiesQueries;
const { DML, HSC, HST, STC, STT, OTH } = Constants.DEAL_SOURCES;
const { NOT_NUMBER } = Constants.REGEX;

export default function PurchasedTrackingForm() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.InputResults');
  const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion>({} as AddressSuggestion);
  const [selectedCustomer, setSelectedCustomer] = useState([0]);
  const [autocompleteOptions, setAutocompleteOptions] = useState<AddressSuggestion[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const { mutate, isLoading } = useAddPurchasedPropertiesMutation();

  const mappedAutocompleteOptions = autocompleteOptions.reduce(
    (acc, current) => {
      const stringify = `${current.street_line} • ${current.city}: ${current.state} • ${current.zipcode} ${
        current.secondary ? ' • ' + current.secondary : ''
      }`;
      acc.displayOptions.push(stringify);
      acc.indexedOptions[`${stringify}`] = { ...current };

      return acc;
    },
    { displayOptions: [], indexedOptions: {} } as MappedAutocompleteOptions
  );

  const formRef = useRef<FormRef>(null);
  const customerRef = useRef<SelectorRef>(null);
  const addressRef = useRef<InputTextRef>(null);
  const cityRef = useRef<InputTextRef>(null);
  const stateRef = useRef<SelectorRef>(null);
  const zipCodeRef = useRef<InputTextRef>(null);
  const currencyRef = useRef<InputTextRef>(null);
  const datePickerRef = useRef<DatePickerRef>(null);
  const checkboxRef = useRef<CheckboxGroupRef>(null);
  const autocompleteRef = useRef<AutocompleteRef>(null);

  const dealOptions = [
    { id: 1, label: t(path('DirectMail')), value: DML.initial, checked: false },
    { id: 2, label: t(path('HotSheetColdCalling')), value: HSC.initial, checked: false },
    { id: 3, label: t(path('HotSheetTexting')), value: HST.initial, checked: false },
    { id: 4, label: t(path('SkipTraceColdCalling')), value: STC.initial, checked: false },
    { id: 5, label: t(path('SkipTraceTexting')), value: STT.initial, checked: false },
    { id: 6, label: t(path('Other')), value: OTH.initial, checked: false },
  ];

  const onSubmit = (
    payload: typeof schemaFields & {
      customer: [SessionUser];
      dealSource: typeof dealOptions;
    }
  ) => {
    const { purchaseDate, dealSource, profit } = payload;

    const mappedPayload = {
      data: {
        customerId: selectedCustomer[0],
        streetName: selectedAddress.street_line,
        city: selectedAddress.city,
        zipCode: selectedAddress.zipcode,
        state: selectedAddress.state,
        dealSources: dealSource.map((item) => item.value),
        purchaseDate,
        profit: (profit as unknown as string)?.replace(NOT_NUMBER, ''),
      } as unknown as PurchasedPropertiesPayload,
      onError: () => Alert.error(t('HTTP.Errors.NetworkError')),
      onSuccess: () => {
        customerRef.current?.clearSelector();
        addressRef.current?.clearInputValue();
        cityRef.current?.clearInputValue();
        stateRef.current?.clearSelector();
        zipCodeRef.current?.clearInputValue();
        currencyRef.current?.clearInputValue();
        datePickerRef.current?.resetDatePicker();
        checkboxRef.current?.clearCheckboxes();
        autocompleteRef.current?.clearAutocomplete();
        setSelectedAddress({} as AddressSuggestion);

        Alert.info(t(path('PropertyAdded')));

        formRef.current?.setFocus('address');
      },
    };

    mutate(mappedPayload);
  };

  const handleAddressSearch = async (value: string) => {
    if (!value) {
      return;
    }

    setIsLoadingOptions(true);
    const res = await SmartyStreetsServices.listAutocompleteAddress(value);
    const { suggestions } = res ?? {};
    if (suggestions?.length) {
      setAutocompleteOptions(suggestions);
    }
    setIsLoadingOptions(false);
  };

  return (
    <Section className="im-purchased-properties-form-wrapper" icon="form" sectionTitle={t(path('PurchasedTrackingForm'))}>
      <Form
        onSubmit={onSubmit}
        schema={purchasedTrackingFormSchema}
        className="im-purchased-properties-form"
        ref={formRef}
        submitOnEnter
        defaultSubmit={false}
        formName="purchased-properties"
      >
        <SelectorCustomer name="customer" width="250px" ref={customerRef} outputFormat="id" onSelect={setSelectedCustomer} showError />
        <Autocomplete
          asyncOptions={mappedAutocompleteOptions.displayOptions}
          onSelect={(value) => {
            setSelectedAddress(mappedAutocompleteOptions.indexedOptions[`${value}`]);
            currencyRef.current?.focus();
          }}
          label={t(path('AddressSearched'))}
          onType={() => setAutocompleteOptions([])}
          onStopTyping={handleAddressSearch}
          loading={isLoadingOptions}
          name="addressSearch"
          ref={autocompleteRef}
        />
        <div className="im-purchased-properties-form-address">
          <Readonly text={selectedAddress?.street_line} label={t(path('Address'))} width="300px" />
          <Readonly text={selectedAddress?.city} label={t(path('City'))} width="260px" />
          <Readonly text={selectedAddress?.state} label={t(path('State'))} width="80px" />
          <Readonly text={selectedAddress?.zipcode} label={t(path('ZipCode'))} width="100px" />
        </div>
        <InputCurrency label={t(path('Profit'))} canReset width="260px" name="profit" ref={currencyRef} />
        <DatePicker name="purchaseDate" initDate={new Date()} label={t(path('PurchasedDate'))} ref={datePickerRef} />
        <MessageContainer text={t(path('Check'))} fontSize="medium" width="100%" variant="info" />
        <CheckboxGroup options={dealOptions} label={t(path('DealSource'))} name="dealSource" row width="100%" showError ref={checkboxRef} />
        <div className="im-purchased-property-submit">
          <Button text={t('Common.Submit')} icon="done" loading={isLoading} type="submit" />
        </div>
      </Form>
    </Section>
  );
}
