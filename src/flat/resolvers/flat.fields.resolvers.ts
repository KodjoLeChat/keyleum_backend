import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LessorService } from 'src/lessor/lessor.service';
import { Lessor } from 'src/lessor/models/lessor.model';
import { Organisation } from 'src/organisation/models/organisation.model';
import { OrganisationService } from 'src/organisation/organisation.service';
import { Flat } from '../models/flat.model';

@Resolver(() => Flat)
export class FlatFieldsResolver {
  constructor(
    private readonly lessorService: LessorService,
    private readonly organisationService: OrganisationService,
  ) {}

  @ResolveField(() => Lessor, { nullable: true })
  async lessor(@Parent() flat: Flat) {
    if (!flat.lessorId) {
      return null;
    }
    try {
      return await this.lessorService.getLessor(flat.lessorId);
    } catch (e) {
      return null;
    }
  }

  @ResolveField(() => Organisation, { nullable: true })
  async organisation(@Parent() flat: Flat) {
    if (!flat.organisationId) {
      return null;
    }
    try {
      return await this.organisationService.getOrganisation(
        flat.organisationId,
      );
    } catch (e) {
      return null;
    }
  }
}
