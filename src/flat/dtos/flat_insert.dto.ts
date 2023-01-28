import { Field, InputType } from '@nestjs/graphql';
import { FlatUpdateInput } from './flat_update.dto';

@InputType()
export class FlatInsertInput extends FlatUpdateInput {
  @Field(() => [String])
  images: string[];

  @Field(() => String)
  organisationId: string;

  @Field(() => String)
  lessorId: string;
}
