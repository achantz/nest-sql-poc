import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'application' })
export class Application extends BaseEntity {
  //* if we use ManyToOne we do not need to specify OneToMany on the other entity
  @ManyToOne(() => User, (user) => user.applications)
  @Field(() => Int)
  @ApiProperty()
  user: number;
}
