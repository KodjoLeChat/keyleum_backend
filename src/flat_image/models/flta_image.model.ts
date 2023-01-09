import { Field, ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class FlatImages extends Node {
  @Field(() => String)
  @Column()
  name: string;

  @ManyToOne(() => Flat, (flat) => flat.images)
  @JoinColumn()
  flat: Flat;

  @RelationId((self: FlatImages) => self.flat)
  readonly FlatId: Flat['id'];
}
