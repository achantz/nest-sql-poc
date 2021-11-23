import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Application } from './../application/application.entity';
import { ApplicationService } from './../application/application.service';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { UserDto } from './user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  //* QUERIES
  @Query(() => [User], { name: 'users' }) // args: return type, options (which contains the name param, which is the alias name for this operation)
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  //* MUTATIONS
  @Mutation(() => User, { name: 'addUser' })
  async addUser(
    @Args('user', { type: () => UserDto }) input: UserDto
  ): Promise<User> {
    return this.userService.insert(input);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('user', { type: () => UserDto }) input: UserDto
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.remove(id);
  }

  //* FIELD RESOLVERS
  @ResolveField('applications', () => [Application], { nullable: true }) // args: alias, return type, options
  private async getApplications(@Parent() user: User): Promise<Application[]> {
    const { id } = user;
    return await this.applicationService.findByUserId(id);
  }
}
