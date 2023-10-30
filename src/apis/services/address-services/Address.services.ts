import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  ListAddressesByAddressInfo,
  ListAddressesByOwnerInfo,
  SaveAddressMotivationPayload,
  AddressLookupSearchResponse,
  AddressMotivationResponse,
  AddressMotivationMinerSubmissionsResponse,
  UpdateAddressMotivationMinerSubmissionPayload,
  AddressMotivationSubmission,
  ListMotivationMinerSubmissionByAddressResponse,
  AddressLookupSearchCriteria,
} from './Address.services.types';

const { configServiceBaseURL } = Environment;
const { getIMToken } = JWTHelper;
const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;

const baseURL = configServiceBaseURL({
  production,
  staging,
  development,
});

const http = new Http({
  baseURL,
  setToken: getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class AddressServices {
  static lookupSearch(
    searchCriteria: AddressLookupSearchCriteria,
    typedSearch: string,
    states: string,
    counties: string,
    signal: AbortSignal
  ) {
    return http.get<AddressLookupSearchResponse>({
      URL: `admin/${searchCriteria}-address-lookup?search=${typedSearch}&states=${states}&counties=${counties}`,
      signal,
    });
  }

  static listMotivationsByAddress(propertyId: number) {
    return http.get<AddressMotivationResponse>({ URL: `addresses/${propertyId}/motivations?expired=false` });
  }

  static saveMotivation(propertyId: number, payload: SaveAddressMotivationPayload) {
    return http.post({ URL: `addresses/${propertyId}/motivations`, payload });
  }

  static listByAddressInfo(search: string, addressInfo: ListAddressesByAddressInfo, signal?: AbortSignal) {
    return http.get<AddressLookupSearchResponse>({ URL: `${addressInfo}/search?search=${search}`, signal });
  }

  static listByOwnerInfo(search: string, ownerInfo: ListAddressesByOwnerInfo, signal?: AbortSignal) {
    return http.get<AddressLookupSearchResponse>({ URL: `owners/search/${ownerInfo}?search=${search}`, signal });
  }

  static stopMailing(propertyId: number, flag: 'S' | 'R') {
    return http.get({ URL: `address/stop-mailing?id=${propertyId}&flag=${flag}` });
  }

  static updateMotivationMinerSubmission(submissionId: number, payload: UpdateAddressMotivationMinerSubmissionPayload) {
    return http.patch<UpdateAddressMotivationMinerSubmissionPayload, AddressMotivationSubmission>({
      URL: `address-motivation-miner-submissions/${submissionId}`,
      payload,
    });
  }

  static listMotivationMinerSubmissions(params: string) {
    return http.get<AddressMotivationMinerSubmissionsResponse>({
      URL: 'address-motivation-miner-submissions?' + params,
    });
  }

  static listMotivationMinerSubmissionsByAddress(
    criteria: 'tax-id' | 'address-id' | 'property-address',
    params: Exclude<string, 'search'>
  ) {
    return http.get<ListMotivationMinerSubmissionByAddressResponse>({
      URL: `address/address-motivation-miner-submissions/${criteria}?` + params,
    });
  }
}

export default AddressServices;
