import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  tel: string;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

export { CreateUserDto, UpdateUserDto };
