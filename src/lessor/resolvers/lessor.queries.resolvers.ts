import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { Organisation } from 'src/organisation/models/organisation.model';
import { OrganisationService } from 'src/organisation/organisation.service';
import { LessorService } from '../lessor.service';
import { Lessor } from '../models/lessor.model';

@Resolver(Lessor)
export class LessorQueriesResolver {
  constructor(
    private readonly lessorService: LessorService,
    private readonly flatService: FlatService,
    private readonly organisationervice: OrganisationService,
  ) {}

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

  @ResolveField(() => [Flat], { nullable: true })
  async flats(@Parent() lessor: Lessor) {
    const { id } = lessor;
    const flats = await this.flatService.getFlatsByLessorId(id);
    return flats;
  }

  @ResolveField(() => Organisation)
  async organisation(@Parent() lessor: Lessor) {
    const organisationId = lessor.organisationId;
    const organisation = await this.organisationervice.getOrganisation(
      organisationId,
    );
    return organisation;
  }
}
