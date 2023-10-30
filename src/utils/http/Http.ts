import i18next from 'i18next';
import Constants from '../constants/Constants';
import requestInterceptor from './interceptors/requestInterceptor';
import { HttpConstructor, RequestArgs, RequestArgsWithPayload, SharedConfigs } from './Http.types';

export default class Http {
  private sharedConfigs: SharedConfigs;

  constructor({ baseURL, headers, setToken }: HttpConstructor) {
    this.sharedConfigs = {
      baseURL,
      headers,
      setToken,
    };
  }

  get<IResponse>(args: RequestArgs<never>): Promise<IResponse> {
    return requestInterceptor({ ...args, method: 'GET', sharedConfigs: this.sharedConfigs });
  }

  post<Payload, IResponse>(args: RequestArgsWithPayload<Payload, IResponse>): Promise<IResponse> {
    return requestInterceptor<Payload, IResponse>({ ...args, method: 'POST', sharedConfigs: this.sharedConfigs });
  }

  delete<IResponse>(args: RequestArgs<never>): Promise<IResponse> {
    return requestInterceptor({ ...args, method: 'delete', sharedConfigs: this.sharedConfigs });
  }

  put<Payload, IResponse>(args: RequestArgsWithPayload<Payload, IResponse>): Promise<IResponse> {
    return requestInterceptor<Payload, IResponse>({
      ...args,
      method: 'PUT',
      sharedConfigs: this.sharedConfigs,
      errorHandling: [{ code: Constants.HTTP_STATUS.GATEWAY_TIMEOUT, handler: () => i18next.t('HTTP.Errors.Timeout') }],
    });
  }

  patch<Payload, IResponse>(args: RequestArgsWithPayload<Payload, IResponse>): Promise<IResponse> {
    return requestInterceptor<Payload, IResponse>({ ...args, method: 'PATCH', sharedConfigs: this.sharedConfigs });
  }
}
