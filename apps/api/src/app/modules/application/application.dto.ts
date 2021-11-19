import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
  @ApiProperty()
  user: number;
}
