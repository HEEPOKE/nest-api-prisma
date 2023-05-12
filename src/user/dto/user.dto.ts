import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from '../../enums/userRole.enum';

class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  tel: string;

  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

export { CreateUserDto, UpdateUserDto };
