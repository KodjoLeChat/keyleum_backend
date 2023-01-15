import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Gender } from 'src/common/enum/gender.enum';
import { Lessor } from '../models/lessor.model';

@InputType()
export class LessorUpdateInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  whatsAppPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  profileLink: string;
}

@ObjectType()
export class LessorUpdateOutput {
  @Field(() => Lessor, { nullable: true })
  lessor: Lessor;
}

@ObjectType()
export class Lessors {
  @Field(() => [Lessor])
  lessors: Lessor[];
}
