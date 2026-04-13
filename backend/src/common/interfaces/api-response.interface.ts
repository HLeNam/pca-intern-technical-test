export interface ApiResponse<T = any, M = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  timestamp: string;
  path: string;
  metadata?: M;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}
