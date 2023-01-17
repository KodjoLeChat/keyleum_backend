import { Field, InputType } from '@nestjs/graphql';
import { OrganisationUpdateInput } from './organisation_update.dto';

@InputType()
export class OrganisationInsertInput extends OrganisationUpdateInput {
  @Field(() => String, { nullable: true })
  primaryPhoneNumber?: string;
}
