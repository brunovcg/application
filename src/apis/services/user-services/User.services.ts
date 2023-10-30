import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  CustomerResponse,
  RegisterUserPayload,
  RegisterUserResponse,
  UpdateMyAccountArgs,
  UpdateCustomerPayload,
  CustomerPreferencesResponse,
  CustomerPreferenceSubmissionPayload,
  UserType,
  ListUsersResponse,
  UpdateUserStatusPayload,
  UpdateUserGroupsPayload,
  GetUserResponse,
  UpdateMyAccountPayload,
  UpdateInternalMyAccountPayload,
  UpdateInternalMyAccountArgs,
  UpdateUserInfoPayload,
  ListCustomersSubscriptionsResponse,
} from './User.services.types';

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class UserServices {
  static registerUser(payload: RegisterUserPayload, onSuccess?: (res: RegisterUserResponse) => void) {
    return http.post<RegisterUserPayload, RegisterUserResponse>({
      URL: 'admin/user-register',
      payload,
      onSuccess,
    });
  }

  static getCustomer(username: string) {
    return http.get<CustomerResponse>({ URL: `/admin/customer/${username}` });
  }

  static updateCustomerSubscriptions(payload: UpdateCustomerPayload) {
    return http.patch<UpdateCustomerPayload, CustomerResponse>({ URL: 'admin/customer', payload });
  }

  static listUsers(userType?: UserType) {
    return http.get<ListUsersResponse>({ URL: 'admin/users' + (userType ? `?userType=${userType}` : '') });
  }

  static getCustomerPreferenceForCounty(username: string, countyId: number) {
    return http.get<CustomerPreferencesResponse>({ URL: `admin/customer/preferences?countyId=${countyId}&username=${username}` });
  }

  static submitCustomerPreferences(payload: CustomerPreferenceSubmissionPayload, onSuccess?: () => void) {
    return http.post({ URL: 'admin/customer/preferences', payload, onSuccess });
  }

  static updateCustomerOwnPreferences(payload: CustomerPreferenceSubmissionPayload, onSuccess?: () => void) {
    return http.post({ URL: 'customer-choices', payload, onSuccess });
  }

  static updateUserInfo(payload: UpdateUserInfoPayload) {
    return http.patch<UpdateUserInfoPayload, Record<never, never>>({ URL: `/admin/user/${payload.id}`, payload });
  }

  static updateUserStatus(args: UpdateUserStatusPayload) {
    return http.patch({ URL: `/admin/user/${args.id}/status/${args.status}` });
  }

  static updateUserGroups(args: UpdateUserGroupsPayload) {
    return http.patch<UpdateUserGroupsPayload, Record<never, never>>({
      URL: `admin/user/${args.id}/groups`,
      payload: { id: args.id, groupIds: args.groupIds },
    });
  }

  static updateMyAccount(args: UpdateMyAccountArgs) {
    return http.post<UpdateMyAccountPayload, Record<string, string>>({
      URL: 'admin/update',
      payload: args.payload,
      onSuccess: args.onSuccess,
      onComplete: args.onComplete,
    });
  }

  static updateInternalMyAccount(args: UpdateInternalMyAccountArgs) {
    return http.post<UpdateInternalMyAccountPayload, Record<string, string>>({
      URL: 'admin/update-internal',
      payload: args.payload,
      onSuccess: args.onSuccess,
      onComplete: args.onComplete,
    });
  }

  static getUser(id: number) {
    return http.get<GetUserResponse>({ URL: `/admin/user/${id}` });
  }

  static listCustomersSubscriptions() {
    return http.get<ListCustomersSubscriptionsResponse>({ URL: '/admin/customer/subscriptions' });
  }
}

export default UserServices;
