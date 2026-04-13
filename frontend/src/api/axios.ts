import type { ApiError } from '@/types/common.types';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 1 minute timeout for API requests
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    const statusCode = error.response?.status || 500;
    const timestamp = new Date().toISOString();

    if (data?.success === false && data?.message) {
      return Promise.reject({
        ...data,
        statusCode,
      } as ApiError);
    }

    if (data?.errors && typeof data.errors === 'object') {
      const apiError: ApiError = {
        success: false,
        message: data.message || 'Validation failed',
        timestamp,
        path: error.config?.url || 'unknown',
        statusCode,
        errors: data.errors,
      };
      return Promise.reject(apiError);
    }

    const apiError: ApiError = {
      success: false,
      message: data?.message || error.message || 'Something went wrong',
      timestamp,
      path: error.config?.url || 'unknown',
      statusCode,
    };
    return Promise.reject(apiError);
  }
);

export default axiosInstance;
