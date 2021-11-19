import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../base.entity';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  lastName: string;
}
