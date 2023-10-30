import { AddressMotivationSubmission } from '../../../../../../../../../apis/services/address-services/Address.services.types';

export type UseDataMinerQAColumnsProps = {
  addAssessed: (newAssessed: AddressMotivationSubmission) => void;
  instance: 'query' | 'assessed';
};
