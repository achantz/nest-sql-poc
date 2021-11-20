import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { Application } from '../application/application.entity';

@Entity({ name: 'User' }) //* TypeORM attribute
@ObjectType() //* GraphQL attribute
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  @ApiProperty()
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  @ApiProperty()
  lastName: string;

  @OneToMany(() => Application, (application) => application.user)
  @Field(() => [Application])
  @ApiProperty({ isArray: true })
  applications?: Application[];
}
