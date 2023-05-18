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

class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'updated@example.com' })
  email: string;

  @ApiProperty({ example: 'updatedUser' })
  username: string;

  @ApiProperty({ example: '87654321' })
  password: string;

  @ApiProperty({ example: '1111111111' })
  tel: string;
}

export { CreateUserDto, UpdateUserDto };
