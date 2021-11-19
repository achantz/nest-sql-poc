import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({ type: 'boolean', default: true })
  @ApiProperty()
  isActive?: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  isArchived?: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  createdDateTime?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  lastChangedDateTime?: Date;
}
