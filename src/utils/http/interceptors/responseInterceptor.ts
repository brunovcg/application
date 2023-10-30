import HttpHelper from '../Http.helper';
import { Alert } from '../../helpers';
import { ResponseInterceptorArgs } from '../Http.types';
import i18next from 'i18next';

export default async function responseInterceptor<ExpectedResponse>(
  requestArgs: ResponseInterceptorArgs<ExpectedResponse>,
  ...fetchArgs: typeof fetch.arguments
) {
  const { URL, uncodedURL, errorHandling, responseType, onComplete, onSuccess, onError } = requestArgs;

  const effectiveURL = uncodedURL ?? URL;

  try {
    const config: RequestInit = fetchArgs[1];

    let fetchResponse: Response;

    try {
      fetchResponse = await fetch(fetchArgs[0], config);
    } catch (e) {
      onError?.(e);
      onComplete?.();
      Alert.error(i18next.t('HTTP.Errors.NetworkError'));
      return;
    }

    if (!fetchResponse.ok) {
      const httpErrorResponse = await HttpHelper.handleErrorResponse(fetchResponse, effectiveURL, config, errorHandling, onError);
      onComplete?.();
      return httpErrorResponse;
    }

    const httpSuccessResponse = await HttpHelper.handleSuccessResponse<ExpectedResponse>(fetchResponse, responseType, onSuccess);

    onComplete?.();

    return httpSuccessResponse;
  } catch (e) {
    onComplete?.();
    onError?.(e);
    return Promise.reject(e);
  }
}
