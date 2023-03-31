import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { LessorService } from 'src/lessor/lessor.service';
import { Lessor } from 'src/lessor/models/lessor.model';
import { Organisation } from '../models/organisation.model';
import { OrganisationService } from '../organisation.service';

@Resolver(Organisation)
export class OrganisationQueriesResolver {
  constructor(
    private readonly organisationService: OrganisationService,
    private readonly lessorService: LessorService,
    private readonly flatService: FlatService,
  ) {}

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

  @ResolveField(() => [Lessor], { nullable: true })
  async lessors(@Parent() organisation: Organisation) {
    const { id } = organisation;
    const lessors = await this.lessorService.getAllLessorByOrganisationId(id);
    return lessors;
  }

  @ResolveField(() => [Flat], { nullable: true })
  async flats(@Parent() organisation: Organisation) {
    const { id } = organisation;
    const flats = await this.flatService.getFlatsByOrganisationId(id);
    return flats;
  }
}
