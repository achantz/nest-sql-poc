import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from './modules/application/application.entity';
import { ApplicationModule } from './modules/application/application.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'thepassword',
      database: 'nestjs',
      entities: [User, Application],
      synchronize: true,
    }),
    UserModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
