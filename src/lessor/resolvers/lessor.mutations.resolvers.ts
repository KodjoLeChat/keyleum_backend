import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  LessorCreateInput,
  LessorCreateOutput,
} from '../dtos/lessor_create.dto';
import { LessorDeleteOutPut } from '../dtos/lessor_delete.dto';
import {
  LessorUpdateInput,
  LessorUpdateOutput,
} from '../dtos/lessor_update.dto';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorMutationsResolver {
  constructor(private readonly lessorService: LessorService) {}

  @Mutation(() => LessorCreateOutput, { nullable: true })
  async createLessor(@Args('input') input: LessorCreateInput) {
    const lessor = await this.lessorService.createLessor(input);
    return lessor;
  }

  @Mutation(() => LessorUpdateOutput, { nullable: true })
  async updateLessor(
    @Args('id') id: string,
    @Args('input') input: LessorUpdateInput,
  ) {
    const lessor = await this.lessorService.updateLessor(id, input);
    return lessor;
  }

  @Mutation(() => LessorDeleteOutPut, { nullable: true })
  async deleteLessor(@Args('id') id: string) {
    const lessor = await this.lessorService.deleteLessor(id);
    return lessor;
  }
}
