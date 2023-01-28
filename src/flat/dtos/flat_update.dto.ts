import { Field, InputType, Int } from '@nestjs/graphql';
import { PaimentType } from 'src/common/enum/types.enum';

@InputType()
export class FlatUpdateInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  quarter: string;

  @Field(() => Int)
  price: number;

  @Field(() => PaimentType)
  paimentType: PaimentType;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  startAt: Date;

  @Field(() => String, { nullable: true })
  endAt?: Date;
}
