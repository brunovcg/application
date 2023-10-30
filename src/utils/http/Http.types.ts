import { WithPrefix } from '../../types';
import Constants from '../constants/Constants';

const { HTTP_STATUS } = Constants;

export type Headers = {
  'Content-Type'?: 'application/json' | 'multipart/form-data' | 'text/plain';
  'Accept'?: string | string[];
  'X-Flatten'?: 'true';
};

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export type RequestErrorHandling = {
  code: HttpStatusCode;
  handler: () => void;
};
export type HttpResponseType = 'json' | 'blob' | 'text';

export type OnHTTPResponse<Response> = {
  onSuccess?: (res: Response) => void;
  onComplete?: () => void;
  onError?: (e: unknown) => void;
};

export type CustomRequestURLArgs = { URL: string; uncodedURL?: never } | { URL?: never; uncodedURL: string };

export type RequestArgs<ExpectedResponse> = OnHTTPResponse<ExpectedResponse> &
  CustomRequestURLArgs & {
    errorHandling?: RequestErrorHandling[];
    useToken?: boolean;
    overrideHeaders?: Headers & { Authorization?: string };
    signal?: AbortSignal;
    responseType?: HttpResponseType;
  };

export type RequestArgsWithPayload<Payload, Response> = RequestArgs<Response> & {
  payload?: Payload;
};

export type HttpConstructor = {
  baseURL: WithPrefix<'http'>;
  headers?: Headers;
  setToken?: () => string;
};

export type SharedConfigs = HttpConstructor & {
  responseType?: HttpResponseType;
};

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'delete';

export type Request<Payload, ExpectedResponse> = RequestArgs<ExpectedResponse> & {
  method: HttpMethod;
  payload?: Payload;
  sharedConfigs: SharedConfigs;
};

export type ResponseInterceptorArgs<ExpectedResponse> = OnHTTPResponse<ExpectedResponse> &
  CustomRequestURLArgs & {
    URL?: string;
    errorHandling?: RequestErrorHandling[];
    responseType?: HttpResponseType;
    uncodedURL?: string;
  };
