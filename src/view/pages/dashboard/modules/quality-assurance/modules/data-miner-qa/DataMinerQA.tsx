import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { Section } from '../../../../../../components';
import { useMemo, useState, createContext } from 'react';
import { DateTimeHelper } from '../../../../../../../utils/helpers';
import StyledDataMinerQA from './DataMinerQA.styled';
import DataMinerQAQueryMiner from './components/DataMinerQAQueryMiner';
import { AddressMotivationSubmission } from '../../../../../../../apis/services/address-services/Address.services.types';
import DataMinerQAAssessed from './components/DataMinerQAAssessed';
import { Assessed, DataMinerQAContextProps, SelectedDisplay } from './DataMinerQA.types';
import DataMinerQAFilters from './components/data-miner-qa-filters/DataMinerQAFilters';
import { DataMinerQAFilterCriteria } from '../../../../../../../apis/queries/address/types';
import DataMinerQAQueryAddress from './components/DataMinerQAQueryAddress';
import { USState } from '../../../../../../../apis/services/states-services/States.services.types';

const { getLastWeekRange } = DateTimeHelper;

export const DataMinerQAContext = createContext<DataMinerQAContextProps>({} as DataMinerQAContextProps);

export default function DataMinerQA() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA');
  const { end, start } = getLastWeekRange();
  const displayQuery = t(path('DisplayQuery'));
  const hideAssessed = t(path('DoNotDisplayAssessed'));
  const displayOnlyAssessed = t(path('DisplayOnlyAccessed'));
  const [filterCriteria, setFilterCriteria] = useState<DataMinerQAFilterCriteria>('data-miner');
  const [selectedDataMiner, setSelectedDataMiner] = useState<number | null>(null);
  const [dates, setDates] = useState([new Date(start), new Date(end)]);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedUSState, setSelectedUSState] = useState<USState | null>(null);
  const [assessed, setAssessed] = useState<Assessed>({ ids: [], items: [] });
  const [selectedDisplay, setSelectedDisplay] = useState<SelectedDisplay>(displayQuery);
  const [typedSearch, setTypedSearch] = useState('');
  const [addressAutocompleteOptions, setAddressAutocompleteOptions] = useState<string[] | null>(null);
  const [addressAutoCompleteIsLoading, setAddressAutoCompleteIsLoading] = useState(false);
  const [selectedAutocompleteAddress, setSelectedAutocompleteAddress] = useState<string | null>(null);

  const resetFilterStates = () => {
    setSelectedCounty(null);
    setSelectedUSState(null);
    setSelectedAutocompleteAddress(null);
    setAddressAutocompleteOptions(null);
  };

  const isMinerQuery = filterCriteria === 'data-miner';

  const addAssessed = (newAssessed: AddressMotivationSubmission) =>
    setAssessed((state) => {
      if (state.ids.includes(newAssessed.id)) {
        const itemToUpdateIndex = state.items.findIndex((item) => item.id === newAssessed.id);
        const newItems = [...state.items];
        newItems.splice(itemToUpdateIndex, 1, newAssessed);
        return {
          ids: state.ids,
          items: newItems,
        };
      }
      return {
        ids: [...state.ids, newAssessed.id],
        items: [...state.items, newAssessed],
      };
    });

  const isOnlyAssessedSelected = selectedDisplay === displayOnlyAssessed;

  const dataMinerQAProviderValues = useMemo(
    () => ({
      displayQuery,
      hideAssessed,
      displayOnlyAssessed,
      assessed,
      setSelectedDisplay,
      dates,
      selectedDataMiner,
      setSelectedDataMiner,
      isOnlyAssessedSelected,
      filterCriteria,
      setSelectedUSState,
      setDates,
      setSelectedCounty,
      setFilterCriteria,
      addAssessed,
      selectedCounty,
      selectedUSState,
      typedSearch,
      setTypedSearch,
      addressAutocompleteOptions,
      setAddressAutocompleteOptions,
      resetFilterStates,
      addressAutoCompleteIsLoading,
      setAddressAutoCompleteIsLoading,
      selectedAutocompleteAddress,
      setSelectedAutocompleteAddress,
    }),
    [
      displayQuery,
      hideAssessed,
      displayOnlyAssessed,
      assessed,
      setSelectedDisplay,
      dates,
      selectedDataMiner,
      setSelectedDataMiner,
      isOnlyAssessedSelected,
      filterCriteria,
      setSelectedUSState,
      setDates,
      setSelectedCounty,
      setFilterCriteria,
      addAssessed,
      selectedCounty,
      selectedUSState,
      typedSearch,
      setTypedSearch,
      addressAutocompleteOptions,
      setAddressAutocompleteOptions,
      addressAutoCompleteIsLoading,
      selectedAutocompleteAddress,
    ]
  );

  return (
    <StyledDataMinerQA className="im-data-miner-qa">
      <DataMinerQAContext.Provider value={dataMinerQAProviderValues}>
        <DataMinerQAFilters />
        <Section maxWidth="1500px" contentClassName="im-data-miner-qa-table-wrapper">
          {!isOnlyAssessedSelected && isMinerQuery && <DataMinerQAQueryMiner />}
          {!isOnlyAssessedSelected && !isMinerQuery && <DataMinerQAQueryAddress />}
          {isOnlyAssessedSelected && <DataMinerQAAssessed />}
        </Section>
      </DataMinerQAContext.Provider>
    </StyledDataMinerQA>
  );
}
