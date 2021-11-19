import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

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
  @ApiCreatedResponse({ type: User })
  async insert(@Body() user: UserDto): Promise<User> {
    return await this.userService.insert(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
