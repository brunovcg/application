import { useTranslation } from 'react-i18next';
import StyledDataMinerQAFilters from './DataMinerQAFilters.styled';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import {
  Autocomplete,
  DateRangePicker,
  Icon,
  MessageContainer,
  Section,
  Selector,
  SelectorUSStates,
  Title,
  Tooltip,
} from '../../../../../../../../components';
import { useMemo, useRef, useContext } from 'react';
import { countiesQueries, demographicsQueries, rolesQueries } from '../../../../../../../../../apis/queries';
import { DataHelper, DateTimeHelper, IMMarketHelper, MaskHelper } from '../../../../../../../../../utils/helpers';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { DataMinerQAFilterCriteria } from '../../../../../../../../../apis/queries/address/types';
import { USState } from '../../../../../../../../../apis/services/states-services/States.services.types';
import useDataMinerQAPermissions from '../../DataMinerQA.permissions';
import { DataMinerQAContext } from '../../DataMinerQA';
import { SelectedDisplay } from '../../DataMinerQA.types';
import { AutocompleteRef } from '../../../../../../../../components/modules/form-group/autocomplete/Autocomplete.types';

const { onlyNumbersMask } = MaskHelper.input;

const { useListDataMinersQuery } = rolesQueries;
const { useListDemographicsByUserDate } = demographicsQueries;
const { toStartOfDay, toEndOfTheDay, getLastWeekRange } = DateTimeHelper;
const { invertObjectKeysValues } = DataHelper;
const { getCountyName } = IMMarketHelper;
const { useListCountiesByStatesQuery } = countiesQueries;

