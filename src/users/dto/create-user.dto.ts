import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../types/types';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'Tom Sawyer',
    description: 'The username of the user.',
  })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'tom@abc.au',
    description: 'The email address of the user',
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'securepassword',
    description: 'The user password',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the user',
    enum: ['male', 'female'],
  })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, { message: 'Gender must be either male or female' })
  gender: Gender;
}
