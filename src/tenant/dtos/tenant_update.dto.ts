import { Field, InputType } from '@nestjs/graphql';
import { Gender } from 'src/common/enum/gender.enum';

@InputType()
export class TenantUpdateInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  profileLink: string;
}
