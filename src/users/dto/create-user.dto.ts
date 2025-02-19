import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../types/types';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, { message: 'Gender must be either male or female' })
  gender: Gender;
}
