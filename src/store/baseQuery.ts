import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import type { AxiosError, AxiosRequestConfig } from 'axios';

import api from '../lib/api';
import type { ApiError } from '../types/api';

interface BaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: unknown;
  params?: unknown;
}

export const axiosBaseQuery =
  (): BaseQueryFn<BaseQueryArgs, unknown, ApiError> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });
      return { data: result.data as unknown };
    } catch (axiosError) {
      const err = axiosError as AxiosError<ApiError>;
      return {
        error: {
          success: false,
          message: err.response?.data?.message || err.message,
          error: err.response?.data?.error || 'An error occurred',
        },
      };
    }
  };
