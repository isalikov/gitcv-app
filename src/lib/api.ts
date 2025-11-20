import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token from localStorage
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error as Error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: unknown) => {
    // Handle errors globally
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        // Request made but no response
        console.error('Network Error:', error.message);
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
    return Promise.reject(error as Error);
  },
);

export default api;
