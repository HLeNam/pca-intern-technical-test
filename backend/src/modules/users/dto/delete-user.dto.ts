import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the user to delete',
    type: String,
  })
  @IsUUID(4, {
    message: 'ID must be a valid UUID v4',
  })
  @IsNotEmpty({
    message: 'ID is required',
  })
  id!: string;
}
