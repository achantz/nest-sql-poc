import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { Application } from '../application/application.entity';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  lastName: string;

  @OneToMany(() => Application, (application) => application.user)
  @ApiProperty({ isArray: true })
  applications?: Application[];
}
