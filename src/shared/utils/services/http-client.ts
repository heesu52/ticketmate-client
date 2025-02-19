type FetchParameters = Parameters<typeof fetch>;
type PromiseAble<T> = T | Promise<T>;
export type HTTPClient<R = Response> = ReturnType<typeof httpClient<R>>;

export interface HTTPClientOption<T = Response>
  extends Omit<NonNullable<FetchParameters[1]>, 'body'> {
  baseURL?: string;
  interceptors?: {
    request?(
      input: NonNullable<FetchParameters[0]>,
      init: NonNullable<FetchParameters[1]>,
    ): PromiseAble<FetchParameters[1]>;
    response?(response: Response): PromiseAble<T>;
  };
}

const applyBaseURL = (input: FetchParameters[0], baseURL?: string) => {
  if (!baseURL) {
    return input;
  }

  // if (typeof input === 'object' && 'url' in input) {
  //   return new URL(input.url, baseURL);
  // }

  // return new URL(input, baseURL);

  return baseURL + input;
};

export default function httpClient<T = Response>({
  baseURL,
  interceptors = {},
  ...requestInit
}: HTTPClientOption<T> = {}) {
  return async function <R = T extends Response ? Response : T>(
    input: FetchParameters[0],
    init?: FetchParameters[1],
  ): Promise<R> {
    const url = applyBaseURL(input, baseURL);
    const option = { ...requestInit, ...init };
    const interceptorAppliedOption = interceptors.request
      ? await interceptors.request(url, option)
      : option;
    const response = await fetch(url, interceptorAppliedOption);

    if (interceptors.response) {
      return (await interceptors.response(response)) as R;
    }

    return response as R;
  };
}
