import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    //* use this to embed related entities into returned collection/object (only for REST)
    //* GraphQL will make this obsolete as you can request nested entities in your query which is handled by the resolver
    //return await this.repo.find({ relations: ['applications'] });
    return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOneOrFail(id);
  }

  async insert(input: UserDto): Promise<User> {
    const user = await this.repo.create({
      firstName: input.firstName,
      lastName: input.lastName,
    });
    return await this.repo.save(user);
  }

  async update(id: number, input: UserDto): Promise<User> {
    await this.repo.findOneOrFail(id);
    await this.repo.update({ id: id }, input);

    return await this.repo.findOneOrFail(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOneOrFail(id);
    return await this.repo.remove(user);
  }
}
