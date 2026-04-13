import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto, UserDto } from './dto/user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginatedUsers } from './interfaces/paginated-users.interface';
import { Paginate } from '../../common/interfaces/paginate.interface';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const user = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(user);

    return toUserDto(savedUser);
  }

  async findAll(query: QueryUserDto): Promise<PaginatedUsers> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      search,
    } = query;

    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.deleted = :deleted', { deleted: false });

    // Search across firstName, lastName, email
    if (search) {
      qb.andWhere(
        '(LOWER(user.firstName) LIKE :search OR LOWER(user.lastName) LIKE :search OR LOWER(user.email) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    // Sorting
    qb.orderBy(`user.${sortBy}`, sortOrder);

    // Pagination
    const totalItems = await qb.getCount();
    const totalPages = Math.ceil(totalItems / limit);

    const paginate: Paginate = {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    };

    const offset = (page - 1) * limit;
    const data = await qb.skip(offset).take(limit).getMany();

    return {
      data: data.map(toUserDto),
      metadata: paginate,
    };
  }

  async remove(params: DeleteUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: params.id,
        deleted: false,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deleted = true;

    await this.userRepository.save(user);
  }
}
