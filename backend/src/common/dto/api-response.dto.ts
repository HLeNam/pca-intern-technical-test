import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Success' })
  message!: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  errors?: { [key: string]: string[] } | null;

  @ApiProperty({ example: '2026-03-21T10:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '/users/me' })
  path!: string;
}
