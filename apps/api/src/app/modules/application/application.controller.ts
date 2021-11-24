import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApplicationDto } from './application.dto';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  @ApiOkResponse({ type: [Application] })
  async findAll(): Promise<Application[]> {
    return await this.applicationService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: Application })
  async insert(@Body() application: ApplicationDto): Promise<Application> {
    return await this.applicationService.insert(application);
  }

  @Patch()
  @ApiCreatedResponse({ type: Application })
  async update(
    @Param('id') id: number,
    @Body() application: ApplicationDto
  ): Promise<Application> {
    return await this.applicationService.update(id, application);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Application> {
    return await this.applicationService.remove(id);
  }
}
