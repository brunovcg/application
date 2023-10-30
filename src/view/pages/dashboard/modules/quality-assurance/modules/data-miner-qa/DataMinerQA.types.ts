import { Dispatch, SetStateAction } from 'react';
import { AddressMotivationSubmission } from '../../../../../../../apis/services/address-services/Address.services.types';
import i18next from 'i18next';
import { DataMinerQAFilterCriteria } from '../../../../../../../apis/queries/address/types';
import { USState } from '../../../../../../../apis/services/states-services/States.services.types';

const { t } = i18next;

export const selectDisplayList = {
  displayQuery: t('Pages.Dashboard.QualityAssurance.DataMinerQA.DisplayQuery'),
  hideAssessed: t('Pages.Dashboard.QualityAssurance.DataMinerQA.DoNotDisplayAssessed'),
  displayOnlyAssessed: t('Pages.Dashboard.QualityAssurance.DataMinerQA.DisplayOnlyAccessed'),
};

export type SelectedDisplay = (typeof selectDisplayList)[keyof typeof selectDisplayList];

export type Assessed = {
  ids: number[];
  items: AddressMotivationSubmission[];
};

export type DataMinerQAContextProps = {
  displayQuery: string;
  hideAssessed: string;
  displayOnlyAssessed: string;
  assessed: Assessed;
  setSelectedDisplay: Dispatch<SetStateAction<SelectedDisplay>>;
  dates: Date[];
  selectedDataMiner: number | null;
  setSelectedCounty: Dispatch<SetStateAction<string | null>>;
  setSelectedDataMiner: Dispatch<SetStateAction<number | null>>;
  isOnlyAssessedSelected: boolean;
  setSelectedUSState: Dispatch<SetStateAction<USState | null>>;
  setDates: Dispatch<SetStateAction<Date[]>>;
  filterCriteria: DataMinerQAFilterCriteria;
  setFilterCriteria: Dispatch<SetStateAction<DataMinerQAFilterCriteria>>;
  addAssessed: (newAssessed: AddressMotivationSubmission) => void;
  selectedCounty: string | null;
  selectedUSState: USState | null;
  typedSearch: string;
  setTypedSearch: Dispatch<SetStateAction<string>>;
  addressAutocompleteOptions: string[] | null;
  setAddressAutocompleteOptions: Dispatch<SetStateAction<string[] | null>>;
  resetFilterStates: () => void;
  addressAutoCompleteIsLoading: boolean;
  setAddressAutoCompleteIsLoading: Dispatch<SetStateAction<boolean>>;
  selectedAutocompleteAddress: string | null;
  setSelectedAutocompleteAddress: Dispatch<SetStateAction<string | null>>;
};
