import { AddressSuggestion } from '../../../../../../../apis/services/smarty-streets-services/SmartyStreets.services.types';

export type MappedAutocompleteOptions = {
  displayOptions: string[];
  indexedOptions: { [key: string]: AddressSuggestion };
};
