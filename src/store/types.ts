import type { AxiosRequestConfig } from 'axios';

export type BaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: unknown;
  params?: unknown;
};
