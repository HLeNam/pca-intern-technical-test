/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiResponseDto } from '../dto/api-response.dto';

export function createResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  path?: string,
  errors?: any,
): ApiResponseDto<T> {
  return {
    success,
    message,
    data,
    errors,
    timestamp: new Date().toISOString(),
    path: path || '',
  };
}

export const ok = <T>(message: string, data?: T, path?: string) =>
  createResponse(true, message, data, path);

export const fail = (message: string, errors?: any, path?: string) =>
  createResponse(false, message, undefined, path, errors);

export const created = <T>(message: string, data?: T, path?: string) =>
  createResponse(true, message, data, path);
