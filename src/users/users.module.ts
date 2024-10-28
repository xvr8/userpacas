import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Users from './index';
import { User } from '../users/entities/user.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Users.UserService, Users.UserRepository],
  controllers: [Users.UserController],
})
export class UsersModule {}
export * from './entities/user.entity';

export * from '../users/services';
export * from '../users/repositories/user.repository';
