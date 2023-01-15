import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LessorCreateInput } from '../dtos/lessor_create.dto';
import { LessorUpdateInput } from '../dtos/lessor_update.dto';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorMutationsResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Mutation(() => Lessor, { nullable: true })
  async insert_lessor(@Args('input') input: LessorCreateInput) {
    const lessor = await this.lessorService.createLessor(input);
    return lessor;
  }

  @Mutation(() => Lessor, { nullable: true })
  async update_lessor(
    @Args('id') id: string,
    @Args('input') input: LessorUpdateInput,
  ) {
    const lessor = await this.lessorService.updateLessor(id, input);
    return lessor;
  }

  @Mutation(() => Lessor, { nullable: true })
  async delete_lessor(@Args('id') id: string) {
    const lessor = await this.lessorService.deleteLessor(id);
    return lessor;
  }
}
