import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty({
    example: 100,
    description: 'Total number of items available',
    type: Number,
  })
  totalItems!: number;

  @ApiProperty({
    example: 10,
    description: 'Total number of pages available',
    type: Number,
  })
  totalPages!: number;

  @ApiProperty({
    example: 1,
    description: 'Current page number',
    type: Number,
  })
  currentPage!: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    type: Number,
  })
  itemsPerPage!: number;
}
