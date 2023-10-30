import { Environment, ServicesEndpointsConfigs } from '../../../configs';

import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { ListGroupsResponse, GetGroupResponse, UpdateGroupUsersPayload, UpdateGroupPermissionsPayload } from './Group.services.types';

const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;

const baseURL = Environment.configServiceBaseURL({
  production: `${production}/groups`,
  staging: `${staging}/groups`,
  development: `${development}/groups`,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class GroupsServices {
  static list() {
    return http.get<ListGroupsResponse>({ URL: 'list-with-counts' });
  }

  static getOne(groupId: number) {
    return http.get<GetGroupResponse>({ URL: `${groupId}` });
  }

  static updateAssignedUsers(args: UpdateGroupUsersPayload) {
    return http.patch<UpdateGroupUsersPayload, Record<never, never>>({
      URL: `${args.id}/users`,
      payload: { id: args.id, usersIds: args.usersIds },
    });
  }

  static updatePermissions(args: UpdateGroupPermissionsPayload) {
    return http.patch<UpdateGroupPermissionsPayload, Record<never, never>>({
      URL: `${args.id}/permissions`,
      payload: { id: args.id, permissionsIds: args.permissionsIds },
    });
  }
}

export default GroupsServices;
