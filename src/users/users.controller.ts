import {
  Controller,
  Post,
  Patch,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post()
  @ApiOperation({ summary: 'Create a new user and login.' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    schema: {
      example: {
        user: {
          username: 'Tom Sawyer',
          email: 'tom@abc.au',
          gender: 'male',
          id: '31f12e45-f7f5-4c54-a29c-5e2a496c1eb4',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMWYxMmU0NS1mN2Y1LTRjNTQtYTI5Yy01ZTJhNDk2YzFlYjQiLCJlbWFpbCI6ImpvaG44QGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ0NTAzNDg0fQ.G3gqAYZm7emXxgM9dTbgFp0gmO_HNsWqe9ERB8RRj4M',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict Email address is already in use.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint to update an existing user by id
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user's profile." })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
    schema: {
      example: {
        id: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
        username: 'New Tom Sawyer',
        email: 'tom@abc.au',
        gender: 'male',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to login to access this function.',
  })
  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiOperation({
    summary:
      "Delete a user by userID, this is for e2e test only, you don't need to use it for your application building.",
  })
  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: string) {
    return await this.usersService.deleteUser(userId);
  }
}
