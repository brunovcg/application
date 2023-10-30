import { PurchasedPropertiesPayload } from '../../services/purchased-properties-services/PurchasedProperties.services.types';

export type PurchasedPropertyArgs = {
  data: PurchasedPropertiesPayload;
  onSuccess: () => void;
  onError: () => void;
};
