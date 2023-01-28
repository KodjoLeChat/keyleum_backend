import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FlatInsertInput } from '../dtos/flat_insert.dto';
import { FlatService } from '../flat.service';
import { Flat } from '../models/flat.model';

@Resolver(Flat)
export class FlatMutationResolver {
  constructor(private readonly flatService: FlatService) {}

  @Mutation(() => Flat, { nullable: true })
  async insert_flat(@Args('input') input: FlatInsertInput) {
    const flat = await this.flatService.insertFlat(input);
    return flat;
  }
}
