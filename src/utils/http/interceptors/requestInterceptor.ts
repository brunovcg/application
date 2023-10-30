import { Request, ResponseInterceptorArgs } from '../Http.types';
import responseInterceptor from './responseInterceptor';
import HttpHelper from '../Http.helper';

export default function requestInterceptor<Payload, ExpectedResponse>(args: Request<Payload, ExpectedResponse>) {
  const {
    method,
    URL,
    uncodedURL,
    overrideHeaders,
    payload,
    errorHandling,
    signal,
    sharedConfigs,
    responseType,
    onComplete,
    onSuccess,
    onError,
  } = args;

  const CONTENT_TYPE = 'Content-Type';
  const { baseURL, headers, setToken } = sharedConfigs;

  let URI = '';

  if (uncodedURL !== undefined) {
    URI = `${baseURL}/${HttpHelper.formatURL(uncodedURL)}`;
  } else {
    URI = encodeURI(`${baseURL}/${HttpHelper.formatURL(URL)}`);
  }

  const requestInit: RequestInit = {};

  if (payload) {
    const contentType = overrideHeaders ? overrideHeaders?.[`${CONTENT_TYPE}`] : headers?.[`${CONTENT_TYPE}`];

    if (contentType === 'application/json') {
      requestInit.body = JSON.stringify(payload);
    } else {
      requestInit.body = payload as BodyInit;
    }
  }

  if (signal) {
    requestInit.signal = signal;
  }

  const headersAuth = setToken ? { Authorization: setToken() } : headers;

  const mergedHeaders = {
    ...(headersAuth ?? {}),
    ...(overrideHeaders ?? headers ?? {}),
  };

  requestInit.headers = new Headers(mergedHeaders as HeadersInit);

  const requestArgs = {
    URL,
    uncodedURL,
    errorHandling,
    responseType,
    onComplete,
    onSuccess,
    onError,
  } as ResponseInterceptorArgs<ExpectedResponse>;

  switch (method) {
    case 'GET':
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'GET', ...requestInit });
    case 'POST':
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'POST', ...requestInit });
    case 'delete':
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'delete', ...requestInit });
    case 'PATCH':
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'PATCH', ...requestInit });
    case 'PUT':
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'PUT', ...requestInit });
    default:
      return responseInterceptor<ExpectedResponse>(requestArgs, URI, { method: 'GET', ...requestInit });
  }
}
