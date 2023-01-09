import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Lessor } from '../models/lessor.model';

@InputType()
export class LessorCreateInput {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  type: string;
}

@ObjectType()
export class LessorSetOutput {
  @Field(() => Lessor)
  lessor: Lessor;
}
