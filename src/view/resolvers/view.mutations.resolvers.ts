import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ViewCreateInput } from '../dtos/view.create.dto';
import { View } from '../models/view.model';
import { ViewService } from '../view.service';

@Resolver(View)
export class ViewMutationsResolver {
  constructor(private readonly viewService: ViewService) {}

  @Mutation(() => View)
  async insert_view(@Args('input') input: ViewCreateInput): Promise<View> {
    return await this.viewService.createView(input);
  }
}
