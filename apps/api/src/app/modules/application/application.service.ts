import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationDto } from './application.dto';
import { Application } from './application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application) private repo: Repository<Application>
  ) {}

  async findAll(): Promise<Application[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Application> {
    return await this.repo.findOneOrFail(id);
  }

  async insert(input: ApplicationDto): Promise<Application> {
    const application = await this.repo.create({
      ...input,
    });
    return await this.repo.save(application);
  }

  async update(id: number, input: ApplicationDto): Promise<Application> {
    await this.repo.findOneOrFail(id);
    await this.repo.update({ id: id }, input);

    const value = this.repo.findOneOrFail(id);

    return value;
  }

  async remove(id: number): Promise<Application> {
    const application = await this.repo.findOneOrFail(id);
    return await this.repo.remove(application);
  }

  async findByUserId(userId: number): Promise<Application[]> {
    return await this.repo.find({
      where: { user: userId },
    });
  }
}
