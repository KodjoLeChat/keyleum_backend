import { Args, Query, Resolver } from '@nestjs/graphql';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorQueriesResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Query(() => Lessor, { nullable: true })
  async lessor(@Args('id') id: string) {
    const lessor = await this.lessorService.getLessor(id);
    return lessor;
  }

  @Query(() => Lessor, { nullable: true })
  async lessor_by_uuid(@Args('uuid') uuid: string) {
    const lessor = await this.lessorService.getLessorByUuid(uuid);
    return lessor;
  }

  @Query(() => [Lessor])
  async lessors() {
    return await this.lessorService.getAllLessor();
  }
}
