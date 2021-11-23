import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { Application } from '../application/application.entity';

@Entity({ name: 'user' }) //* TypeORM attribute
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

  @OneToMany(() => Application, (application) => application.user, {
    nullable: true,
  })
  @Field(() => [Application], { nullable: true })
  @ApiProperty({ isArray: true })
  applications?: Application[] = null;
}
