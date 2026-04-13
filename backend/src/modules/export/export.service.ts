import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { ExportUsersDto } from './dto/export-users.dto';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async exportUsersCsv(exportUsersDto: ExportUsersDto): Promise<string> {
    const users = await this.userRepository.find({
      where: {
        id: In(exportUsersDto.ids),
        deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (users.length === 0) {
      throw new NotFoundException('No valid users found for the provided ids');
    }

    return this.buildCsv(users);
  }

  private buildCsv(users: User[]): string {
    const header = 'id,email,first_name,last_name';

    const rows = users.map((user) => {
      const escape = (val: string): string => {
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      };

      return [
        escape(user.id),
        escape(user.email),
        escape(user.firstName),
        escape(user.lastName),
      ].join(',');
    });

    return [header, ...rows].join('\n');
  }
}
