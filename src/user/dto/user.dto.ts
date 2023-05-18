import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'heePoke' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '12345678' })
  password: string;

  @IsString()
  @ApiProperty({ example: '0000000000' })
  tel: string;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

export { CreateUserDto, UpdateUserDto };
