import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FlatState } from 'src/common/enum/states.enum';
import { OrganisationType, PaimentType } from 'src/common/enum/types.enum';
import { FlatImages } from 'src/flat_image/models/flat_image.model';
import { Lessor } from 'src/lessor/models/lessor.model';
import { Organisation } from 'src/organisation/models/organisation.model';
import { Node } from 'src/pagination/models/node.model';
import { View } from 'src/view/models/view.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

registerEnumType(FlatState, { name: 'FlatState' });

registerEnumType(PaimentType, { name: 'PaimentType' });
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

  @Field(() => PaimentType)
  @Column()
  paimentType: PaimentType;

  @Field(() => OrganisationType)
  @Column()
  type: OrganisationType;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => String)
  @Column({ type: 'date' })
  startAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ type: 'date', nullable: true })
  endAt?: Date;

  @Field(() => FlatState)
  @Column({ default: FlatState.enabled })
  state: FlatState;

  @OneToMany(() => FlatImages, (target) => target.flat)
  images: FlatImages[];

  @ManyToOne(() => Lessor, (lessor) => lessor.flats)
  @JoinColumn()
  lessor: Lessor;

  @Field(() => String)
  @RelationId((self: Flat) => self.lessor)
  readonly lessorId: Lessor['id'];

  @ManyToOne(() => Organisation, (organisation) => organisation.flats)
  @JoinColumn()
  organisation: Organisation;

  @Field(() => String)
  @RelationId((self: Flat) => self.organisation)
  readonly organisationId: Lessor['id'];

  @OneToMany(() => View, (view) => view.flat)
  views: View[];
}
