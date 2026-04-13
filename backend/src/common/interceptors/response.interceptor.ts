/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T, M> implements NestInterceptor<
  T,
  ApiResponse<T, M>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T, M>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: data?.message || 'Success',
        data: data?.data || data,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(data?.metadata && { metadata: data.metadata }),
      })),
    );
  }
}
