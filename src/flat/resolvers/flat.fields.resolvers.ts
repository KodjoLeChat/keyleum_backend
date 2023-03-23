import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LessorService } from 'src/lessor/lessor.service';
import { Lessor } from 'src/lessor/models/lessor.model';
import { Flat } from '../models/flat.model';

@Resolver(() => Flat)
export class FlatFieldsResolver {
  constructor(private readonly lessorService: LessorService) {}

  @ResolveField(() => Lessor, { nullable: true })
  async lessor(@Parent() flat: Flat) {
    if (!flat.lessorId) {
      return null;
    }
    try {
      return await this.lessorService.getLessor(flat.lessorId);
    } catch (e) {
      return null;
    }
  }
}
