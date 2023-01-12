import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/common/enum/types.enum';
import { LessorUpdateInput, LessorUpdateOutput } from './lessor_update.dto';

@InputType()
export class LessorCreateInput extends LessorUpdateInput {
  @Field(() => String)
  uuid: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => String)
  primaryPhoneNumber: string;
}

@ObjectType()
export class LessorCreateOutput extends LessorUpdateOutput {}

@ObjectType()
export class LessorOutput extends LessorCreateOutput {}
