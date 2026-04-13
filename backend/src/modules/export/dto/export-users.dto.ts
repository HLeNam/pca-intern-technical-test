import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';

export class ExportUsersDto {
  @ApiProperty({
    description: 'Array of user IDs to export',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440001',
    ],
    required: true,
    type: [String],
  })
  @IsArray({ message: 'ids must be an array' })
  @ArrayMinSize(1, { message: 'At least one user id is required' })
  @IsUUID('all', { each: true, message: 'Each id must be a valid UUID' })
  ids!: string[];
}
