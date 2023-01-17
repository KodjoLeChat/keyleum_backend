import { Args, Query, Resolver } from '@nestjs/graphql';
import { Organisation } from '../models/organisation.model';
import { OrganisationService } from '../organisation.service';

@Resolver(Organisation)
export class OrganisationQueriesResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  @Query(() => Organisation, { nullable: true })
  async organisation(@Args('id') id: string) {
    const organisation = await this.organisationService.getOrganisation(id);
    return organisation;
  }

  @Query(() => [Organisation])
  async organisations() {
    const organisations = await this.organisationService.getOrganisations();
    return organisations;
  }
}
