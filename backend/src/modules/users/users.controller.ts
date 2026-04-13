import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  ApiResponseOf,
  ApiErrorResponseExample,
  ApiResponseWithMetadataOf,
} from '../../common/helpers/swagger.helper';
import { UserDto } from './dto/user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @ApiOperation({
    summary: 'Get a paginated list of users',
    description:
      'Retrieve a paginated list of users with optional search and sorting. Returns user data along with pagination metadata.',
  })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: ApiResponseWithMetadataOf(UserDto, PaginateDto, {
      isArray: true,
    }),
  })
  @Get()
  async findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @ApiOperation({
    summary: 'Delete a user by ID',
    description:
      'Soft delete a user by their UUID. The user will be marked as deleted but not removed from the database.',
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    ...ApiErrorResponseExample({
      message: 'User not found',
    }),
  })
  @Delete(':id')
  async remove(@Param() deleteUserDto: DeleteUserDto) {
    await this.usersService.remove(deleteUserDto);

    return {
      message: 'User deleted successfully',
    };
  }

  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      'Update user information by their UUID. You can update email, first name, last name and password. Returns the updated user information on success.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: ApiResponseOf(UserDto),
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (validation errors)',
    ...ApiErrorResponseExample({
      message: 'Validation failed',
      errors: { email: ['Email must be a valid email address'] },
    }),
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    ...ApiErrorResponseExample({
      message: 'User not found',
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return updatedUser;
  }
}
