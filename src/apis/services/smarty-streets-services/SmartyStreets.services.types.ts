import { USState } from '../states-services/States.services.types';

export type AddressSuggestion = {
  city: string;
  entries: number;
  secondary: string;
  state: USState;
  street_line: string;
  zipcode: string;
};

export type ListAddressAutocompleteResponse = {
  suggestions: AddressSuggestion[];
};
