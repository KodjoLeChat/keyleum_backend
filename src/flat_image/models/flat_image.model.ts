import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FlatImagesState } from 'src/common/enum/states.enum';
import { Flat } from 'src/flat/models/flat.model';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

registerEnumType(FlatImagesState, { name: 'FlatImagesState' });
@Entity()
@ObjectType()
export class FlatImages extends Node {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => FlatImagesState)
  @Column({ default: FlatImagesState.enabled })
  state: FlatImagesState;

  @ManyToOne(() => Flat, (flat) => flat.images)
  @JoinColumn()
  flat: Flat;

  @RelationId((self: FlatImages) => self.flat)
  readonly FlatId: Flat['id'];
}
