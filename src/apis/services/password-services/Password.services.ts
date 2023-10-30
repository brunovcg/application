import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import Constants from '../../../utils/constants/Constants';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  ForgotPasswordChangeArgs,
  ForgotPasswordChangePayload,
  SendForgotPasswordEmailArgs,
  ForgotPasswordSendEmailPayload,
  UpdateOwnPasswordArgs,
  UpdateOwnPasswordPayload,
  ValidateOpaqueTokenArgs,
} from './Password.services.types';

const appJson = 'application/json';

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const http = new Http({
  baseURL,
  headers: {
    'Content-Type': appJson,
    'Accept': appJson,
  },
});

const { BAD_REQUEST } = Constants.HTTP_STATUS;

abstract class PasswordServices {
  static update(args: ForgotPasswordChangeArgs) {
    return http.post<ForgotPasswordChangePayload, Record<never, never>>({
      URL: `update-password?token=${args.opaqueToken}`,
      payload: { password: args.password },
      onSuccess: args.onSuccess,
      onComplete: args.onComplete,
      errorHandling: [
        {
          code: BAD_REQUEST,
          handler: args.forbiddenPasswordHandler,
        },
      ],
    });
  }

  static updateForCurrentUser(args: UpdateOwnPasswordArgs) {
    return http.patch<UpdateOwnPasswordPayload, Record<never, never>>({
      URL: 'update-own-password',
      payload: { password: args.payload.password },
      onSuccess: args.onSuccess,
      onComplete: args.onComplete,
      errorHandling: [
        {
          code: BAD_REQUEST,
          handler: args.forbiddenPasswordHandler,
        },
      ],
      overrideHeaders: {
        'Content-Type': appJson,
        'Accept': appJson,
        'Authorization': JWTHelper.getIMToken(),
      },
    });
  }

  static sendForgotPasswordEmail({ username, onSuccess }: SendForgotPasswordEmailArgs) {
    return http.post<ForgotPasswordSendEmailPayload, Record<never, never>>({
      URL: 'forgot-password/send-email',
      payload: { username },
      onSuccess,
    });
  }

  static validateOpaqueToken(args: ValidateOpaqueTokenArgs) {
    return http.get({
      uncodedURL: `validate-token?token=${args.token}`,
      onComplete: args.onComplete,
      onError: args.onError,
      onSuccess: args.onSuccess,
    });
  }
}

export default PasswordServices;
