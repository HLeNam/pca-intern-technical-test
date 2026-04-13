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
