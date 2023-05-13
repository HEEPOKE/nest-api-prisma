import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  findAll() {
    const data = this.userService.getAllUsers();
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
  createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);

    const payload = {
      data: user,
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
}
