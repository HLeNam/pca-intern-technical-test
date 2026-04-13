export type ApiError = {
  success: boolean;
  message: string;
  timestamp: string;
  path: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiSuccessResponse<T = any, M = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  timestamp: string;
  path: string;
  metadata?: M;
};

export type PaginationMeta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};
