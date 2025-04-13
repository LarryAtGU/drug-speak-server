import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'New Tom Sawyer',
    required: false,
    description:
      'The new username of the user. It is optional, no new username will not change the username',
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: 'NewPassword',
    required: false,
    description:
      'The new password of the user. It is optional, no new password will not change the password',
  })
  @IsOptional()
  password?: string;
}
