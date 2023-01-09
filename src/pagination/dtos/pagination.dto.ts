import { ArgsType, Field, Int, InterfaceType } from '@nestjs/graphql';
import { Node } from '../models/node.model';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page: number;

  //   @Field(() => Int)
  //   take: number;
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  page: number;

  @Field(() => [Node])
  abstract nodes: N[];
}
