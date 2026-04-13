import {
  IsEmail,
  IsNotEmpty,
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

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Transform(trimLowerString)
  email!: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Transform(trimString)
  firstName!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Transform(trimString)
  lastName!: string;

  @ApiProperty({
    example: 'SecurePassword123',
    description: 'Password of the user',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password!: string;
}
