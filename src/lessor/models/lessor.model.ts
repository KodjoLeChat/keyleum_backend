import { Field, ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Organisation } from 'src/organisation/models/organisation.model';
import { Person } from 'src/person/models/person.model';
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
export class Lessor extends Person {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  whatsAppNumber?: string;

  @OneToMany(() => Flat, (target) => target.lessor)
  flats: Flat[];

  @ManyToOne(() => Organisation, (organisation) => organisation.lessors)
  @JoinColumn()
  organisation: Organisation;

  @Field(() => String, { nullable: true })
  @RelationId((self: Lessor) => self.organisation)
  readonly organisationId: Organisation['id'];
}
