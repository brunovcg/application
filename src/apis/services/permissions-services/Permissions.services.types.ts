import PERMISSIONS from './permissions';

export type UserPermissions = { -readonly [key in (typeof PERMISSIONS)[number]]: boolean };

export type IMPermission = {
  id: number;
  name: UserPermissions;
  description: string;
};

export type ListPermissionsResponse = IMPermission[];
