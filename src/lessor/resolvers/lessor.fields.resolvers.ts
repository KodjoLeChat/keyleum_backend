import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Organisation } from 'src/organisation/models/organisation.model';
import { OrganisationService } from 'src/organisation/organisation.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorFieldsResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  @ResolveField(() => Organisation, { nullable: true })
  async organisation(@Parent() lessor: Lessor) {
    if (!lessor.organisationId) {
      return null;
    }
    try {
      return await this.organisationService.getOrganisation(
        lessor.organisationId,
      );
    } catch (e) {
      return null;
    }
  }
}
