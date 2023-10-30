import { JWTHelper } from '../../../utils/helpers';
import { ImLoginResponse } from '../../../apis/services/auth-services/Auth.services.types';
import { UserPermissions } from '../../../apis/services/permissions-services/Permissions.services.types';
import { USState } from '../../../apis/services/states-services/States.services.types';
import { SessionUser, UserRoles } from './UserSessionContext.types';
import PERMISSIONS from '../../../apis/services/permissions-services/permissions';
import Constants from '../../../utils/constants/Constants';

const { CUSTOMER } = Constants.USER.TYPES;

abstract class UserSessionHelper {
  static initialUser = {
    username: '',
    name: '',
    isAdmin: false,
    isLogged: false,
    isCustomer: false,
    isSessionExpired: false,
    isSessionBlocked: false,
    isSessionChecked: false,
    jwt: '',
    squidexJwt: '',
    id: 0,
    phone: '',
    city: '',
    state: '' as USState,
    streetName: '',
    zipCode: '',
    permissions: {} as UserPermissions,
  } as SessionUser;

  static getSessionState = () => {
    const token = JWTHelper.getIMToken();
    const checkedUser = { ...UserSessionHelper.initialUser };
    checkedUser.jwt = token;
    return checkedUser;
  };

  static map = ({
    name,
    jwt,
    id,
    username,
    roles,
    phone,
    city,
    state,
    streetName,
    zipCode,
    userType,
    admin,
  }: ImLoginResponse): SessionUser => {
    const mappedRoles: UserRoles = roles.map((role) => role.name);

    return {
      id,
      username,
      name,
      isAdmin: admin,
      isLogged: true,
      isCustomer: userType === CUSTOMER,
      isSessionExpired: false,
      isSessionChecked: true,
      isSessionBlocked: false,
      jwt,
      squidexJwt: '',
      phone: phone,
      city: city,
      state: state,
      streetName: streetName,
      zipCode: zipCode,
      permissions: PERMISSIONS.reduce((acc, current) => {
        if (mappedRoles.includes(current)) {
          acc[`${current}`] = true;
        } else {
          acc[`${current}`] = false;
        }
        return acc;
      }, {} as UserPermissions),
    };
  };
}

export default UserSessionHelper;
