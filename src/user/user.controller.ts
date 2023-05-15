import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import authUtils from '../utils/auth';

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
  findById(@Param('id') id: string) {
    const params = parseInt(id);
    const user = this.userService.getUserById(params);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: user,
    };

    return payload;
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const hashPassword = await authUtils.hashPassword(createUserDto.password);
    this.userService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    const data = this.userService.getUserLatest();

    const payload = {
      data: data,
      message: 'User created successfully',
      statusCode: HttpStatus.CREATED,
    };

    return payload;
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
