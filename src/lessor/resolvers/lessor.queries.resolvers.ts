import { Args, Query, Resolver } from '@nestjs/graphql';
import { LessorOutput } from '../dtos/lessor_create.dto';
import { Lessors } from '../dtos/lessor_update.dto';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorQueriesResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Query(() => LessorOutput, { nullable: true })
  async lessor_by_pk(@Args('id') id: string) {
    const lessor = await this.lessorService.getLessor(id);
    return lessor;
  }

  @Query(() => Lessors)
  async lessors() {
    return await this.lessorService.getAllLessor();
  }
}
