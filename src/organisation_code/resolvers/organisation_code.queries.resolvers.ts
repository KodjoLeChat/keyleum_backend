import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrganisationCode } from '../models/organisation_code.model';
import { OrganisationCodeService } from '../organisation_code.service';

@Resolver(OrganisationCode)
export class OrganisationCodeQueriesResolver {
  constructor(
    private readonly organisationCodeService: OrganisationCodeService,
  ) {}

  @Query(() => OrganisationCode, { nullable: true })
  async organisation_code(@Args('organisationId') organisationId: string) {
    const organisationCode =
      await this.organisationCodeService.getOrganisationCode(organisationId);
    return organisationCode;
  }

  @Query(() => [OrganisationCode])
  async organisation_codes() {
    const organisations =
      await this.organisationCodeService.getOrganisationCodes();
    return organisations;
  }
}