export default function DataMinerQAFilters() {
  const {
    displayQuery,
    hideAssessed,
    displayOnlyAssessed,
    assessed,
    setSelectedDisplay,
    dates,
    selectedDataMiner,
    setSelectedCounty,
    setSelectedDataMiner,
    isOnlyAssessedSelected,
    setSelectedUSState,
    setDates,
    filterCriteria,
    setFilterCriteria,
    setTypedSearch,
    selectedUSState,
    selectedCounty,
    resetFilterStates,
    addressAutoCompleteIsLoading,
    addressAutocompleteOptions,
    setSelectedAutocompleteAddress,
    setAddressAutocompleteOptions,
  } = useContext(DataMinerQAContext);

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA');
  const { end, start } = getLastWeekRange();
  const { data: dataMiners, isLoading: dataMinersIsLoading } = useListDataMinersQuery();
  const dataMiner = t(path('DataMiner'));
  const taxId = t(path('SearchCriteriaList.TaxId'));
  const addressId = t(path('SearchCriteriaList.PropertyId'));
  const propertyAddress = t(path('SearchCriteriaList.PropertyAddress'));
  const { statesCountiesNames, statesCountiesIsLoading } = useListCountiesByStatesQuery(selectedUSState ? [selectedUSState] : null);
  const { permitUpdateVerificationStatus } = useDataMinerQAPermissions();
  const assessedSelectorOptions = [displayQuery, hideAssessed, displayOnlyAssessed];

  const dataMinerCriteria = 'data-miner';

  const isDataMinerCriteria = filterCriteria === dataMinerCriteria;

  const criteriaOptionsMap: Record<string, DataMinerQAFilterCriteria> = {
    [dataMiner]: dataMinerCriteria,
    [taxId]: 'tax-id',
    [addressId]: 'address-id',
    [propertyAddress]: 'property-address',
  };

  const {
    data: marketList,
    isLoading: isLoadingMarkets,
    isSuccess: isSuccessMarkets,
  } = useListDemographicsByUserDate({
    userId: selectedDataMiner,
    dateFrom: toStartOfDay(dates[0]).toISOString(),
    dateTo: toEndOfTheDay(dates[1]).toISOString(),
  });

  const marketPlaceholder = useMemo(() => {
    if (!selectedDataMiner) {
      return t(path('SelectAMiner'));
    }

    if (isSuccessMarkets && !marketList?.marketNames?.length) {
      return t('Common.NoMatches');
    }
    return '';
  }, [selectedDataMiner, marketList, isSuccessMarkets]);

  const stateCountyRef = useRef<SelectorRef>(null);
  const dataMinerRef = useRef<SelectorRef>(null);
  const countyRef = useRef<SelectorRef>(null);
  const stateRef = useRef<SelectorRef>(null);
  const autocompleteRef = useRef<AutocompleteRef>(null);

  const handleStateChange = (statesValues: USState[]) => {
    setSelectedCounty('');
    countyRef.current?.updateValue([]);
    autocompleteRef?.current?.clearAutocomplete();
    setSelectedAutocompleteAddress(null);
    setAddressAutocompleteOptions(null);
    if (statesValues.length) {
      setSelectedUSState(statesValues[0]);
    }
  };

  return (
    <StyledDataMinerQAFilters>
      <Section sectionTitle={t('Common.Query')} contentClassName="im-data-miner-qa-filters " maxWidth="1500px">
        <div className="im-data-miner-qa-filters-row">
          <Selector
            options={Object.keys(criteriaOptionsMap)}
            onSelect={(value) => {
              stateCountyRef.current?.clearSelector();
              dataMinerRef.current?.clearSelector();
              stateRef?.current?.clearSelector();
              countyRef?.current?.clearSelector();
              autocompleteRef?.current?.clearAutocomplete();
              resetFilterStates();
              setFilterCriteria(criteriaOptionsMap[value[0]]);
            }}
            disabled={isOnlyAssessedSelected}
            initValue={[dataMiner]}
            showError={false}
            allowSearch={false}
            allowClear={false}
            allowReset={false}
            label={t(path('SearchCriteria'))}
            width="160px"
          />
          <DateRangePicker
            showError={false}
            initStartDate={start}
            allowClear
            initEndDate={end}
            disabled={isOnlyAssessedSelected}
            onSelect={(value) => {
              if (!value) {
                return;
              }
              if (Array.isArray(value)) {
                const dateFrom = value?.[0];
                const dateTo = value?.[1];
                if (dateFrom && dateTo) {
                  setDates(() => [dateFrom, dateTo]);
                }
              }
            }}
          />
          {!isDataMinerCriteria && (
            <>
              <SelectorUSStates
                onSelect={(value) => handleStateChange(value)}
                showError={false}
                width="250px"
                ref={stateRef}
                disabled={isOnlyAssessedSelected}
              />
              <Selector
                ref={countyRef}
                options={statesCountiesNames ?? []}
                loading={statesCountiesIsLoading}
                disabled={!selectedUSState || isOnlyAssessedSelected}
                label={t(path('Market'))}
                maxWidth="220px"
                onSelect={(value) => setSelectedCounty(getCountyName(value[0]))}
                showError={false}
                placeholder={!selectedUSState ? t(path('SelectState')) : ''}
                testInstance="county-select"
              />
              <Autocomplete
                label={invertObjectKeysValues(criteriaOptionsMap)[`${filterCriteria}`]}
                asyncOptions={addressAutocompleteOptions}
                onStopTyping={(value) => {
                  setTypedSearch(value);
                  setSelectedAutocompleteAddress(null);
                  setAddressAutocompleteOptions(null);
                }}
                onSelect={(value) => setSelectedAutocompleteAddress(value)}
                disabled={!selectedCounty || isOnlyAssessedSelected}
                loading={addressAutoCompleteIsLoading}
                maskFunction={filterCriteria === 'address-id' ? onlyNumbersMask : undefined}
                debounce={1200}
                showError={false}
                ref={autocompleteRef}
              />
            </>
          )}
          {isDataMinerCriteria && (
            <>
              <Selector
                options={dataMiners?.dataMinersNames ?? []}
                onSelect={(value) =>
                  setSelectedDataMiner(dataMiners?.dataMinerList[value?.[0] as keyof typeof dataMiners.dataMinerList]?.userId ?? 0)
                }
                disabled={isOnlyAssessedSelected}
                showError={false}
                label={dataMiner}
                loading={dataMinersIsLoading}
                ref={dataMinerRef}
              />
              <Selector
                options={marketList.marketNames}
                showError={false}
                label={t(path('StateMarket'))}
                disabled={!selectedDataMiner || isOnlyAssessedSelected}
                loading={isLoadingMarkets}
                ref={stateCountyRef}
                onSelect={(value) => {
                  const selected = value[0] as string;
                  setSelectedCounty(marketList.markets[selected as keyof typeof marketList.markets]?.county);
                  setSelectedUSState(marketList.markets[selected as keyof typeof marketList.markets]?.state);
                }}
                placeholder={marketPlaceholder}
              />
            </>
          )}
        </div>
        <div className="im-data-miner-qa-assessed-menu">
          {permitUpdateVerificationStatus && (
            <>
              <Title text={t('Common.Options')} />
              <div className="im-data-miner-qa-assessed-content">
                <div className="im-data-miner-qa-assessed-counter">
                  <Tooltip content={t(path('AssessedTooltip'))} trigger={<Icon icon="info" variant="primary" size="medium" />} />
                  <div className="im-data-miner-qa-assessed-data">
                    <span>{t(path('Assessed'))}</span>
                    <span>{assessed.items.length}</span>
                  </div>
                </div>
                <Selector
                  options={assessedSelectorOptions}
                  initValue={[displayQuery]}
                  allowClear={false}
                  allowReset={false}
                  allowSearch={false}
                  width="200px"
                  label={t(path('DisplayOptions'))}
                  onSelect={(value) => setSelectedDisplay(value[0] as SelectedDisplay)}
                  showError={false}
                />
              </div>
            </>
          )}
          {!permitUpdateVerificationStatus && (
            <MessageContainer variant="warning" text={t(path('ReadonlyMessage'))} width="fit-content" fontSize="medium" />
          )}
        </div>
      </Section>
    </StyledDataMinerQAFilters>
  );
}
