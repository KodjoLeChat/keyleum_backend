import { Field, InputType } from '@nestjs/graphql';
import { OrganisationType } from 'src/common/enum/types.enum';

@InputType()
export class OrganisationUpdateInput {
  @Field(() => OrganisationType)
  type: OrganisationType;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  whatsAppNumber?: string;
}
