import { HttpError } from '../errors/Http.error';
import ExpiredTokenRenewSessionEvent from '../events/ExpiredTokenRenewSession.event';
import { HttpMethod, HttpResponseType, RequestErrorHandling } from './Http.types';
import i18next from 'i18next';
import { Environment, HttpConfigs } from '../../configs';
import { Alert } from '../helpers';
import Constants from '../constants/Constants';

const { allowedCodesNetworkErrorMessage } = HttpConfigs;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = Constants.HTTP_STATUS;
abstract class HttpHelper {
  static formatURL = (URL: string) => (URL.startsWith('/') ? URL.substring(1, URL.length) : URL).trim();

  static triggerTokenExpirationEvent(code: number, method: HttpMethod, URL: string) {
    ExpiredTokenRenewSessionEvent.trigger();
    if (Environment.mode === 'development') {
      throw new HttpError(code, method, URL, 'Token has expired');
    }
  }

  static async handleErrorResponse(
    fetchResponse: Response,
    effectiveURL: string,
    config: RequestInit,
    errorHandling?: RequestErrorHandling[],
    onError?: (e: unknown) => void
  ) {
    const requestErrorHandler = errorHandling?.find((item) => item.code === fetchResponse.status);
    const hasUnauthorizedHandler = requestErrorHandler?.code === UNAUTHORIZED;
    const hasInternalServerErrorHandler = requestErrorHandler?.code === INTERNAL_SERVER_ERROR;

    if (!hasUnauthorizedHandler && fetchResponse.status === UNAUTHORIZED) {
      HttpHelper.triggerTokenExpirationEvent(fetchResponse.status, config.method as HttpMethod, effectiveURL);
    }

    if (requestErrorHandler) {
      requestErrorHandler.handler();
      return fetchResponse;
    }

    if (onError) {
      onError?.(fetchResponse.status);
    }

    if (
      allowedCodesNetworkErrorMessage.includes(fetchResponse.status as (typeof allowedCodesNetworkErrorMessage)[number]) &&
      !hasInternalServerErrorHandler
    ) {
      Alert.error(i18next.t('HTTP.Errors.NetworkError'));
    }

    const textResponse = await fetchResponse.text();

    if (textResponse) {
      return JSON.parse(textResponse);
    }

    return fetchResponse;
  }

  static async handleSuccessResponse<ExpectedResponse>(
    fetchResponse: Response,
    responseType?: HttpResponseType,
    onSuccess?: (res: ExpectedResponse) => void
  ) {
    if (responseType === 'blob') {
      const res = await fetchResponse.blob();
      onSuccess?.(res as ExpectedResponse);
      return res;
    }
    if (responseType === 'text') {
      const res = await fetchResponse.text();
      onSuccess?.(res as ExpectedResponse);
      return res;
    }

    try {
      const res = await fetchResponse.json();
      let effectiveRes = res;
      // TODO: Remove this after merging Release 20 - START
      if (res.responseObject) {
        effectiveRes = res.responseObject;
      }

      if (res.responseCode && res?.responseCode > 299) {
        return await Promise.reject(res?.responseCode);
      }
      // TODO: Remove this after merging Release 20 - END
      onSuccess?.(effectiveRes as ExpectedResponse);

      return effectiveRes;
    } catch (e) {
      return await Promise.reject(e);
    }
  }

  static setParamsString(paramsObject?: Record<string, string | number | undefined | null>) {
    if (!paramsObject) {
      return '';
    }
    const validParams = Object.entries(paramsObject).sort((item) => item[0].localeCompare(String(item[1])));
    return validParams
      .reduce((acc, current) => {
        if (current[1]) {
          acc.push(`${current[0]}=${current[1]}`);
        }

        return acc;
      }, [] as string[])
      .join('&');
  }
}

export default HttpHelper;
