import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ViewCreateInput {
  @Field(() => Date)
  viewedAt: Date;

  @Field(() => String)
  flatId: string;

  @Field(() => String)
  tenantId: string;
}
