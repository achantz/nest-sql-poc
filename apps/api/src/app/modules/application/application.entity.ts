import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Index, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'application' })
export class Application extends BaseEntity {
  //* if we use ManyToOne we do not need to specify OneToMany on the other entity
  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  @Index() //* added to speed up queries on this column
  @Field(() => Int)
  @ApiProperty()
  user: number;

  @RelationId((application: Application) => application.user) //* this exposes the userid property which we need to resolve the user with
  public userId: number;
}
