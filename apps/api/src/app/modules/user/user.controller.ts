import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOkResponse({ type: User })
  async insert(@Body() input: UserDto): Promise<User> {
    return await this.userService.insert(input);
  }

  @Patch()
  @ApiOkResponse({ type: User })
  async update(@Body() id: number, @Body() input: UserDto): Promise<User> {
    return await this.userService.update(id, input);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number): Promise<User> {
    return await this.userService.remove(id);
  }
}
