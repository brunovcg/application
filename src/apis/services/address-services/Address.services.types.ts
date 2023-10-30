import { Motivation, MotivationSource } from '../motivation-services/Motivation.services.types';
import { USState } from '../states-services/States.services.types';
import Constants from '../../../utils/constants/Constants';

const { DATA_MINER_QA_STATUS } = Constants;

export type Address = {
  attomId: number;
  city: string;
  county: string;
  createdDate: Date;
  fips: number;
  id: number;
  livingArea: number;
  lotSize: number;
  ltv: number;
  mailingAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingStreetName: string;
  mailingUnitNumber: null;
  mailingUnitType: null;
  mailingZip: string;
  modifiedDate: Date;
  motivationPointNames: string;
  motivationPoints: null;
  mpNames: null;
  mpNamesAsList: unknown[];
  owner2FirstName: string;
  owner2LastName: string;
  owner2MiddleName: null;
  ownerFirstName: string;
  ownerLastName: string;
  ownerMiddleName: null;
  ownerOccupied: string;
  ownerType: string;
  propertyAddress: string;
  propertyType: string;
  rank: null;
  skipTrace: null;
  state: string;
  stopMailingFlag: string;
  streetName: string;
  taxId: string;
  totalValue: number;
  unitNumber: null;
  unitType: null;
  yearsOld: number;
  yrsOwned: number;
  zipCode: string;
};

export type AddressMotivation = {
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
    motivationAliasList: unknown[];
    motivationGroup: { createdDate: Date; id: number; modifiedDate: Date; name: string };
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

export type ListMotivationsByAddressResponse = Promise<Address>;

export type SaveAddressMotivationPayload = {
  customerId: number | null;
  notes: string;
  userId: number | null;
  motivation: Motivation;
  motivationSource?: MotivationSource;
};

export type ListAddressesByAddressInfo = 'properties-addresses' | 'mailing-addresses';

export type ListAddressesByOwnerInfo = 'lastName' | 'firstName';

export type AddressLookupSearchResponse = Address[];

export type AddressMotivationResponse = AddressMotivation[];

export type AddressMotivationVerificationStatus = Exclude<keyof typeof DATA_MINER_QA_STATUS, 'null'>;

export type AddressMotivationSubmission = {
  addressId: number;
  county: string;
  createdDate: string;
  enteredBy: string;
  id: number;
  mailingAddress: string;
  mailingCity: string;
  mailingState: USState;
  mailingZip: string;
  motivationName: string;
  notes: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerMiddleName: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: USState;
  propertyZip: string;
  sourceName: string;
  taxId: string;
  verificationNote: null | string;
  verificationStatus: AddressMotivationVerificationStatus | null;
  verifiedBy: null | string;
  verifiedDate: null | string;
};

export type AddressMotivationMinerSubmissionsResponse = {
  content: AddressMotivationSubmission[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  };
  size: number;
  sort: { empty: number; sorted: number; unsorted: number };
  totalElements: number;
  totalPages: number;
};

export type UpdateAddressMotivationMinerSubmissionPayload = {
  verificationNote: string | null;
  verificationStatus: AddressMotivationVerificationStatus | null;
};

export type MotivationSubmissionByAddress = {
  id: number;
  county: string;
  taxId: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: USState;
  propertyZip: string;
  mailingAddress: string;
  mailingCity: string;
  mailingState: USState;
  mailingZip: string;
  ownerFirstName: string;
  ownerMiddleName: string | null;
  ownerLastName: string;
  addressMotivationMinerSubmissionTestDTOS: [
    {
      id: number;
      addressId: number;
      motivationName: string;
      sourceName: string;
      notes: string;
      verificationStatus: AddressMotivationVerificationStatus | null;
      verifiedDate: string | null;
      verifiedBy: string | null;
      verificationNote: string | null;
      createdDate: string;
      enteredBy: string;
    }
  ];
};

export type AddressLookupSearchCriteria = 'tax-id' | 'last-name' | 'first-name' | 'property' | 'mailing';

export type ListMotivationMinerSubmissionByAddressResponse = {
  content: MotivationSubmissionByAddress[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
