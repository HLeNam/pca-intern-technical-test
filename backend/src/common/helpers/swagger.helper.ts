import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';
import { Type } from '@nestjs/common';

export function ApiResponseOf<T>(
  DataClass: Type<T>,
  options?: { isArray?: boolean },
) {
  class ApiResponseClass extends ApiResponseDto<T> {
    @ApiProperty({
      type: () => DataClass,
      isArray: options?.isArray || false,
    })
    declare data: T;
  }

  Object.defineProperty(ApiResponseClass, 'name', {
    value: `ApiResponseOf${DataClass.name}${options?.isArray ? 'Array' : ''}`,
  });

  return ApiResponseClass;
}

export function ApiResponseWithMetadataOf<T, M>(
  DataClass: Type<T>,
  MetadataClass: Type<M>,
  options?: { isArray?: boolean },
) {
  class ApiResponseWithMetadataClass extends ApiResponseDto<T> {
    @ApiProperty({
      type: () => DataClass,
      isArray: options?.isArray || false,
    })
    declare data: T;

    @ApiProperty({
      type: () => MetadataClass,
    })
    declare metadata: M;
  }

  Object.defineProperty(ApiResponseWithMetadataClass, 'name', {
    value: `ApiResponseWithMetadataOf${DataClass.name}${options?.isArray ? 'Array' : ''}`,
  });

  return ApiResponseWithMetadataClass;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
export function ApiErrorResponseExample(
  example: Partial<ApiResponseDto>,
): ApiResponseNoStatusOptions {
  const merged: Partial<ApiResponseDto> = {
    success: false,
    message: example.message ?? 'Error',
    timestamp: example.timestamp ?? new Date().toISOString(),
    path: example.path ?? '/',
  };

  if (example.errors !== undefined) {
    merged.errors = example.errors;
  }

  return {
    type: ApiResponseDto,
    schema: {
      example: merged,
    },
  };
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
