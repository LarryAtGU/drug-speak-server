import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint to handle user login
  @ApiOperation({ summary: 'Login a user with email and password.' })
  @ApiResponse({
    status: 201,
    description: 'User login successfully.',
    schema: {
      example: {
        user: {
          id: '2dd5a455-20d3-4987-ad74-89885c744ad1',
          username: 'Tom Sawyer',
          email: 'tom@abc.au',
          gender: 'male',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZGQ1YTQ1NS0yMGQzLTQ5ODctYWQ3NC04OTg4NWM3NDRhZDEiLCJlbWFpbCI6InRvbUBhYmMuYXUiLCJpYXQiOjE3NDQ1MDcwMTV9.XofJX7fpD5SiRbCwrOlqGQJb-fFuJiTV1wnIiWucPh0',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, wrong email or wrong password.',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
