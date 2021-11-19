import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOne(id);
  }

  async insert(input: UserDto): Promise<User> {
    const user = await this.repo.create({
      firstName: input.firstName,
      lastName: input.lastName,
    });
    return await this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.repo.findOneOrFail(id);
    await this.repo.delete(id);
  }
}
