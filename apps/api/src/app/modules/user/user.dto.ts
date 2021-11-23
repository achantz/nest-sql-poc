import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserDto {
  @Field(() => String)
  @ApiProperty()
  firstName: string;

  @Field(() => String)
  @ApiProperty()
  lastName: string;
}
