import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  ApiResponseOf,
  ApiErrorResponseExample,
} from '../../common/helpers/swagger.helper';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'User created successfully',
    type: ApiResponseOf(UserDto),
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (validation errors)',
    ...ApiErrorResponseExample({
      message: 'Validation failed',
      errors: { email: ['Email must be a valid email address'] },
    }),
  })
  @ApiConflictResponse({
    description: 'Email already exists',
    ...ApiErrorResponseExample({
      message: 'A user with this email already exists',
    }),
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    ...ApiErrorResponseExample({
      message: 'Internal server error',
    }),
  })
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Create a new user with email, first name, last name and password. Returns user information on success.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return user;
  }
}
