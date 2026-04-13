import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    example: 'uuid',
    description: 'Unique identifier of the user',
  })
  id!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email!: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName!: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Timestamp when the user was created',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00Z',
    description: 'Timestamp when the user was last updated',
  })
  updatedAt!: Date;
}

export function toUserDto(user: User): UserDto {
  const { id, email, firstName, lastName, createdAt, updatedAt } = user;
  return {
    id,
    email,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  };
}
