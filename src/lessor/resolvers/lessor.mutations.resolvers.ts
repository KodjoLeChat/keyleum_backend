import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LessorCreateInput, LessorSetOutput } from '../dtos/lessor_create.dto';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorMutationsResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Mutation(() => LessorSetOutput)
  async createLessor(
    @Args('input') input: LessorCreateInput,
  ): Promise<LessorSetOutput> {
    input.phone = input.phone.replace(/ /g, '');
    const lessor = await this.lessorService.createLessor(input);
    return lessor;
  }
}
