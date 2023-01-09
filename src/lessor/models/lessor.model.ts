import { ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Person } from 'src/person/models/person.model';
import { Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Lessor extends Person {
  @OneToMany(() => Flat, (target) => target.lessor)
  flats: Flat[];
}
