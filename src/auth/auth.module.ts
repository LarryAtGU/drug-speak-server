import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule], // This makes UsersService available to AuthService
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
