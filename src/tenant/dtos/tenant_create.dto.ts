import { Field, InputType } from '@nestjs/graphql';
import { UserType } from 'src/common/enum/types.enum';
import { TenantUpdateInput } from './tenant_update.dto';

@InputType()
export class TenantCreateInput extends TenantUpdateInput {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  primaryPhoneNumber: string;

  @Field(() => UserType)
  type: UserType;
}
