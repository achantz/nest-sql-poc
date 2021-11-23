import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationModule } from './../application/application.module';
import { ApplicationService } from './../application/application.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ApplicationModule),
  ],
  providers: [UserService, UserResolver, ApplicationService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
