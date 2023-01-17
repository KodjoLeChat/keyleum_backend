import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LessorCreateInput } from 'src/lessor/dtos/lessor_create.dto';
import { OrganisationInsertInput } from '../dtos/organisation_insert.dto';
import { OrganisationUpdateInput } from '../dtos/organisation_update.dto';
import { Organisation } from '../models/organisation.model';
import { OrganisationService } from '../organisation.service';

@Resolver(Organisation)
export class OrganisationMutationsResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  //   @Mutation(() => Organisation)
  //   async insert_organisation(@Args('input') input: OrganisationInsertInput) {
  //     const organisation = await this.organisationService.insertOrganisation(
  //       input,
  //     );
  //     return organisation;
  //   }

  @Mutation(() => Organisation)
  async insert_organisation(
    @Args('organisation') input: OrganisationInsertInput,
    @Args('lessor') lessor: LessorCreateInput,
  ) {
    const organisation =
      await this.organisationService.insertorganisationAndLessor(input, lessor);
    return organisation;
  }

  @Mutation(() => Organisation, { nullable: true })
  async update_organisation(
    @Args('id') id: string,
    @Args('input') input: OrganisationUpdateInput,
  ) {
    const organisation = await this.organisationService.updateOrganisation(
      id,
      input,
    );
    return organisation;
  }
}
