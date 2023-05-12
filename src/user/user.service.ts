import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return user;
  }
}
