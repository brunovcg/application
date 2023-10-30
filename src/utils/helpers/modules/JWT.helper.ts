import jwt_decode from 'jwt-decode';
import storageHelper from './Storage.helper';
import DateTimeHelper from './DateTime.helper';
import Constants from '../../constants/Constants';
import { Environment, AuthenticationConfigs } from '../../../configs';

const { JWT, SQUIDEX_JWT, LAST_LOGIN } = Constants.STORAGE.PREFIX;
const { IM_APPLICATION } = Constants.STORAGE.SUFFIX;
const { isDateOneBeforeTwoByCertainTime } = DateTimeHelper;
// const { authentication } = configs;

abstract class JWTHelper {
  private static IM_APPLICATION_SUFFIX = `${Environment.mode.toUpperCase()}_${IM_APPLICATION}`;

  private static TOKEN_KEY = `${JWT}_${JWTHelper.IM_APPLICATION_SUFFIX}`;

  private static SQUIDEX_TOKEN_KEY = `${SQUIDEX_JWT}_${JWTHelper.IM_APPLICATION_SUFFIX}`;

  private static LAST_LOGIN_KEY = `${LAST_LOGIN}_${JWTHelper.IM_APPLICATION_SUFFIX}`;

  private static decodeToken<DecodedData>(token: string) {
    if (token) {
      const decode: DecodedData = jwt_decode(token);
      return decode;
    }
    return null;
  }

  static getIMToken() {
    return storageHelper.local.get(JWTHelper.TOKEN_KEY);
  }

  static getLastLogin() {
    return storageHelper.local.get(JWTHelper.LAST_LOGIN_KEY) ?? '';
  }

  static setIMAuthToken(token: string) {
    storageHelper.local.set(JWTHelper.TOKEN_KEY, `Bearer ${token}`);
  }

  static decodeIMAuthToken() {
    return JWTHelper.decodeToken(JWTHelper.getIMToken().replace('Bearer ', ''));
  }

  static cleanStoredSessionData() {
    storageHelper.local.clean([JWTHelper.IM_APPLICATION_SUFFIX]);
  }

  static setSquidexToken(token: string) {
    storageHelper.local.set(JWTHelper.SQUIDEX_TOKEN_KEY, `Bearer ${token}`);
  }

  static getSquidexToken() {
    return storageHelper.local.get(JWTHelper.SQUIDEX_TOKEN_KEY);
  }

  static setLastLogin() {
    storageHelper.local.set(JWTHelper.LAST_LOGIN_KEY, `${new Date().getTime()}`);
  }

  static validLastLoginDate() {
    const lastLogin = JWTHelper.getLastLogin();

    return isDateOneBeforeTwoByCertainTime({
      dateOne: new Date(parseInt(lastLogin, 10)),
      dateTwo: new Date(),
      time: AuthenticationConfigs.validTimeLastLogin,
    });
  }
}

export default JWTHelper;
