import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { LessorStatus } from 'src/common/enum/status.enum';
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

registerEnumType(LessorStatus, { name: 'LessorStatus' });
@Entity()
@ObjectType()
export class Lessor extends Person {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  whatsAppNumber?: string;

  @Field(() => LessorStatus)
  @Column({ default: LessorStatus.member })
  status: LessorStatus;

  @OneToMany(() => Flat, (target) => target.lessor)
  flats: Flat[];

  @ManyToOne(() => Organisation, (organisation) => organisation.lessors)
  @JoinColumn()
  organisation: Organisation;

  @Field(() => String, { nullable: true })
  @RelationId((self: Lessor) => self.organisation)
  readonly organisationId: Organisation['id'];
}
