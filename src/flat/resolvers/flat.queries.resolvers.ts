import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FlatImageService } from 'src/flat_image/flat_image.service';
import { FlatImages } from 'src/flat_image/models/flat_image.model';
import { FlatService } from '../flat.service';
import { Flat } from '../models/flat.model';

@Resolver(() => Flat)
export class FlatQueriesResolver {
  constructor(
    private readonly flatService: FlatService,
    private readonly flatImageService: FlatImageService,
  ) {}

  @Query(() => Flat, { nullable: true })
  async flat(@Args('id') id: string) {
    const flat = await this.flatService.getFlat(id);
    return flat;
  }

  @Query(() => [Flat])
  async flats(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
  ) {
    return await this.flatService.findAll(page, perPage);
  }

  @ResolveField(() => [FlatImages], { nullable: true })
  async images(@Parent() flat: Flat) {
    if (!flat.id) {
      return null;
    }
    const images = await this.flatImageService.getImagesByFlatId(flat.id);
    return images;
  }
}
