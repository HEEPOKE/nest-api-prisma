import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  findAll() {
    const data = this.userService.getAllUsers();
    const payload = {
      data,
      message: 'success',
      statusCode: HttpStatus.OK,
    };

    return payload;
  }
}
