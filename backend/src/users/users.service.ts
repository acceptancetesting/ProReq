// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProjectRole } from '../user-project-roles/user-project-role.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserProjectRole)
    private uprRepository: Repository<UserProjectRole>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    // Assign default role if needed
    const role = await this.rolesRepository.findOne({
      where: { name: 'User' },
    });
    const upr = this.uprRepository.create({
      user,
      role,
      project: null, // Assign a default or specific project if applicable
    });
    await this.uprRepository.save(upr);

    return user;
  }

  async findByEmail(email: string, relations: string[] = []): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations,
    });
  }
}
