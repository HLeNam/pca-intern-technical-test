import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportUsersDto } from './dto/export-users.dto';
import type { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @ApiOperation({
    summary: 'Export users as CSV',
    description: 'Export user data as a CSV file based on provided user IDs',
  })
  @Post('users/csv')
  @HttpCode(HttpStatus.OK)
  async exportUsersCsv(
    @Body() dto: ExportUsersDto,
    @Res() res: Response,
  ): Promise<void> {
    const csv = await this.exportService.exportUsersCsv(dto);

    const filename = `users_${Date.now()}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', Buffer.byteLength(csv, 'utf8'));
    res.send(csv);
  }
}
