import {
  MotivationSubmissionByAddress,
  UpdateAddressMotivationMinerSubmissionPayload,
} from '../../services/address-services/Address.services.types';
import { MotivationAlias, MotivationGroup } from '../../services/motivation-services/Motivation.services.types';
import { USState } from '../../services/states-services/States.services.types';

export type AddressMotivationResponse = {
  addressId: number;
  addressMotivationMinerSubmissionList: unknown[];
  createdDate: Date;
  customer: unknown;
  customerId: unknown;
  expirationDate: Date;
  id: number;
  modifiedDate: Date;
  motivation: {
    createdDate: Date;
    definition: string;
    expirationMonths: number;
    id: number;
    mailingStatement: string;
    modifiedDate: Date;
    motivationAliasList: MotivationAlias[];
    motivationGroup: MotivationGroup;
    name: string;
    value: number;
    motivationSource: {
      createdDate: Date;
      description: string | null;
      disabledDate: Date;
      displayName: string;
      id: number;
      modifiedDate: Date | null;
      motivationSourceGroups: {
        createdDate: Date;
        description: null;
        disabledDate: null;
        displayName: string;
        id: number;
        modifiedDate: Date;
        name: string;
      }[];
      name: string;
    };
    notes: string;
    processedDate: Date;
  };
};

export type DataMinerQAFilterCriteria = 'data-miner' | 'tax-id' | 'property-address' | 'address-id';

export type UseListAddressMinerSubmissionsQueryArgs = {
  userId: number | null;
  fromDate: string;
  toDate: string;
  county?: string | null;
  state?: USState | null;
};

export type UseListMinerSubmissionsByAddressQueryArgs = {
  search: string | null;
  fromDate: string;
  toDate: string;
  county?: string | null;
  state: USState | null;
  criteria: Exclude<DataMinerQAFilterCriteria, 'data-miner'>;
};

export type UseUpdateAddrMotivationMinerSubMutationArgs = {
  submissionId: number;
  payload: UpdateAddressMotivationMinerSubmissionPayload;
  successCallback: () => void;
  errorCallback: () => void;
};

export type MappedMinerSubmissionsByAddress = {
  addressesList: Record<string, MotivationSubmissionByAddress>;
  addressesDisplay: string[];
};
