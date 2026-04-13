import { IsOptional, IsString, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { toInt } from '../../../common/transforms/number.transform';
import { trimString } from '../../../common/transforms/string.transform';
import { ApiProperty } from '@nestjs/swagger';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum UserSortBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
}

export class QueryUserDto {
  @ApiProperty({
    example: 1,
    description: 'Page number for pagination (default: 1)',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt({
    message: 'Page must be an integer',
  })
  @Min(1)
  @Transform(toInt)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page (default: 10)',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt({
    message: 'Limit must be an integer',
  })
  @Min(1)
  @Max(100)
  @Transform(toInt)
  limit?: number = 10;

  @ApiProperty({
    example: 'createdAt',
    description: 'Field to sort by (default: createdAt)',
    enum: UserSortBy,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserSortBy, {
    message: `sortBy must be one of: ${Object.values(UserSortBy).join(', ')}`,
  })
  sortBy?: UserSortBy = UserSortBy.CREATED_AT;

  @ApiProperty({
    example: 'DESC',
    description: 'Sort order (default: DESC)',
    enum: SortOrder,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'sortOrder must be ASC or DESC' })
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiProperty({
    example: 'john',
    description: 'Search term for filtering users',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(trimString)
  search?: string;
}
