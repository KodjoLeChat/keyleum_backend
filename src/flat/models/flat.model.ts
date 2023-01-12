import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FlatState } from 'src/common/enum/states.enum';
import { FlatImages } from 'src/flat_image/models/flat_image.model';
import { Lessor } from 'src/lessor/models/lessor.model';
import { Node } from 'src/pagination/models/node.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

registerEnumType(FlatState, { name: 'FlatState' });
@Entity()
@ObjectType()
export class Flat extends Node {
  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String)
  @Column()
  quarter: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => String)
  @Column({ type: 'date' })
  startAt: Date;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  endAt: Date;

  @Field(() => FlatState)
  @Column({ default: FlatState.enabled })
  state: FlatState;

  @OneToMany(() => FlatImages, (target) => target.flat)
  images: FlatImages[];

  @ManyToOne(() => Lessor, (lessor) => lessor.flats)
  @JoinColumn()
  lessor: Lessor;

  @RelationId((self: Flat) => self.lessor)
  readonly LessorId: Lessor['id'];
}
