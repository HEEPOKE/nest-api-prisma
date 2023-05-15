import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import authUtils from '../utils/auth';
import responseUtils from '../utils/responseBody';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  async findAll() {
    const data = await this.userService.getAllUsers();
    const payload = {
      statusCode: HttpStatus.OK,
      message: 'success',
      data,
    };

    return payload;
  }

  @Get('/get/:id')
  async findById(@Param('id') id: string): Promise<any> {
    try {
      const userId = parseInt(id);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        const responseFail = responseUtils.createResponseBody(
          HttpStatus.BAD_REQUEST,
          'Fail',
          'User not found',
        );
        return responseFail;
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Fail',
        description: 'Error retrieving user with ID',
        error: error.message || error,
        data: null,
      };
    }
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const hashPassword = await authUtils.hashPassword(createUserDto.password);
      await this.userService.createUser({
        ...createUserDto,
        password: hashPassword,
      });

      const data = await this.userService.getUserLatest();

      const payload = {
        data: data,
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
      };

      return payload;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const params = parseInt(id);
    const user = this.userService.updateUser(params, updateUserDto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      data: user,
      message: 'User updated successfully',
      statusCode: HttpStatus.OK,
    };

    return payload;
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    const params = parseInt(id);
    const deletedUser = this.userService.deleteUser(params);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      message: 'User deleted successfully',
      statusCode: HttpStatus.OK,
    };

    return payload;
  }
}
