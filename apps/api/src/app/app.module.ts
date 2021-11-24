import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { ApplicationModule } from './modules/application/application.module';
import { UserModule } from './modules/user/user.module';

//import { Application } from './modules/application/application.entity';
//import { ApplicationService } from './modules/application/application.service';
//import { User } from './modules/user/user.entity';
//import { UserService } from './modules/user/user.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//const ormConfig: TypeOrmModuleOptions = require('./../../../../ormconfig.json');
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    // TypeOrmModule.forRoot({
    //   ...ormConfig,
    //   entities: [User, Application],
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'thepassword',
    //   database: 'nestjs',
    //   entities: [User, Application],
    //   synchronize: false, //* set this to true to enable schema synchronization (prototyping/dev only)
    //   logging: true, //* displays SQL commands in console
    //   migrationsTableName: 'migrations', //* name of table to store migrations
    //   migrations: ['migration/*.js'], //* folder and file name to store migration scripts
    //   cli: {
    //     migrationsDir: 'migration',
    //   },
    // }),
    UserModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
