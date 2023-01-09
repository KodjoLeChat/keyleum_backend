import { Field, ObjectType } from '@nestjs/graphql';
import { FlatImages } from 'src/flat_image/models/flta_image.model';
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

  @OneToMany(() => FlatImages, (target) => target.flat)
  images: FlatImages[];

  @ManyToOne(() => Lessor, (lessor) => lessor.flats)
  @JoinColumn()
  lessor: Lessor;

  @RelationId((self: Flat) => self.lessor)
  readonly LessorId: Lessor['id'];
}
