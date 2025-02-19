import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      // Create a new user object with the hashed password
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.usersRepository.save(user);

      const payload = { sub: savedUser.id, email: savedUser.email };
      const token = this.jwtService.sign(payload);

      // Return the saved user and the token.
      return { user: savedUser, token };
    } catch (error) {
      if (
        error.code === 'SQLITE_CONSTRAINT' &&
        error.message.includes('user.email')
      ) {
        throw new ConflictException('Email address is already in use.');
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
