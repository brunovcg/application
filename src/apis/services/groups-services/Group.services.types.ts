import { IMPermission } from '../permissions-services/Permissions.services.types';
import { UserType } from '../user-services/User.services.types';

export type Group = {
  id: number;
  name: string;
  permissionsCount: number;
  usersCount: number;
  userType: UserType;
};

export type ListGroupsResponse = Group[];

export type GetGroupResponse = {
  id: number;
  name: string;
  permissions: IMPermission[];
  users: {
    id: number;
    username: string;
    name: string;
  }[];
};

export type UpdateGroupUsersPayload = { id: number; usersIds: number[] };

export type UpdateGroupPermissionsPayload = { id: number; permissionsIds: number[] };
