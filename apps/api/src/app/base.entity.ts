import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  @ApiProperty()
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  @ApiProperty()
  isArchived: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  @ApiProperty()
  createdDateTime: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  @ApiProperty()
  lastChangedDateTime: Date;
}
