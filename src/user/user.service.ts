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

  async getUserLatest() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          tel: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { id: 'desc' },
        take: 1,
      });

      if (users.length === 0) {
        throw new Error('User not found');
      }
      return users;
    } catch (err) {
      console.error('Error retrieving user data:', err);
      throw err;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch (err) {
      console.error(`Error retrieving user with ID ${id}:`, err);
      throw new Error(`Failed to retrieve user with ID ${id}`);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return user;
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
