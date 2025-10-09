export type APIMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface HttpClientError {
  errorCode: string;
  errorMessage: string;
}
