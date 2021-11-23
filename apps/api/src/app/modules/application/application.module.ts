import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    forwardRef(() => UserModule),
  ],
  providers: [ApplicationService, ApplicationResolver, UserService],
  controllers: [ApplicationController],
  exports: [TypeOrmModule, ApplicationService],
})
export class ApplicationModule {}
