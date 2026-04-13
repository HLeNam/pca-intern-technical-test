import type { PaginationMeta } from '@/types/common.types';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOrder = 'ASC' | 'DESC';

export type UserSortBy = 'firstName' | 'lastName' | 'email' | 'createdAt';

export interface PaginatedUsers {
  data: User[];
  metadata: PaginationMeta;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  sortBy?: UserSortBy;
  sortOrder?: SortOrder;
  search?: string;
}

export interface CreateUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateUserPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}
