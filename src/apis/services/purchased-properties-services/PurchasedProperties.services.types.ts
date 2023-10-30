import Constants from '../../../utils/constants/Constants';
import { USState } from '../states-services/States.services.types';

const { DEAL_SOURCES } = Constants;

export type PurchasedPropertiesPayload = {
  customerId: number;
  address: string;
  city: string;
  zipCode: string;
  state: USState;
  dealSources: (keyof typeof DEAL_SOURCES)[];
  purchaseDate: Date;
  profit: number;
};

export type PurchasedProperty = {
  addressId: number | null;
  city: string;
  customerId: number;
  dealSources: (keyof typeof DEAL_SOURCES)[];
  id: number;
  market: null;
  motivations: [];
  profit: number;
  purchaseDate: string;
  state: USState;
  status: 'PROCESSING' | 'FAILED' | 'COMPLETED';
  streetName: string;
  zipCode: string;
};

export type PurchasedPropertiesResponse = PurchasedProperty[];
