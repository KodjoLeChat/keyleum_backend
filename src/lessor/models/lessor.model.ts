import { Field, ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Person } from 'src/person/models/person.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Lessor extends Person {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  whatsAppPhoneNumber?: string;

  @OneToMany(() => Flat, (target) => target.lessor)
  flats: Flat[];
}
