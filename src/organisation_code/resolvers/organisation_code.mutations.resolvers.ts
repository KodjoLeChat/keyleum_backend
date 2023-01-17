import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrganisationCode } from '../models/organisation_code.model';
import { OrganisationCodeService } from '../organisation_code.service';

@Resolver(OrganisationCode)
export class OrganisationCodeMutationsResolver {
  constructor(
    private readonly organisationCodeService: OrganisationCodeService,
  ) {}

  @Mutation(() => OrganisationCode, { nullable: true })
  async organisation_code_used(@Args('id') id: string) {
    const organisationCode =
      await this.organisationCodeService.updateOrganisationCode(id);
    return organisationCode;
  }
}
