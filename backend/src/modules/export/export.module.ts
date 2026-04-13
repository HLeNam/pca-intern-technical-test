import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {}
