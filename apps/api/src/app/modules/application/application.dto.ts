import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class ApplicationDto {
  @Field(() => Int)
  @ApiProperty()
  user: number;
}
