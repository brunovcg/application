import { ServicesEndpointsConfigs, Environment } from '../../../configs';
import Constants from '../../../utils/constants/Constants';
import Http from '../../../utils/http/Http';
import { SignInArgs, SquidexLoginResponse, SignInPayload, ImLoginResponse, ValidateStoredTokenArgs } from './Auth.services.types';

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const { UNAUTHORIZED } = Constants.HTTP_STATUS;

const http = new Http({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class AuthServices {
  static loginIM({ payload, ...rest }: SignInArgs<ImLoginResponse>) {
    return http.post<SignInPayload, ImLoginResponse>({
      URL: 'login',
      useToken: false,
      payload: payload,
      ...rest,
    });
  }

  static loginSquidex(IMToken: string) {
    return http.get<SquidexLoginResponse>({
      URL: 'squidex/token',
      overrideHeaders: {
        Authorization: `Bearer ${IMToken}`,
      },
    });
  }

  static validateStoredToken({ token, expiredTokenCallback, onSuccess, onComplete, onError }: ValidateStoredTokenArgs) {
    return http.get<ImLoginResponse>({
      URL: '/user-data',
      overrideHeaders: {
        Authorization: token,
      },
      errorHandling: [{ code: UNAUTHORIZED, handler: expiredTokenCallback }],
      onSuccess: onSuccess,
      onComplete: onComplete,
      onError: onError,
    });
  }
}

export default AuthServices;
