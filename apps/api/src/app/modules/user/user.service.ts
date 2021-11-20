import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { DeleteResult, Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    //* use this to embed related entities into returned collection/object
    //* GraphQL will make this obscolete
    return await this.repo.find({ relations: ['applications'] });
    //return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    await this.repo.findOneOrFail(id);
    return await this.repo.findOne(id);
  }

  async insert(input: UserDto): Promise<User> {
    const user = await this.repo.create({
      firstName: input.firstName,
      lastName: input.lastName,
    });
    return await this.repo.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.repo.findOneOrFail(id);
    return await this.repo.delete(id);
  }
}
