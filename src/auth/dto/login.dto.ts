import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'tom@abc.au',
    description: 'The email of the user.',
  })
  readonly email: string;

  @ApiProperty({
    example: 'securityPassword',
    description: 'The password of the user.',
  })
  readonly password: string;
}
