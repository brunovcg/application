import { HttpMethod } from '../http/Http.types';

export class HttpError extends Error {
  message;

  constructor(code: number, method: HttpMethod, URL: string, message?: string) {
    super();
    this.message = `HTTP Request error = code: ${code} | Method: ${method} | URL: /${URL} ${message ? '| Message: ' + message : ''}`;
  }
}
