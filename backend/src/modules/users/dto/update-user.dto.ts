import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { Transform } from 'class-transformer';
import {
  trimLowerString,
  trimString,
} from '../../../common/transforms/string.transform';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Transform(trimLowerString)
  email?: string;

  @ApiProperty({
    required: false,
    example: 'John',
    description: 'The first name of the user',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Transform(trimString)
  firstName?: string;

  @ApiProperty({
    required: false,
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Transform(trimString)
  lastName?: string;

  @ApiProperty({
    required: false,
    example: '********',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password?: string;
}
