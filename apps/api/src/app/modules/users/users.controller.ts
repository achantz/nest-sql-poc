import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.remove(id);
  }
}
