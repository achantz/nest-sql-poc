import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Application } from './../application/application.entity';
import { ApplicationService } from './../application/application.service';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private applicationService: ApplicationService
  ) {}

  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findOne(id);
  }

  @ResolveField()
  async applications(@Parent() user: User) {
    const { id } = user;
    return await this.applicationService.findByUserId(id);
  }
}
