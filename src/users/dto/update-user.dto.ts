import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNotEmpty({ message: 'Username must not be empty' })
  username?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Password must not be empty' })
  password?: string;
}
