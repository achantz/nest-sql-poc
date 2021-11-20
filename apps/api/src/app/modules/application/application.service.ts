import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
    await this.repo.findOneOrFail(id);
    return this.repo.findOne(id);
  }

  async insert(input: ApplicationDto): Promise<Application> {
    const application = await this.repo.create({
      ...input,
    });
    return await this.repo.save(application);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.repo.findOneOrFail(id);
    return this.repo.delete(id);
  }

  async findByUserId(userId: number): Promise<Application[]> {
    return await this.repo.find({
      where: { user: userId },
    });
  }
}
