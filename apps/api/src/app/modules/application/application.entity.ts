import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'application' })
export class Application extends BaseEntity {
  //* if we use ManyToOne we do not need to specify OneToMany on the other entity
  @ManyToOne(() => User, (user) => user.applications)
  @ApiProperty()
  user: number;
}
