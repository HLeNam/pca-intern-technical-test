import axiosInstance from './axios';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
  UserQueryParams,
} from '../types/user.types';
import type { ApiSuccessResponse } from '@/types/common.types';

export const usersApi = {
  getAll: async (
    params?: UserQueryParams
  ): Promise<ApiSuccessResponse<User[]>> => {
    const response = await axiosInstance.get<ApiSuccessResponse<User[]>>(
      '/users',
      {
        params,
      }
    );
    return response.data;
  },

  create: async (
    payload: CreateUserPayload
  ): Promise<ApiSuccessResponse<User>> => {
    const response = await axiosInstance.post<ApiSuccessResponse<User>>(
      '/users',
      payload
    );
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateUserPayload
  ): Promise<ApiSuccessResponse<User>> => {
    const response = await axiosInstance.patch<ApiSuccessResponse<User>>(
      `/users/${id}`,
      payload
    );
    return response.data;
  },

  delete: async (id: string): Promise<ApiSuccessResponse<null>> => {
    const response = await axiosInstance.delete<ApiSuccessResponse<null>>(
      `/users/${id}`
    );
    return response.data;
  },

  exportCsv: async (ids: string[]): Promise<Blob> => {
    const response = await axiosInstance.post(
      '/export/users/csv',
      { ids },
      { responseType: 'blob' }
    );
    return response.data as Blob;
  },
};
