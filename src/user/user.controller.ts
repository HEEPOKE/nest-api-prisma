import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

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

  @Get('/:id')
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
}
