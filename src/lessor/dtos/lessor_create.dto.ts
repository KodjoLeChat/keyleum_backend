import { Field, InputType } from '@nestjs/graphql';
import { UserType } from 'src/common/enum/types.enum';
import { LessorUpdateInput } from './lessor_update.dto';

@InputType()
export class LessorCreateInput extends LessorUpdateInput {
  @Field(() => String)
  uuid: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => String)
  primaryPhoneNumber: string;
}
