import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserProjectRole } from '../user-project-roles/user-project-role.entity';
import { RolesModule } from '../role/role.module'; // Import RolesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProjectRole]),
    RolesModule, // Import RolesModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
