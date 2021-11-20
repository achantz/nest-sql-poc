import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationModule } from './../application/application.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ApplicationModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
