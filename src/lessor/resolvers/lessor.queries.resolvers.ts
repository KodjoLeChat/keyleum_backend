import { Args, Query, Resolver } from '@nestjs/graphql';
import { LessorSetOutput } from '../dtos/lessor_create.dto';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorQueriesResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Query(() => LessorSetOutput)
  async getLessor(@Args('id') id: string): Promise<LessorSetOutput> {
    const lessor = await this.lessorService.getLessor(id);
    return lessor;
  }
}
