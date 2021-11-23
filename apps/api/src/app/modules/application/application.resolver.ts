import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Application } from './../application/application.entity';
import { ApplicationService } from './../application/application.service';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { ApplicationDto } from './application.dto';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(
    private userService: UserService,
    private applicationService: ApplicationService
  ) {}

  //* QUERIES
  @Query(() => [Application], { name: 'applications' }) // args: return type, options (which contains the name param, which is the alias name for this operation)
  async getApplications() {
    return await this.applicationService.findAll();
  }

  @Query(() => Application, { name: 'application' })
  async getApplication(@Args('id', { type: () => Int }) id: number) {
    return await this.applicationService.findOne(id);
  }

  //* MUTATIONS
  @Mutation(() => Application, { name: 'addApplication' })
  async addApplication(
    @Args('application', { type: () => ApplicationDto }) input: ApplicationDto
  ) {
    return this.applicationService.insert(input);
  }

  @Mutation(() => Application, { name: 'updateApplication' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('application', { type: () => ApplicationDto }) input: ApplicationDto
  ) {
    return this.applicationService.update(id, input);
  }

  @Mutation(() => Application, { name: 'deleteApplication' })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.applicationService.remove(id);
  }

  // //* FIELD RESOLVERS
  @ResolveField('user', () => User)
  private async getUser(@Parent() application: Application) {
    const { userId } = application;
    return await this.userService.findOne(userId);
  }
}
