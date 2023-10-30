import Constants from '../utils/constants/Constants';

const { INTERNAL_SERVER_ERROR, CONFLICT, BAD_GATEWAY, SERVER_UNAVAILABLE, GATEWAY_TIMEOUT } = Constants.HTTP_STATUS;

abstract class HttpConfigs {
  static allowedCodesNetworkErrorMessage = [INTERNAL_SERVER_ERROR, CONFLICT, BAD_GATEWAY, SERVER_UNAVAILABLE, GATEWAY_TIMEOUT];
}

export default HttpConfigs;
